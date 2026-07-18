import { useState } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// ── Social icon SVGs ────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.23 8.23 0 004.84 1.56V7a4.85 4.85 0 01-1.07-.31z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

// ── Social links config ─────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/profusebeauty', icon: <InstagramIcon />, color: 'hover:text-pink-500' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@profusebeauty', icon: <TikTokIcon />, color: 'hover:text-gray-900' },
  { label: 'Facebook', href: 'https://www.facebook.com/profusebeauty', icon: <FacebookIcon />, color: 'hover:text-blue-600' },
  { label: 'WhatsApp', href: 'https://wa.me/27601016673?text=Hi%20Profuse%20Beauty%2C%20I%20just%20booked%20a%20shade%20matching%20session%21', icon: <WhatsAppIcon />, color: 'hover:text-green-500' },
  { label: 'Email', href: 'mailto:info@profusebeauty.co.za', icon: <EmailIcon />, color: 'hover:text-rose-500' },
]

// ── Booking config ──────────────────────────────────────────────────────────
const ADMIN_EMAIL = 'info@profusebeauty.co.za'
const EVENT_DATE = '25 July 2026'
const EVENT_DATE_ISO = '2026-07-25'

const locations = [
  { id: 'edenvinne', city: 'Edenvinne', mall: 'Edenvinne Shopping Centre', detail: 'Ground Floor, Beauty Zone' },
  { id: 'menlyn', city: 'Pretoria', mall: 'Menlyn Park Shopping Centre', detail: 'Level 2, Cosmetics Court' },
  { id: 'randburg', city: 'Johannesburg', mall: 'Randburg Square Shopping Centre', detail: 'Main Concourse, Near Entrance 3' },
]

const timeSlots = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
]

interface FormData {
  location: string
  time: string
  fullName: string
  phone: string
  email: string
}

// ── HTML email template ─────────────────────────────────────────────────────
function buildEmailHtml(data: FormData, locationName: string, city: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmation — Profuse Beauty</title>
</head>
<body style="margin:0;padding:0;background:#f9f5f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f5f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%);padding:40px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A96E;">Profuse Beauty</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">Your Session is Confirmed ✨</h1>
              <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,0.6);">Free HD Liquid Foundation Shade Matching</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 24px;font-size:16px;color:#333;line-height:1.6;">Hi <strong>${data.fullName}</strong>,</p>
              <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
                We are so excited to welcome you to your personalised shade matching session! Below are your booking details. Please save this email for your records.
              </p>

              <!-- Booking Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;border:1px solid #e8d9c0;border-radius:12px;overflow:hidden;margin-bottom:32px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
                          <span style="font-size:12px;color:#999;display:block;margin-bottom:2px;">EVENT</span>
                          <span style="font-size:15px;font-weight:600;color:#0a0a0a;">HD Liquid Foundation Shade Matching</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
                          <span style="font-size:12px;color:#999;display:block;margin-bottom:2px;">DATE &amp; TIME</span>
                          <span style="font-size:15px;font-weight:600;color:#0a0a0a;">${EVENT_DATE} · ${data.time}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #f0e8d8;">
                          <span style="font-size:12px;color:#999;display:block;margin-bottom:2px;">LOCATION</span>
                          <span style="font-size:15px;font-weight:600;color:#0a0a0a;">${locationName}</span>
                          <span style="font-size:13px;color:#777;">${city}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="font-size:12px;color:#999;display:block;margin-bottom:2px;">CONTACT</span>
                          <span style="font-size:15px;font-weight:600;color:#0a0a0a;">${data.phone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 28px;font-size:14px;color:#777;line-height:1.7;">
                Our beauty consultants will be ready for you. We recommend arriving 5 minutes early. No preparation needed — just come as you are!
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/27601016673?text=Hi%20Profuse%20Beauty%2C%20I%20have%20a%20question%20about%20my%20shade%20matching%20booking%20on%20${EVENT_DATE}."
                      style="display:inline-block;background:#25D366;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:50px;letter-spacing:0.5px;">
                      💬 Message us on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Social Row -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:24px;border-top:1px solid #f0e8d8;">
                    <p style="margin:0 0 12px;font-size:12px;color:#aaa;letter-spacing:2px;text-transform:uppercase;">Follow Us</p>
                    <a href="https://www.instagram.com/profusebeauty" style="margin:0 8px;color:#C9A96E;font-size:13px;text-decoration:none;">Instagram</a>
                    <a href="https://www.tiktok.com/@profusebeauty" style="margin:0 8px;color:#C9A96E;font-size:13px;text-decoration:none;">TikTok</a>
                    <a href="https://www.facebook.com/profusebeauty" style="margin:0 8px;color:#C9A96E;font-size:13px;text-decoration:none;">Facebook</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0a0a;padding:24px 48px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.4);line-height:1.8;">
                © 2026 Profuse Beauty · Proudly formulated for South African skin tones<br/>
                Questions? <a href="mailto:info@profusebeauty.co.za" style="color:#C9A96E;text-decoration:none;">info@profusebeauty.co.za</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

// ── Component ───────────────────────────────────────────────────────────────
export default function ShadeMatchForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    location: '',
    time: '',
    fullName: '',
    phone: '',
    email: '',
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
      const locationName = selectedLocation?.mall || ''
      const city = selectedLocation?.city || ''

      // 1️⃣ Save booking to Firestore (now allowed by updated rules)
      await addDoc(collection(db, 'bookings'), {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        locationName,
        city,
        time: formData.time,
        date: EVENT_DATE_ISO,
        status: 'confirmed',
        createdAt: serverTimestamp(),
      })

      // 2️⃣ Queue confirmation email via Firebase "Trigger Email" extension
      //    The extension watches the `mail` collection and sends on write.
      //    `to` = customer, `bcc` = admin copy (clean inbox separation)
      await addDoc(collection(db, 'mail'), {
        to: [formData.email],
        bcc: [ADMIN_EMAIL],
        message: {
          subject: `Booking Confirmed: Your Shade Matching Session — ${EVENT_DATE}`,
          html: buildEmailHtml(formData, locationName, city),
          text: `Hi ${formData.fullName}, your shade matching session at ${locationName} on ${EVENT_DATE} at ${formData.time} is confirmed! Questions? WhatsApp us: +27 60 101 6673`,
        },
        createdAt: serverTimestamp(),
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

      {/* Progress bar */}
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

      {/* ── Step 1: Location ── */}
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

      {/* ── Step 2: Time ── */}
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

      {/* ── Step 3: Contact Details ── */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Tell us about yourself</h2>
          <p className="text-gray-500 text-sm">We will send you a confirmation email with your booking details</p>

          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-4">
            <div><strong>{selectedLocation?.mall}</strong></div>
            <div>{formData.time} · {EVENT_DATE}</div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
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
                placeholder="e.g. 060 101 6673"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Required to receive your confirmation email</p>
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
              {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      )}

      {/* ── Step 4: Success ── */}
      {step === 4 && (
        <div className="text-center py-6">
          {/* Checkmark */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">You are All Set!</h2>
          <p className="text-gray-500 text-sm mb-6">
            A confirmation email has been sent to <strong className="text-gray-700">{formData.email}</strong>
          </p>

          {/* Booking summary card */}
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6 border border-gray-100">
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{formData.fullName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-medium text-right">{selectedLocation?.mall}<br/>({selectedLocation?.city})</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{EVENT_DATE}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{formData.time}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-medium">{formData.phone}</span></div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/27601016673?text=Hi%20Profuse%20Beauty%2C%20I%20just%20booked%20a%20shade%20matching%20session%20on%20${encodeURIComponent(EVENT_DATE)}%20at%20${encodeURIComponent(formData.time)}!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 mb-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ebe5d] transition-all text-sm"
          >
            <WhatsAppIcon />
            Message us on WhatsApp
          </a>

          {/* Social icons row */}
          <div className="border-t border-gray-100 pt-5 mt-2">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Follow us</p>
            <div className="flex items-center justify-center gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`text-gray-400 transition-colors duration-200 ${s.color}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Book again */}
          <button
            onClick={() => { setStep(1); setFormData({ location: '', time: '', fullName: '', phone: '', email: '' }) }}
            className="w-full mt-5 p-3 bg-[#C9A96E] text-white font-bold rounded-xl hover:bg-[#A88B4A] transition-all text-sm"
          >
            Book Another Session
          </button>
        </div>
      )}
    </div>
  )
}
