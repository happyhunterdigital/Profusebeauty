import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface BookingData {
  fullName: string
  email: string
  phone: string
  location: string // e.g. 'pretoria'
  locationName: string // e.g. 'Edenvinne, Menlyn Park Shopping Centre (Pretoria)'
  date: string // ISO date string, e.g. '2026-07-25'
  time: string // e.g. '10:30'
}

/**
 * Submits a shade-matching booking and queues an acknowledgment email.
 * Writes TWO documents:
 *   1. /bookings/{autoId}   → the booking record
 *   2. /mail/{autoId}       → the email queue document for the extension
 */
export async function submitBookingAndEmail(booking: BookingData): Promise<{
  bookingId: string
  mailId: string
}> {
  // ─── 1. Save the booking ───
  const bookingRef = await addDoc(collection(db, 'bookings'), {
    ...booking,
    createdAt: serverTimestamp(),
    status: 'confirmed',
  })

  console.log('[BookingService] ✅ Booking saved:', bookingRef.id)

  // ─── 2. Queue the acknowledgment email ───
  // The firestore-send-email extension watches the /mail collection
  const mailRef = await addDoc(collection(db, 'mail'), {
    to: booking.email,
    from: 'info@profusebeauty.co.za',
    replyTo: 'info@profusebeauty.co.za',
    message: {
      subject: 'Your Shade Matching Session is Confirmed!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #c9a96e;">Hi ${booking.fullName},</h2>
          <p>Your shade matching session has been reserved. We have sent a confirmation to your phone.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Name</td>
              <td style="padding: 10px 0;">${booking.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Location</td>
              <td style="padding: 10px 0;">${booking.locationName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Date</td>
              <td style="padding: 10px 0;">${booking.date}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Time</td>
              <td style="padding: 10px 0;">${booking.time}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Phone</td>
              <td style="padding: 10px 0;">${booking.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Email</td>
              <td style="padding: 10px 0;">${booking.email}</td>
            </tr>
          </table>
          
          <p style="margin-top: 24px;">See you there!</p>
          <p style="color: #999; font-size: 12px; margin-top: 40px;">
            Profuse Beauty<br>
            <a href="https://profusebeauty.co.za" style="color: #c9a96e;">profusebeauty.co.za</a>
          </p>
        </div>
      `,
      text: `Hi ${booking.fullName},

Your shade matching session has been reserved.

Location: ${booking.locationName}
Date: ${booking.date}
Time: ${booking.time}
Phone: ${booking.phone}
Email: ${booking.email}

See you there!

Profuse Beauty
https://profusebeauty.co.za
`,
    },
  })

  console.log('[BookingService] ✅ Email queued in /mail:', mailRef.id)

  return {
    bookingId: bookingRef.id,
    mailId: mailRef.id,
  }
}
