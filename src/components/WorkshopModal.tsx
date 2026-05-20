/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, Calendar, Clock, MapPin, Users, Sparkles, Check, ArrowRight, Ticket } from 'lucide-react';
import { WORKSHOP_DATES, WORKSHOP_TIMES } from '../data';

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkshopModal({ isOpen, onClose }: WorkshopModalProps) {
  const [step, setStep] = useState(1); // 1 = Selection state, 2 = Form input, 3 = Confirmation Ticket state
  const [selectedDate, setSelectedDate] = useState(WORKSHOP_DATES[0]);
  const [selectedTime, setSelectedTime] = useState(WORKSHOP_TIMES[0]);
  const [workshopType, setWorkshopType] = useState<'1-on-1' | 'Group'>('1-on-1');
  
  // Form values
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [ticketAttendees, setTicketAttendees] = useState(1);
  const [generatedTicketNum, setGeneratedTicketNum] = useState('');

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!clientName || !clientEmail || !clientPhone) return;
      const tNum = `PROFUSE-WK-${Math.floor(1000 + Math.random() * 9000)}-${workshopType.toUpperCase()}`;
      setGeneratedTicketNum(tNum);
      setStep(3);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backblurs overlay */}
      <div 
        className="absolute inset-0 bg-[#1E1214]/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Main Glassmorphic Panel Frame */}
      <div className="relative bg-[#FDFBF7] dark:bg-[#1E1214] border border-white/20 dark:border-white/10 w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl z-10 p-6 md:p-8 animate-scaleIn">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-[#F9EBE6] rounded-full transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Dynamic Stepper header indicators */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step 
                  ? 'w-8 bg-pink-700 dark:bg-pink-400' 
                  : s < step 
                    ? 'w-4 bg-emerald-500' 
                    : 'w-4 bg-stone-200 dark:bg-stone-800'
              }`}
            />
          ))}
          <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-2">
            Step {step} of 3
          </span>
        </div>

        {/* STEP 1: DATE & SESSION SELECTOR */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6 text-left">
            <div>
              <span className="text-[10px] bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold px-2 py-0.5 rounded-full uppercase">
                Brooklyn Studio, Pretoria
              </span>
              <h3 className="text-xl md:text-2xl font-serif italic text-[#1E1214] dark:text-white mt-1">
                Brooklyn Makeup Masterclass
              </h3>
              <p className="text-xs text-stone-500 dark:text-gray-400">
                Pick your preferred workshop setting and timeslot to calibrate your shade routines.
              </p>
            </div>

            {/* Type selector cards */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400">
                1. Select Workshop Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWorkshopType('1-on-1')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                    workshopType === '1-on-1'
                      ? 'border-pink-600 dark:border-pink-300 bg-pink-500/5 dark:bg-pink-500/10 scale-[1.01]'
                      : 'border-stone-200 dark:border-white/5 bg-stone-50/50 dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-[#1E1214] dark:text-white flex items-center gap-1.5">
                      1-on-1 Shade Match
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Private 90-min profiling with Marcia Kgaphola</p>
                  </div>
                  <div className="text-sm font-bold text-pink-700 dark:text-pink-300 mt-4">R450 per session</div>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkshopType('Group')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                    workshopType === 'Group'
                      ? 'border-pink-600 dark:border-pink-300 bg-pink-500/5 dark:bg-pink-500/10 scale-[1.01]'
                      : 'border-stone-200 dark:border-white/5 bg-stone-50/50 dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-[#1E1214] dark:text-white flex items-center gap-1.5">
                      Group Glam Social
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Interactive 3-hour team masterclass (Max 6)</p>
                  </div>
                  <div className="text-sm font-bold text-pink-700 dark:text-pink-300 mt-4">R250 per seat</div>
                </button>
              </div>
            </div>

            {/* Date Select grid */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400">
                2. Select Pretoria Studio Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                {WORKSHOP_DATES.map((dt) => (
                  <button
                    type="button"
                    key={dt.id}
                    onClick={() => setSelectedDate(dt)}
                    className={`p-3 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      selectedDate.id === dt.id
                        ? 'bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] border-transparent'
                        : 'border-stone-200 dark:border-white/10 bg-white dark:bg-black/10 text-stone-700 dark:text-gray-300 hover:border-stone-400'
                    }`}
                  >
                    {dt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400">
                3. Select Time Window
              </label>
              <div className="flex flex-col gap-2">
                {WORKSHOP_TIMES.map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setSelectedTime(t)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs text-left cursor-pointer transition-all ${
                      selectedTime.id === t.id
                        ? 'border-pink-600 dark:border-pink-400 bg-pink-500/5 dark:bg-pink-500/10 font-bold'
                        : 'border-stone-200 dark:border-white/5'
                    }`}
                  >
                    <Clock size={14} className="text-gray-400" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:opacity-90 active:translate-y-0.5 duration-150"
            >
              Continue to Details
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* STEP 2: DETAILS ENTRY FORM */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-5 text-left">
            <div>
              <h3 className="text-xl font-serif italic text-[#1E1214] dark:text-white">
                Ambassador Contact Details
              </h3>
              <p className="text-xs text-stone-500 dark:text-gray-400 mt-1">
                We will email your official entry passport and text you parking details.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lerato Maseko"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 px-4 text-xs text-[#1E1214] dark:text-white placeholder-stone-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300">Email Address</label>
                  <input
                    type="email"
                    placeholder="lerato@domain.co.za"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                    className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 px-4 text-xs text-[#1E1214] dark:text-white placeholder-stone-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300">Phone Number (WhatsApp friendly)</label>
                  <input
                    type="tel"
                    placeholder="e.g. 0812355910"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    className="w-full mt-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 px-4 text-xs text-[#1E1214] dark:text-white placeholder-stone-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
                  />
                </div>
              </div>

              {workshopType === 'Group' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300">Number of Seats (R250 each)</label>
                  <div className="flex items-center gap-3 mt-1.5">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setTicketAttendees(num)}
                        className={`w-10 h-10 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          ticketAttendees === num
                            ? 'bg-pink-700 text-white border-transparent shadow-md'
                            : 'border-stone-200 text-stone-700 dark:text-gray-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-stone-100 hover:bg-stone-200 dark:bg-white/5 border border-transparent dark:hover:bg-white/10 text-stone-700 dark:text-gray-300 py-3 rounded-full text-xs font-bold transition-colors"
              >
                Back to Session
              </button>
              
              <button
                type="submit"
                className="flex-1 bg-pink-700 hover:bg-pink-800 text-white py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                Secure Booking Ticket
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: BOOKING CONFIRMATION & BEAUTIFUL CLAIMABLE PASS */}
        {step === 3 && (
          <div className="space-y-6 text-center animate-fadeIn">
            
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Check size={32} className="animate-scaleIn" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-serif italic text-stone-800 dark:text-white">
                Seat Reserved! Flawless Awaits.
              </h3>
              <p className="text-xs text-stone-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                Hi {clientName}, we have successfully confirmed your {workshopType} cosmetic routine booking. Your ambassador pass has been initialized.
              </p>
            </div>

            {/* PRE-DRESSED DIGITAL PASS / TICKET */}
            <div className="relative border-2 border-dashed border-[#1E1214]/15 dark:border-white/15 rounded-3xl p-5 bg-[#FAF7F2] dark:bg-stone-900/40 text-left overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-teal-500/10 blur-xl pointer-events-none" />

              <div className="flex justify-between items-start pb-4 border-b border-[#1E1214]/10 dark:border-white/10">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Pretoria Masterclass</div>
                  <div className="text-sm font-bold text-[#1E1214] dark:text-white font-serif italic mt-0.5">Profuse Beauty Collective</div>
                </div>
                <Ticket className="text-pink-600 dark:text-pink-400" size={24} />
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 text-xs font-semibold text-[#1E1214] dark:text-white">
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Ambassador Pass Holder</span>
                  <span className="mt-0.5 block">{clientName}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Workshop Type</span>
                  <span className="mt-0.5 block text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-amber-600 font-serif font-black">{workshopType} Shade Match</span>
                </div>
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Scheduled Session</span>
                  <span className="mt-0.5 block">{selectedDate.label}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest">Time Window</span>
                  <span className="mt-0.5 block text-gray-600 dark:text-gray-300">{selectedTime.value}</span>
                </div>
              </div>

              {/* Pinpoint Maps marker address */}
              <div className="bg-white dark:bg-black/20 p-2.5 rounded-2xl flex items-start gap-2 border border-stone-200/50 dark:border-white/5 text-[11px] font-medium mt-1">
                <MapPin size={14} className="text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200 block">Brooklyn Studio, Pretoria</span>
                  <span className="text-gray-500 block text-[10px] mt-0.5">329 Cherry Lane, Brooklyn, Pretoria, 0181</span>
                </div>
              </div>

              {/* Barcode/Ticket ID */}
              <div className="mt-4 pt-4 border-t border-dashed border-[#1E1214]/10 dark:border-white/10 flex flex-col items-center">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Show barcode on checkout arrivals</span>
                <span className="text-xs font-mono font-black tracking-widest text-[#1E1214] dark:text-white mt-1 uppercase">
                  {generatedTicketNum}
                </span>
                
                {/* Simulated Barcode lines */}
                <div className="flex gap-[1.5px] h-6 items-stretch mt-2.5 opacity-60">
                  {[...Array(32)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-[#1E1214] dark:bg-white" 
                      style={{ width: i % 3 === 0 ? '3px' : i % 5 === 0 ? '1px' : '1.5px' }} 
                    />
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={() => {
                setStep(1);
                onClose();
              }}
              className="w-full bg-[#1E1214] dark:bg-[#F9EBE6] text-white dark:text-[#1E1214] py-3 rounded-full text-xs font-bold transition-all"
            >
              Done & Close Calendar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
