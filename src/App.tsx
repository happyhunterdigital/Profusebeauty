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
      <footer className="text-center py-8 text-gray-500 text-xs md:text-sm px-4">
        &copy; 2026 Profuse Beauty. Proudly formulated for South African skin tones.
      </footer>
    </main>
  )
}
