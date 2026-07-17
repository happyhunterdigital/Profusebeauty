# Profuse Beauty — Shade Matching Event Landing Page

A luxury, mobile-optimized landing page for the **Profuse Beauty HD Liquid Foundation Shade Matching Event** on **25 July 2026**.

---

## Features

- **4-Step Conversational Booking Form** — Progressive disclosure with one question per screen
- **Firebase Firestore Integration** — All bookings saved to the cloud in real-time
- **AI-Powered Chatbot** — Answers questions about shade matching, event details, locations, product specs, and contact info
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Luxury Beauty Aesthetic** — Gold accents, serif typography, warm cream palette

---

## Quick Start (GitHub Codespaces)

### 1. Upload the Files

Upload these files to your repository root:

```
Profusebeauty/
├── index.html          # The landing page
├── README.md           # This file
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deployment (optional)
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Click **"Add app"** → **Web (</>)**
4. Copy the `firebaseConfig` object
5. In `index.html`, find this section and **replace the placeholder values**:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Replace
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace
  projectId: "YOUR_PROJECT_ID",        // Replace
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace
  messagingSenderId: "YOUR_SENDER_ID", // Replace
  appId: "YOUR_APP_ID"                 // Replace
};
```

### 3. Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Click **Next** → select a region close to South Africa (e.g. `europe-west`)
5. Click **Enable**

### 4. Update Firestore Security Rules

Go to **Firestore Database** → **Rules** tab. Replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shadeMatchingBookings/{doc} {
      allow create: if request.resource.data.keys().hasAll(['fullName','phone','location','time']);
      allow read: if false;
    }
  }
}
```

Click **Publish**.

### 5. Deploy with GitHub Pages

#### Option A: GitHub Pages (Free)

1. In your repo, go to **Settings** → **Pages**
2. Under **Build and deployment**, select **Source: Deploy from a branch**
3. Select **Branch: main** → **Folder: / (root)**
4. Click **Save**
5. Your site will be live at `https://happyhunterdigital.github.io/Profusebeauty`

#### Option B: GitHub Actions (Auto-deploy)

Create `.github/workflows/static.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Push this file — GitHub will auto-deploy on every commit.

---

## Project Structure

```
index.html
├── Hero Section          # Background image + logo + event badge
├── Product Section       # Foundation image + features
├── Booking Form          # 4-step progressive form → Firebase
├── Contact Section       # Email, phone, website, social links
├── Chatbot (floating)    # AI assistant with shade matching knowledge
└── Footer
```

---

## Chatbot Knowledge Base

The chatbot is trained to answer questions about:

| Topic | Coverage |
|-------|----------|
| **Shade Matching** | Process, undertones, swatching, session duration |
| **Event Details** | Date (25 July 2026), times (10am–4pm), booking flow |
| **Product** | HD Liquid Foundation specs, 3-in-1 formula, 30ml pump |
| **Locations** | Menlyn Park (Pretoria) & Randburg Square (Johannesburg) |
| **Pricing** | Free shade matching, product available for purchase |
| **Contact** | info@profusebeauty.co.za, +27 (0) 81 235 5910, @profusebeauty_rsa |
| **Brand** | SA-made, inclusive shades, cruelty-free |

---

## Contact

- **Email:** info@profusebeauty.co.za
- **Website:** www.profusebeauty.co.za
- **Phone/WhatsApp:** +27 (0) 81 235 5910
- **Instagram:** @profusebeauty_rsa

---

## License

&copy; 2026 Profuse Beauty. All rights reserved.
