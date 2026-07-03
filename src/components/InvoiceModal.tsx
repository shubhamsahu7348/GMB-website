import React from 'react';
import { X, Printer, CheckCircle, Award, Mail, Phone, MapPin } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    // Elegant native print trigger.
    // For premium feel, print styling handles hiding of control elements automatically.
    window.print();
  };

  // Calculate taxes (18% GST typical for sweet confectioneries in India, split as 9% CGST + 9% SGST)
  // Let's make it itemized so it looks highly genuine!
  const calculatedTaxRate = 0.05; // 5% GST on Sweets in India
  const taxableAmount = Math.round(order.finalAmount / (1 + calculatedTaxRate));
  const totalGst = order.finalAmount - taxableAmount;
  const cgst = Math.round(totalGst / 2);
  const sgst = totalGst - cgst;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in no-print">
      <div className="bg-white dark:bg-stone-950 text-stone-800 dark:text-cream-100 rounded-none border border-stone-200 dark:border-stone-800 w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Modal Toolbar (Controls) */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 bg-[#FFF8E7] dark:bg-stone-900 flex items-center justify-between no-print">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <h2 className="font-serif text-sm sm:text-base font-bold text-stone-800 dark:text-cream-100">
              Order Confirmed • Receipt Ready
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#800000] hover:bg-[#990000] dark:bg-[#D4AF37] dark:hover:bg-[#E5C158] text-white dark:text-stone-950 text-xs font-bold rounded-none uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print/Download Invoice</span>
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-none border border-stone-250 dark:border-stone-800 transition-colors text-stone-500 dark:text-stone-400 cursor-pointer"
              title="Close modal"
            >
              <X className="h-5.5 w-5.5" />
            </button>
          </div>
        </div>

        {/* --- INVOICE PRINTABLE CONTAINER --- */}
        <div id="printable-invoice" className="p-8 sm:p-12 space-y-8 flex-1 bg-[#FFF8E7] dark:bg-stone-900 text-stone-800 dark:text-cream-100">
          
          {/* Header Row: Brand Logo vs Invoice ID */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
            <div className="text-center sm:text-left space-y-2">
              <span className="font-serif text-2xl font-bold tracking-wider text-[#800000] dark:text-[#D4AF37] uppercase">
                GOKUL
              </span>
              <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Mishthan Bhandar
              </span>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">Pure Taste • Pure Tradition</p>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <span className="text-[10px] font-black uppercase text-stone-400 dark:text-stone-500 block">TAX INVOICE</span>
              <h3 className="font-mono text-sm font-bold text-stone-800 dark:text-cream-100">{order.invoiceNumber}</h3>
              <div className="text-xs text-stone-500 dark:text-stone-400 font-medium space-y-0.5">
                <p>Date: {order.date}</p>
                <p>Order No: {order.orderNumber}</p>
                <p>Status: <strong className="text-emerald-500 uppercase font-bold text-[10px]">PAID</strong></p>
              </div>
            </div>
          </div>

          {/* Address Details (Merchant vs Client) */}
          <div className="grid sm:grid-cols-2 gap-8 text-xs leading-relaxed border-b border-stone-200 dark:border-stone-800 pb-6">
            {/* Merchant Details */}
            <div className="space-y-1">
              <strong className="text-stone-900 dark:text-cream-100 font-bold block uppercase text-[10px] tracking-wider">Merchant Location</strong>
              <p className="font-bold text-[#800000] dark:text-[#D4AF37]">Gokul Mishthan Bhandar Confectionery</p>
              <p className="flex items-start gap-1 text-stone-500 dark:text-stone-400">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>Gokul Bhawan, Sector-3, Mandir Road, Jaipur, Rajasthan</span>
              </p>
              <p className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                <Phone className="h-3 w-3 text-[#D4AF37]" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                <Mail className="h-3 w-3 text-[#D4AF37]" />
                <span>billing@gokulsweets.com</span>
              </p>
              <p className="text-[9px] text-stone-400 dark:text-stone-500 mt-1">FSSAI License No: 10015013000940</p>
            </div>

            {/* Customer Details */}
            <div className="space-y-1 sm:text-right sm:items-end flex flex-col">
              <strong className="text-stone-900 dark:text-cream-100 font-bold block uppercase text-[10px] tracking-wider">Shipped & Billed To</strong>
              <p className="font-bold text-stone-800 dark:text-cream-100">{order.shippingAddress.name}</p>
              <p className="text-stone-500 dark:text-stone-400 max-w-[250px] sm:text-right">{order.shippingAddress.address}</p>
              <p className="text-stone-500 dark:text-stone-400">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p className="text-stone-500 dark:text-stone-400">Mobile: +91 {order.shippingAddress.phone}</p>
              <p className="text-stone-500 dark:text-stone-400">Email: {order.shippingAddress.email}</p>
            </div>
          </div>

          {/* Purchased Items List Table */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-900 dark:text-cream-100 block">Itemized Billing Summary</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-300 dark:border-stone-800 text-[10px] uppercase text-stone-400 dark:text-stone-500 font-bold">
                    <th className="py-2.5">Sweets Description</th>
                    <th className="py-2.5 text-center">Pack Size</th>
                    <th className="py-2.5 text-center">Qty</th>
                    <th className="py-2.5 text-center">Base Price</th>
                    <th className="py-2.5 text-right">Total (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-850">
                  {order.items.map((item, idx) => {
                    const discountRate = item.product.discountPercent;
                    const finalItemPrice = Math.round(item.priceAtSelection * (1 - discountRate / 100));
                    return (
                      <tr key={idx} className="text-stone-700 dark:text-stone-300">
                        <td className="py-3">
                          <strong className="font-semibold text-stone-800 dark:text-cream-100">{item.product.name}</strong>
                          {discountRate > 0 && (
                            <span className="block text-[9px] text-green-600 dark:text-green-400 font-medium">({discountRate}% Festive Discount Applied)</span>
                          )}
                        </td>
                        <td className="py-3 text-center font-medium">{item.selectedWeight}</td>
                        <td className="py-3 text-center">{item.quantity}</td>
                        <td className="py-3 text-center">₹{finalItemPrice}</td>
                        <td className="py-3 text-right font-bold text-stone-900 dark:text-cream-100">₹{finalItemPrice * item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subtotals, Tax calculations & Loyalty point reward */}
          <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            {/* Loyalty points notification stamp */}
            <div className="p-4 bg-[#800000]/5 dark:bg-[#D4AF37]/5 rounded-none border border-[#800000]/15 dark:border-[#D4AF37]/25 flex flex-col justify-center space-y-1 max-w-sm">
              <span className="text-sm">🎁</span>
              <p className="text-[11px] font-bold text-[#800000] dark:text-[#D4AF37] flex items-center gap-1 leading-none">
                <Award className="h-3.5 w-3.5" /> Loyalty Reward Point
              </p>
              <p className="text-[10px] text-stone-600 dark:text-stone-400 leading-normal">
                Congratulations! You earned <strong className="text-[#800000] dark:text-[#D4AF37]">{order.loyaltyPointsEarned} points</strong> on this transaction. Use them to redeem free sweets on future orders!
              </p>
            </div>

            {/* Financial Calculations */}
            <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400 text-right font-medium">
              <div className="flex justify-between sm:justify-end gap-16">
                <span>Items Subtotal:</span>
                <span className="text-stone-850 dark:text-cream-100 font-bold">₹{order.totalAmount}</span>
              </div>
              
              {order.discountAmount > 0 && (
                <div className="flex justify-between sm:justify-end gap-16 text-green-600 dark:text-green-400 font-bold">
                  <span>Discount Applied ({order.couponApplied}):</span>
                  <span>-₹{order.discountAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between sm:justify-end gap-16">
                <span>CGST (2.5%):</span>
                <span>₹{cgst}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-16">
                <span>SGST (2.5%):</span>
                <span>₹{sgst}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-16">
                <span>Delivery charges:</span>
                <span>{order.finalAmount - order.totalAmount + order.discountAmount - totalGst === 0 ? 'FREE' : '₹100'}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between sm:justify-end gap-16 text-sm font-bold text-stone-900 dark:text-cream-100">
                <span>Grand Paid Total:</span>
                <span className="text-base text-[#800000] dark:text-[#D4AF37]">₹{order.finalAmount}</span>
              </div>
              <p className="text-[9px] text-stone-400 dark:text-stone-500">Payment Method: {order.paymentMethod}</p>
            </div>
          </div>

          {/* Ghee Seal Signature watermark */}
          <div className="text-center pt-8 border-t border-dashed border-stone-200 dark:border-stone-800">
            <p className="font-serif text-sm italic font-bold text-[#D4AF37]">Pure Taste • Pure Tradition</p>
            <p className="text-[9px] text-stone-400 dark:text-stone-500 mt-1 uppercase tracking-widest font-bold">Computer-Generated Tax Invoice. No signature required.</p>
          </div>

        </div>

      </div>

      {/* Embedded print css overrides for native print */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

    </div>
  );
}
