import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Landmark, Truck, Wallet, CheckCircle, Loader } from 'lucide-react';
import { CartItem, Coupon, ShippingAddress, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderComplete: (order: Order) => void;
  currentUser: any;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onOrderComplete,
  currentUser,
}: CheckoutModalProps) {
  
  // Shipping form fields
  const [addressForm, setAddressForm] = useState<ShippingAddress>({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    pincode: currentUser?.pincode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('upi');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Razorpay Gateway Simulation states
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [razorpayStep, setRazorpayStep] = useState<'verify' | 'processing' | 'success'>('verify');
  const [securePin, setSecurePin] = useState('');
  const [pinError, setPinError] = useState('');
  const [paymentProgress, setPaymentProgress] = useState(0);

  if (!isOpen) return null;

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => acc + item.priceAtSelection * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    const rawDiscount = (subtotal * appliedCoupon.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedCoupon.maxDiscount);
  }

  const deliveryFee = subtotal >= 1500 ? 0 : 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Form validator
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!addressForm.name.trim()) errors.name = 'Full Name is required';
    if (!addressForm.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(addressForm.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!addressForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(addressForm.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!addressForm.address.trim()) errors.address = 'Street Address is required';
    if (!addressForm.city.trim()) errors.city = 'City is required';
    if (!addressForm.state.trim()) errors.state = 'State is required';
    if (!addressForm.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^[0-9]{6}$/.test(addressForm.pincode)) {
      errors.pincode = 'Must be 6-digit PIN';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Launch simulated Razorpay checkout immediately unless it is COD
    setFormErrors({});
    if (paymentMethod === 'cod') {
      triggerOrderComplete('COD-PAY-ON-DELIVERY');
    } else {
      setShowRazorpay(true);
      setRazorpayStep('verify');
      setSecurePin('');
      setPinError('');
    }
  };

  // Simulated Razorpay payment loop
  const handleRazorpayPayment = () => {
    if (paymentMethod === 'upi' && securePin.length < 4) {
      setPinError('Please enter a 4 or 6 digit UPI secure PIN.');
      return;
    }
    if (paymentMethod === 'card' && securePin.length < 3) {
      setPinError('Please enter a 3-digit CVV secure PIN.');
      return;
    }

    setPinError('');
    setRazorpayStep('processing');
    setPaymentProgress(0);

    const interval = setInterval(() => {
      setPaymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setRazorpayStep('success');
          // Complete order with a mock transaction ID
          setTimeout(() => {
            const mockTxId = 'pay_' + Math.random().toString(36).substring(2, 11).toUpperCase();
            triggerOrderComplete(mockTxId);
          }, 1500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const triggerOrderComplete = (transactionId: string) => {
    const timestamp = Date.now();
    const orderNumber = 'GMB-' + timestamp.toString().slice(-6);
    const invoiceNum = 'INV-2026-' + Math.floor(Math.random() * 90000 + 10000);
    const pointsEarned = Math.round(grandTotal * 0.05); // 5% loyalty points reward

    const finalOrder: Order = {
      id: 'ord_' + timestamp,
      orderNumber,
      items: cartItems,
      totalAmount: subtotal,
      discountAmount,
      finalAmount: grandTotal,
      couponApplied: appliedCoupon?.code,
      shippingAddress: addressForm,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      paymentMethod: paymentMethod.toUpperCase() === 'COD' ? 'Cash on Delivery' : `${paymentMethod.toUpperCase()} (${transactionId})`,
      paymentId: transactionId,
      invoiceNumber: invoiceNum,
      loyaltyPointsEarned: pointsEarned,
    };

    onOrderComplete(finalOrder);
    setShowRazorpay(false);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFF8E7] dark:bg-stone-950 rounded-none border border-stone-200 dark:border-stone-850 w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col lg:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-stone-950/10 hover:bg-stone-950/20 dark:bg-stone-100/10 dark:hover:bg-stone-100/20 text-stone-800 dark:text-cream-100 rounded-none border border-stone-200 dark:border-stone-800 transition-all cursor-pointer z-10"
          title="Cancel checkout"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Shipping Address & Payment Form */}
        <div className="w-full lg:w-3/5 p-6 sm:p-8 border-r border-stone-200 dark:border-stone-850">
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100 mb-6">
            Shipping & Checkout
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Form Section: Shipping details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  placeholder="Gopal Sharma"
                  className="w-full text-xs px-3 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                />
                {formErrors.name && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.name}</p>}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full text-xs px-3 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                />
                {formErrors.phone && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={addressForm.email}
                  onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                  placeholder="gopal@gmail.com"
                  className="w-full text-xs px-3 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                />
                {formErrors.email && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                  placeholder="Plot 42, Ghee Mansion, Sector 4"
                  className="w-full text-xs px-3 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                />
                {formErrors.address && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.address}</p>}
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  placeholder="Jaipur"
                  className="w-full text-xs px-3 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                />
                {formErrors.city && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.city}</p>}
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      placeholder="Rajasthan"
                      className="w-full text-xs px-2.5 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                    />
                    {formErrors.state && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.state}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 block mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      placeholder="302001"
                      className="w-full text-xs px-2.5 py-2.5 border border-stone-300 dark:border-stone-800 rounded-none bg-white dark:bg-stone-900 text-stone-800 dark:text-cream-100 focus:outline-none focus:border-[#800000]"
                    />
                    {formErrors.pincode && <p className="text-[10px] text-red-600 font-medium mt-0.5">{formErrors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-850">
              <label className="text-[11px] font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 block mb-3">
                Select Payment Mode
              </label>

              <div className="grid grid-cols-3 gap-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-none border flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-stone-900 dark:text-[#D4AF37] font-bold'
                      : 'border-stone-300 bg-white dark:border-stone-800 dark:bg-stone-900 text-stone-600 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <Wallet className="h-5 w-5" />
                  <span className="text-[11px] font-bold block">UPI Apps</span>
                </div>

                {/* Card Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-none border flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-stone-900 dark:text-[#D4AF37] font-bold'
                      : 'border-stone-300 bg-white dark:border-stone-800 dark:bg-stone-900 text-stone-600 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-[11px] font-bold block">Card / CVV</span>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-none border flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-stone-900 dark:text-[#D4AF37] font-bold'
                      : 'border-stone-300 bg-white dark:border-stone-800 dark:bg-stone-900 text-stone-600 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <Truck className="h-5 w-5" />
                  <span className="text-[11px] font-bold block">Cash Delivery</span>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 font-bold text-sm rounded-none shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-6 active:scale-95 uppercase tracking-wider"
            >
              <span>{paymentMethod === 'cod' ? 'Complete Cash Order' : 'Proceed to Secure Payment Gateway'}</span>
              <ShieldCheck className="h-4.5 w-4.5" />
            </button>

          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 bg-[#FFF8E7] dark:bg-stone-900 flex flex-col justify-between border-l border-stone-200 dark:border-stone-850">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 mb-4 pb-2 border-b border-stone-200 dark:border-stone-850">
              Order Summary
            </h3>

            {/* List of items */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 mb-6">
              {cartItems.map((item) => {
                const finalPrice = Math.round(item.priceAtSelection * (1 - item.product.discountPercent / 100));
                return (
                  <div key={item.id} className="flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-400">
                    <img src={item.product.image} alt="" className="w-10 h-10 object-cover rounded-none border border-stone-250 dark:border-stone-850 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <strong className="text-stone-800 dark:text-cream-100 block truncate">{item.product.name}</strong>
                      <span className="text-[9px] text-stone-400 font-medium">Weight: {item.selectedWeight} • Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-stone-800 dark:text-cream-100 ml-auto">
                      ₹{finalPrice * item.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price breakdown summary */}
            <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-850 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-800 dark:text-cream-100">₹{subtotal}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-500 font-medium">
                  <span>Promo Discount ({appliedCoupon?.code}):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Delivery charges:</span>
                <span className="font-semibold text-stone-800 dark:text-cream-100">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-850 flex justify-between text-sm font-bold text-stone-950 dark:text-cream-100">
                <span>Total Amount:</span>
                <span className="text-base text-[#800000] dark:text-[#D4AF37]">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Secure Trust Stamp */}
          <div className="mt-8 p-4 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-850 rounded-none space-y-2 text-[10px] text-stone-500 dark:text-stone-400 leading-normal">
            <p className="font-bold flex items-center gap-1 text-stone-800 dark:text-cream-100 text-[11px]">
              🛡️ Gokul Safe-Payment Guarantee
            </p>
            <p>
              Your payment credentials are processed securely using bank-grade AES 256-bit encryption. Handcrafted under high hygienic standards.
            </p>
          </div>

        </div>

      </div>

      {/* --- RAZORPAY GATEWAY SIMULATOR SCREEN --- */}
      {showRazorpay && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-slate-900 text-white rounded-none w-full max-w-sm border border-slate-800 overflow-hidden shadow-2xl relative animate-scale-up">
            
            {/* Header Brand */}
            <div className="bg-[#1C2541] px-5 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block leading-none">Secured by</span>
                  <span className="text-sm font-black tracking-wider text-blue-400 leading-none">RAZORPAY</span>
                </div>
              </div>
              <button
                onClick={() => setShowRazorpay(false)}
                className="text-slate-400 hover:text-white"
                title="Cancel transaction"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Inner Step Layouts */}
            <div className="p-6 space-y-6">
              
              {/* Step 1: Verification card PIN / CVV input */}
              {razorpayStep === 'verify' && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Merchant Name</span>
                    <h4 className="text-base font-bold text-[#D4AF37]">Gokul Mishthan Bhandar</h4>
                    <span className="text-lg font-black block pt-1 text-white">₹{grandTotal}</span>
                  </div>

                  <div className="bg-slate-950/60 p-4 rounded-none border border-slate-800 text-xs text-slate-300 space-y-3">
                    <p className="font-bold text-center border-b border-slate-800 pb-2">
                      {paymentMethod === 'upi' ? 'UPI 4-Digit Security PIN Required' : 'Credit Card 3-Digit CVV Pin Required'}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-center">
                        <input
                          type="password"
                          maxLength={paymentMethod === 'upi' ? 6 : 3}
                          value={securePin}
                          onChange={(e) => setSecurePin(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder={paymentMethod === 'upi' ? '• • • •' : '• • •'}
                          className="w-32 tracking-[0.7em] text-center text-lg font-bold py-2 bg-slate-900 border border-slate-700 rounded-none text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      
                      {pinError && <p className="text-[10px] text-red-400 text-center font-semibold">{pinError}</p>}
                    </div>

                    <p className="text-[9px] text-slate-400 text-center leading-relaxed">
                      Entering secure mock PIN verifies payment. PIN is local and never logged anywhere.
                    </p>
                  </div>

                  <button
                    onClick={handleRazorpayPayment}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-none transition-colors cursor-pointer text-center"
                  >
                    Authorize Payment of ₹{grandTotal}
                  </button>
                </div>
              )}

              {/* Step 2: Processing animated progress circular circle */}
              {razorpayStep === 'processing' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative">
                    <Loader className="h-14 w-14 text-blue-500 animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-400">
                      {paymentProgress}%
                    </span>
                  </div>
                  <div>
                    <strong className="text-sm font-bold block text-white">Connecting Secure Banking Nodes...</strong>
                    <span className="text-[10px] text-slate-400">Verifying secure multi-party credentials with bank servers</span>
                  </div>
                </div>
              )}

              {/* Step 3: Success checklist celebration */}
              {razorpayStep === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                  <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
                  <div>
                    <h4 className="text-base font-bold text-emerald-400">Transaction Successful!</h4>
                    <span className="text-[10px] text-slate-400">Razorpay ID: PAY-SUCCESS-{Math.floor(Math.random() * 9000 + 1000)}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Sweets prepared and placed in airtight silver foils. Loading Invoice...
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
