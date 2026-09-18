import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OrderTrackingModal({ 
  isOpen, 
  onClose, 
  order, 
  userOrders = [],
  onSelectOrder 
}) {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');
  const [currentOrder, setCurrentOrder] = useState(order);
  const [simulatedStatus, setSimulatedStatus] = useState(null);

  // Keep currentOrder updated if prop changes
  React.useEffect(() => {
    if (order) {
      setCurrentOrder(order);
      setSimulatedStatus(null);
    } else if (userOrders && userOrders.length > 0) {
      setCurrentOrder(userOrders[0]);
      setSimulatedStatus(null);
    }
  }, [order, userOrders]);

  if (!isOpen) return null;

  const activeOrder = currentOrder;
  const status = simulatedStatus || activeOrder?.status || 'PROCESSING';

  // Determine stage progress
  const getStepIndex = (st) => {
    switch (st?.toUpperCase()) {
      case 'PENDING': return 0;
      case 'PROCESSING': return 1;
      case 'SHIPPED': return 2;
      case 'DELIVERED': return 3;
      default: return 1;
    }
  };

  const currentStep = getStepIndex(status);

  const steps = [
    {
      title: 'Order Placed & Confirmed',
      desc: 'Payment authorized and recorded in H2 database.',
      time: 'Today, Just now',
      icon: CheckCircle2
    },
    {
      title: 'Processing & Custom Packaging',
      desc: 'Inspected by Shopio fulfillment center in New York.',
      time: 'In Progress',
      icon: Package
    },
    {
      title: 'Shipped & In Transit',
      desc: 'Carried via Shopio Express Air Freight.',
      time: 'Estimated in 24 hours',
      icon: Truck
    },
    {
      title: 'Out for Delivery',
      desc: 'Courier delivering to your shipping address.',
      time: 'Estimated in 2-3 business days',
      icon: MapPin
    }
  ];

  const handleSearchOrder = (e) => {
    e.preventDefault();
    setSearchError('');
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    const found = userOrders.find(o => 
      o.orderNumber?.toUpperCase().includes(query) || 
      String(o.id) === query
    );

    if (found) {
      setCurrentOrder(found);
      setSimulatedStatus(null);
      if (onSelectOrder) onSelectOrder(found);
    } else {
      setSearchError(`No order matching "${searchInput}" was found in your account.`);
    }
  };

  // Simulate advancing the status so the user can test the live flow
  const advanceStatus = () => {
    const nextStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
    const nextIdx = (currentStep + 1) % nextStatuses.length;
    setSimulatedStatus(nextStatuses[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="border-b border-neutral-100 pb-5 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
              <Truck size={12} />
              <span>Live Package Tracker</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1 font-sans">
            Track Your Shipment
          </h2>
          <p className="text-xs text-neutral-500">
            Real-time delivery milestones with H2 order synchronization.
          </p>
        </div>

        {/* Search by Order Number */}
        <form onSubmit={handleSearchOrder} className="mb-6">
          <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-2xl p-1.5 focus-within:border-neutral-900 transition">
            <Search size={16} className="text-neutral-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by Order # (e.g. ORD-20260918-...) or ID"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-xs outline-none text-neutral-900 placeholder-neutral-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition shadow-xs shrink-0"
            >
              Track
            </button>
          </div>
          {searchError && (
            <p className="text-xs text-rose-600 mt-1.5 ml-2 font-medium">{searchError}</p>
          )}
        </form>

        {activeOrder ? (
          <div className="space-y-6">
            
            {/* Top Order Overview Banner */}
            <div className="bg-[#FAF8F5] border border-neutral-200/70 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Tracking Reference
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 font-mono">
                  {activeOrder.orderNumber || `ORD-${activeOrder.id || '98234'}`}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Carrier: <span className="font-semibold text-neutral-800">Shopio Express Air Freight</span> • ID: <span className="font-mono text-neutral-600">SHP-984214-NY</span>
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between">
                <span className="text-[10px] text-neutral-400 uppercase font-bold">Estimated Delivery</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mt-1">
                  In 2–3 Business Days
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="px-2">
              <div className="flex justify-between text-[11px] font-bold text-neutral-600 mb-2">
                <span>Current Status</span>
                <span className="uppercase text-amber-600">{status}</span>
              </div>
              <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* 4-Step Milestone Timeline */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                const IconComponent = step.icon;

                return (
                  <div key={idx} className="relative flex items-start space-x-4">
                    {/* Circle Node on Timeline */}
                    <div className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition ${
                      isCurrent
                        ? 'bg-amber-500 text-neutral-900 ring-4 ring-amber-100 shadow-sm'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}>
                      <IconComponent size={13} />
                    </div>

                    {/* Step Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs sm:text-sm font-bold ${
                          isCurrent ? 'text-amber-700 font-extrabold' : isPassed ? 'text-neutral-900' : 'text-neutral-400'
                        }`}>
                          {step.title}
                        </h4>
                        <span className="text-[11px] text-neutral-400 font-medium">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Destination & Recipient Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-neutral-400 font-semibold uppercase text-[10px]">
                  <MapPin size={12} className="text-amber-600" />
                  <span>Destination Address</span>
                </div>
                <p className="font-bold text-neutral-800">
                  {activeOrder.shippingAddress || '124 Mercer Street, Soho, New York, NY 10012'}
                </p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/70 text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-neutral-400 font-semibold uppercase text-[10px]">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>Package Protection</span>
                </div>
                <p className="font-bold text-neutral-800">
                  Insured Delivery • Total: ${Number(activeOrder.totalAmount || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Test Simulation Button */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={advanceStatus}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <span>Simulate Next Delivery Step</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Done
              </button>
            </div>

          </div>
        ) : (
          /* Empty state if user has no orders yet */
          <div className="text-center py-12 space-y-3">
            <Package size={40} className="stroke-[1] mx-auto text-neutral-300" />
            <h3 className="text-base font-bold text-neutral-800">No Orders Placed Yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Once you place an order in the store, your package tracking details and courier updates will appear here automatically.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
