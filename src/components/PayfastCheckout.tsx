import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Payfast requires MD5 signature generation which is best done backend,
// but for this scaffolding we will outline the structure.
// In production, the `signature` should be fetched from a Firebase Cloud Function.

interface PayfastCheckoutProps {
  amount: number;
  itemName: string;
  itemDescription: string;
  onCancel: () => void;
}

export default function PayfastCheckout({ amount, itemName, itemDescription, onCancel }: PayfastCheckoutProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const MERCHANT_ID = '19399931';
  const MERCHANT_KEY = '5bn51ekewsvpu';
  const PASSPHRASE = 'Marciak-1234Profuse'; // Used in backend to generate signature
  const RETURN_URL = window.location.origin + '/checkout/success';
  const CANCEL_URL = window.location.origin + '/checkout/cancel';
  const NOTIFY_URL = 'https://us-central1-profusebeauty.cloudfunctions.net/payfastWebhook'; // Placeholder

  const handleCheckout = () => {
    // In a real implementation, you would first call your backend to generate the signature
    // using the passphrase, then submit the form.
    // For now, we simulate form submission to the sandbox environment.
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-[#d4af37]/30 text-center space-y-6"
      >
        <div className="w-16 h-16 bg-[#fcf8f0] rounded-full mx-auto flex items-center justify-center border-2 border-[#d4af37]/50">
          <span className="text-2xl">🔒</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-black text-[#0a0a0a]">Secure Checkout</h2>
          <p className="text-zinc-500 text-sm mt-2">You will be redirected to Payfast to complete your secure payment.</p>
        </div>

        <div className="bg-[#fcf8f0] p-4 rounded-xl text-left border border-[#d4af37]/20">
          <p className="text-sm font-bold text-zinc-600 flex justify-between">
            <span>Total Amount:</span>
            <span className="text-[#0a0a0a]">R {amount.toFixed(2)}</span>
          </p>
        </div>

        {/* Hidden Payfast Form */}
        <form ref={formRef} action="https://sandbox.payfast.co.za/eng/process" method="POST" className="hidden">
          <input type="hidden" name="merchant_id" value={MERCHANT_ID} />
          <input type="hidden" name="merchant_key" value={MERCHANT_KEY} />
          <input type="hidden" name="return_url" value={RETURN_URL} />
          <input type="hidden" name="cancel_url" value={CANCEL_URL} />
          <input type="hidden" name="notify_url" value={NOTIFY_URL} />
          <input type="hidden" name="amount" value={amount.toFixed(2)} />
          <input type="hidden" name="item_name" value={itemName} />
          <input type="hidden" name="item_description" value={itemDescription} />
          <input type="hidden" name="email_address" value="info@profusebeauty.co.za" />
        </form>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleCheckout}
            className="w-full bg-[#0a0a0a] text-[#d4af37] font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors"
          >
            Pay Now via Payfast
          </button>
          <button 
            onClick={onCancel}
            className="w-full bg-white text-zinc-500 font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
