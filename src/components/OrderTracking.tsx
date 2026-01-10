import React from 'react';
import { Check, Package, Truck, MapPin, Clock } from 'lucide-react';

interface OrderTrackingProps {
  status: string;
  createdAt: string;
}

const ORDER_STEPS = [
  { id: 'confirmed', label: 'Order Confirmed', icon: Check, description: 'Your order has been placed' },
  { id: 'processing', label: 'Processing', icon: Package, description: 'Order is being prepared' },
  { id: 'shipped', label: 'Shipped', icon: Truck, description: 'Order is on the way' },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, description: 'Order will arrive today' },
  { id: 'delivered', label: 'Delivered', icon: Check, description: 'Order has been delivered' },
];

const getStatusIndex = (status: string): number => {
  const statusMap: Record<string, number> = {
    'pending': -1,
    'confirmed': 0,
    'processing': 1,
    'shipped': 2,
    'out_for_delivery': 3,
    'delivered': 4,
  };
  return statusMap[status.toLowerCase()] ?? 0;
};

const getEstimatedDelivery = (createdAt: string): string => {
  const orderDate = new Date(createdAt);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 5); // Estimated 5 days delivery
  return deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const OrderTracking: React.FC<OrderTrackingProps> = ({ status, createdAt }) => {
  const currentStepIndex = getStatusIndex(status);
  const estimatedDelivery = getEstimatedDelivery(createdAt);
  const isDelivered = status.toLowerCase() === 'delivered';

  return (
    <div className="space-y-6">
      {/* Estimated Delivery */}
      {!isDelivered && currentStepIndex >= 0 && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <Clock className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Estimated Delivery</p>
            <p className="text-sm text-muted-foreground">{estimatedDelivery}</p>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {ORDER_STEPS.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {/* Vertical Line */}
              {index < ORDER_STEPS.length - 1 && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-[calc(100%-2.5rem)] ${
                    index < currentStepIndex ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}

              {/* Step Icon */}
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground'
                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
              >
                <StepIcon className="h-5 w-5" />
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <p
                  className={`font-medium ${
                    isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {isCurrent && !isDelivered && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    In Progress
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
