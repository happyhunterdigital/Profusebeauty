# Firestore Send Email Extension Setup

## Step 1: SMTP Configuration

Since you use Gmail (info@profusebeauty.co.za), you need an **App Password**:

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification (required)
3. Go to "App passwords" → Select "Mail" → Select "Other (Custom name)"
4. Name it "Firebase ProfuseBeauty" → Click Generate
5. Copy the 16-character password (looks like: abcd efgh ijkl mnop)

## Step 2: Fill the Extension Form

| Field | Value |
|---|---|
| **SMTP connection URI** | `smtps://info@profusebeauty.co.za:YOUR_APP_PASSWORD@smtp.gmail.com:465` |
| **SMTP password** | (leave blank - it's in the URI above) |
| **OAuth2 Client ID** | (leave blank) |
| **OAuth2 Client Secret** | (leave blank) |
| **OAuth2 Refresh Token** | (leave blank) |
| **OAuth2 SMTP User** | (leave blank) |
| **Email documents collection** | `mail` |
| **Default FROM address** | `info@profusebeauty.co.za` |
| **Default REPLY-TO address** | `info@profusebeauty.co.za` |
| **Users collection** | (leave blank) |
| **Templates collection** | `email_templates` |
| **Firestore TTL type** | `Never` |
| **Firestore TTL value** | `1` |
| **TLS Options** | (leave blank) |
| **Enable events** | (unchecked) |

## Step 3: Create Email Template in Firestore

After installing the extension, create a document in `email_templates` collection:

**Document ID:** `booking_confirmation`

**Fields:**
```json
{
  "subject": "Your Shade Matching is Confirmed - Profuse Beauty",
  "html": "<html><body style='font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'><div style='text-align: center; margin-bottom: 30px;'><img src='https://res.cloudinary.com/dafc66cma/image/upload/v1782249161/favicon_zihqgj.png' style='width: 60px; height: 60px; border-radius: 50%;' /></div><h1 style='color: #C9A96E; font-family: Playfair Display, serif; text-align: center;'>Booking Confirmed!</h1><p>Hi {{fullName}},</p><p>Your shade matching session has been confirmed for:</p><div style='background: #FAF7F2; padding: 20px; border-radius: 12px; margin: 20px 0;'><p><strong>Date:</strong> 25 July 2026</p><p><strong>Time:</strong> {{time}}</p><p><strong>Location:</strong> {{locationName}}</p></div><p>We can't wait to help you find your perfect shade!</p><p style='color: #888; font-size: 12px; margin-top: 30px;'>Profuse Beauty<br/>info@profusebeauty.co.za</p></body></html>",
  "text": "Hi {{fullName}}, Your shade matching is confirmed for 25 July 2026 at {{time}} at {{locationName}}. See you there! - Profuse Beauty"
}
```

## Step 4: Update Your Form to Trigger Email

When a booking is created, also create a document in the `mail` collection:

```typescript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// In your handleSubmit, after creating the booking:
await addDoc(collection(db, 'mail'), {
  to: formData.email,
  template: {
    name: 'booking_confirmation',
    data: {
      fullName: formData.fullName,
      time: formData.time,
      locationName: selectedLocation?.mall
    }
  }
})
```

The extension will automatically watch the `mail` collection and send emails when documents are added.
