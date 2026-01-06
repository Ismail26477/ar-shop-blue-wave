import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID')!;
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, amount, currency, orderId, paymentId, signature, orderData } = await req.json();
    console.log(`Razorpay action: ${action}, amount: ${amount}`);

    if (action === 'create-order') {
      // Create Razorpay order
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Razorpay expects amount in paise
          currency: currency || 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const order = await response.json();
      console.log('Razorpay order created:', order.id);

      if (order.error) {
        console.error('Razorpay error:', order.error);
        return new Response(JSON.stringify({ error: order.error.description }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ 
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'verify-payment') {
      // Verify payment signature
      const crypto = await import("https://deno.land/std@0.168.0/crypto/mod.ts");
      
      const body = orderId + "|" + paymentId;
      const key = new TextEncoder().encode(RAZORPAY_KEY_SECRET);
      const data = new TextEncoder().encode(body);
      
      const hmacKey = await crypto.crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      
      const signatureBuffer = await crypto.crypto.subtle.sign("HMAC", hmacKey, data);
      const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const isValid = expectedSignature === signature;
      console.log(`Payment verification: ${isValid ? 'success' : 'failed'}`);

      if (!isValid) {
        return new Response(JSON.stringify({ verified: false, error: 'Invalid signature' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // If order data provided, save to database
      if (orderData) {
        const authHeader = req.headers.get('Authorization');
        if (authHeader) {
          const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY')!,
            { global: { headers: { Authorization: authHeader } } }
          );

          const token = authHeader.replace('Bearer ', '');
          const { data: claims, error: claimsError } = await supabase.auth.getClaims(token);
          
          if (!claimsError && claims?.claims?.sub) {
            const userId = claims.claims.sub;

            // Create order in database
            const { data: order, error: orderError } = await supabase
              .from('orders')
              .insert({
                user_id: userId,
                total_amount: orderData.totalAmount,
                payment_id: paymentId,
                payment_status: 'paid',
                status: 'confirmed',
                address_id: orderData.addressId || null,
              })
              .select()
              .single();

            if (orderError) {
              console.error('Error creating order:', orderError);
            } else if (order && orderData.items) {
              // Create order items
              const orderItems = orderData.items.map((item: any) => ({
                order_id: order.id,
                product_id: item.id,
                product_name: item.name,
                product_image: item.image,
                quantity: item.quantity,
                price: item.price,
              }));

              const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

              if (itemsError) {
                console.error('Error creating order items:', itemsError);
              } else {
                console.log('Order saved to database:', order.id);
              }
            }
          }
        }
      }

      return new Response(JSON.stringify({ verified: true, paymentId }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Razorpay function error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
