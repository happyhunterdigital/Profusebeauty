import ShadeMatchForm from './components/ShadeMatchForm'

const features = [
  'High-definition finish for camera-ready skin',
  'Lightweight and hydrating formula',
  '30ml pump bottle for hygienic, mess-free application',
  'Long-wear and transfer-resistant',
  'Inclusive shade range for all complexions'
]

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* ===== HERO SECTION — Mobile Optimized ===== */}
      <section className="relative w-full min-h-[85vh] md:min-h-[520px] flex flex-col items-center justify-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=1200&q=80"
            alt="Profuse Beauty"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,26,26,0.15) 0%, rgba(26,26,26,0.5) 40%, rgba(26,26,26,0.92) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-[2] text-center w-full max-w-lg px-5 pb-8 md:pb-12">
          {/* Logo */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full mx-auto mb-4 border-2 border-[rgba(201,169,110,0.4)] p-[3px] bg-[rgba(0,0,0,0.2)] backdrop-blur-md">
            <img
              src="https://res.cloudinary.com/dafc66cma/image/upload/v1782249161/favicon_zihqgj.png"
              alt="Profuse Beauty"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Brand Label */}
          <p className="font-['Playfair_Display'] text-xs md:text-sm tracking-[4px] md:tracking-[5px] uppercase text-[#E8D5A3] mb-3">
            Profuse Beauty
          </p>

          {/* Headline */}
          <h1 className="font-['Playfair_Display'] text-[28px] md:text-[40px] font-bold text-[#FFFBF7] leading-[1.15] mb-3">
            Find Your
            <span className="text-[#C9A96E] block text-[32px] md:text-[44px] mt-1">Perfect Shade</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[rgba(255,251,247,0.8)] text-sm md:text-base font-light max-w-[320px] mx-auto mb-5 leading-relaxed">
            Free HD Liquid Foundation shade matching at Edenvinne, Menlyn Park & Randburg Square
          </p>

          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(201,169,110,0.15)] border border-[rgba(201,169,110,0.3)] rounded-full px-5 py-2.5 text-[#E8D5A3] text-xs md:text-sm font-medium">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full animate-pulse" />
            25 July 2026 · 10am – 4pm
          </div>
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section className="px-4 md:px-6 py-10 md:py-16">
        <ShadeMatchForm />
      </section>

      {/* ===== PRODUCT SECTION ===== */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 mb-12 md:mb-16 mx-3 md:mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">HD Liquid Foundation</h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              Achieve flawless, long-lasting coverage proudly formulated for South African skin tones. This 3-in-1 formula acts as a concealer, primer, and oil-free UV protector for photo-ready skin.
            </p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-100 rounded-2xl p-6 md:p-8 aspect-square flex items-center justify-center">
            <div className="text-center text-rose-400">
              <p className="text-lg md:text-xl font-bold">Profuse Beauty</p>
              <p className="text-sm md:text-base">HD Liquid Foundation</p>
              <p className="text-xs md:text-sm mt-1">30ml</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-100 py-10 px-4 text-center">
        <p className="text-xs uppercase tracking-[4px] text-[#C9A96E] mb-4 font-medium">Profuse Beauty</p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Instagram */}
          <a href="https://www.instagram.com/profusebeauty" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@profusebeauty" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.23 8.23 0 004.84 1.56V7a4.85 4.85 0 01-1.07-.31z"/>
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/profusebeauty" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* WhatsApp */}
          <a href="https://wa.me/27601016673" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="text-gray-400 hover:text-green-500 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
          {/* Email */}
          <a href="mailto:happyhunterdigital@gmail.com" aria-label="Email"
            className="text-gray-400 hover:text-rose-500 transition-colors duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>

        <p className="text-gray-400 text-xs">© 2026 Profuse Beauty · Proudly formulated for South African skin tones.</p>
      </footer>

    </main>
  )
}
