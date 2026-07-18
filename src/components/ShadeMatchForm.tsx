import { useState } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const locations = [
  { id: 'edenvinne', city: 'Edenvinne', mall: 'Edenvinne Shopping Centre', detail: 'Ground Floor, Beauty Zone' },
  { id: 'menlyn', city: 'Pretoria', mall: 'Menlyn Park Shopping Centre', detail: 'Level 2, Cosmetics Court' },
  { id: 'randburg', city: 'Johannesburg', mall: 'Randburg Square Shopping Centre', detail: 'Main Concourse, Near Entrance 3' }
]

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
]

interface FormData {
  location: string
  time: string
  fullName: string
  phone: string
  email: string
}

export default function ShadeMatchForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    location: '',
    time: '',
    fullName: '',
    phone: '',
    email: ''
  })

  const handleSelectLocation = (locationId: string) => {
    setFormData({ ...formData, location: locationId })
    setStep(2)
  }

  const handleSelectTime = (time: string) => {
    setFormData({ ...formData, time })
    setStep(3)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const selectedLocation = locations.find(l => l.id === formData.location)

      await addDoc(collection(db, 'bookings'), {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || '',
        location: formData.location,
        locationName: selectedLocation?.mall || '',
        city: selectedLocation?.city || '',
        time: formData.time,
        date: '2026-07-25',
        status: 'confirmed',
        createdAt: serverTimestamp(),
        emailSent: false
      })

      setStep(4)
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedLocation = locations.find(l => l.id === formData.location)

  return (
    <div className="max-w-md mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {step < 4 && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Step {step} of 3</p>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-all ${i <= step ? 'bg-rose-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Location */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Which location will you be joining us at?</h2>
          <p className="text-gray-500 text-sm">Select your preferred shade matching venue</p>
          <div className="grid gap-3">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc.id)}
                className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-gray-700"
              >
                <div className="font-semibold text-gray-900">{loc.city}</div>
                <div className="text-sm text-gray-600">{loc.mall}</div>
                <div className="text-xs text-rose-600 mt-1">{loc.detail}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Time */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">What time works best for you?</h2>
          <p className="text-gray-500 text-sm">{selectedLocation?.mall}</p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleSelectTime(time)}
                className="p-3 text-center border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-gray-700 text-sm font-medium"
              >
                {time}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700 mt-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Tell us about yourself</h2>
          <p className="text-gray-500 text-sm">We will send you a confirmation</p>

          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
            <div><strong>{selectedLocation?.mall}</strong></div>
            <div>{formData.time} · 25 July 2026</div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Thabo Motsumi"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="0601016673"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (optional)</label>
              <input
                type="email"
                name="email"
                placeholder="happyhunterdigital@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setStep(2)} className="flex-1 p-3 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium">
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 p-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">You are All Set!</h2>
          <p className="text-gray-600 mb-6">Your shade matching session has been reserved. We have sent a confirmation to your phone.</p>

          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{formData.fullName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-medium text-right">{selectedLocation?.mall}<br/>({selectedLocation?.city})</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">25 July 2026</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{formData.time}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-medium">{formData.phone}</span></div>
            {formData.email && <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="font-medium">{formData.email}</span></div>}
          </div>

          <p className="text-gray-400 text-sm mb-4">See you there!</p>
          <button onClick={() => { setStep(1); setFormData({ location: '', time: '', fullName: '', phone: '', email: '' }) }} className="w-full p-3 bg-[#C9A96E] text-white font-bold rounded-xl hover:bg-[#A88B4A] transition-all">
            Book Another
          </button>
        </div>
      )}
    </div>
  )
}
