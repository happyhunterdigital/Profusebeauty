import { useState } from 'react'

const locations = [
  'Edenvinne',
  'Pretoria, Menlyn Mall',
  'Johannesburg, Randburg Mall'
]

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
]

interface FormData {
  location: string
  time: string
  name: string
  contact: string
}

export default function ShadeMatchForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    location: '',
    time: '',
    name: '',
    contact: ''
  })

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (step < 3) setStep(step + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(4)
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {step < 4 && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Step {step} of 3</p>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-rose-500' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Which location will you be joining us at?</h2>
          <div className="grid gap-3">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelect('location', loc)}
                className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-gray-700 font-medium"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">What time works best for your shade match on the 25th of July?</h2>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleSelect('time', time)}
                className="p-4 text-center border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-gray-700 font-medium"
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

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">What are your full name and contact details so we can confirm?</h2>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setStep(2)} className="flex-1 p-4 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50">Back</button>
            <button type="submit" className="flex-1 p-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all">Confirm Booking</button>
          </div>
        </form>
      )}

      {step === 4 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">You're booked!</h2>
          <p className="text-gray-600">We'll see you at {formData.location} on the 25th at {formData.time}.</p>
        </div>
      )}
    </div>
  )
}
