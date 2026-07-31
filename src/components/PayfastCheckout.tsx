import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase'; // import initialized services

interface PayfastCheckoutProps {
  amount: number;
  itemName: string;
  itemDescription: string;
  onCancel: () => void;
}

export default function PayfastCheckout({ amount, itemName, itemDescription, onCancel }: PayfastCheckoutProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payfastData, setPayfastData] = useState<Record<string, string> | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [payfastUrl, setPayfastUrl] = useState<string>("https://sandbox.payfast.co.za/eng/process");

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const generatePayfastSignature = httpsCallable(functions, 'generatePayfastSignature');
      
      const result = await generatePayfastSignature({
        amount: amount,
        itemName: itemName,
        itemDescription: itemDescription,
        mPaymentId: `ORD-${Date.now()}`
      });

      const data = result.data as { signature: string, payload: Record<string, string>, payfastUrl: string };
      
      setPayfastData(data.payload);
      setSignature(data.signature);
      setPayfastUrl(data.payfastUrl || "https://sandbox.payfast.co.za/eng/process");

      // Once state updates with the form data, we submit the form
      // We use setTimeout to ensure React has rendered the hidden inputs before submitting
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.submit();
        }
      }, 100);

    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-[#d4af37]/30 text-center space-y-6 relative"
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

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        {/* Hidden Payfast Form populated by Cloud Function data */}
        <form ref={formRef} action={payfastUrl} method="POST" className="hidden">
          {payfastData && Object.entries(payfastData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
          {signature && <input type="hidden" name="signature" value={signature} />}
        </form>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full font-bold uppercase tracking-widest text-sm py-4 rounded-xl transition-colors ${
              isLoading 
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                : 'bg-[#0a0a0a] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0a]'
            }`}
          >
            {isLoading ? 'Securing Payment...' : 'Pay Now via Payfast'}
          </button>
          <button 
            onClick={onCancel}
            disabled={isLoading}
            className="w-full bg-white text-zinc-500 font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-zinc-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
