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
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="inline-block px-4 py-1 bg-rose-100 text-rose-700 text-sm font-semibold rounded-full mb-4">
          Exclusive Shade Matching Event
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Find Your Perfect Match with <span className="text-rose-600">Profuse Beauty</span>
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Join us on <strong>25 July | 10:00 AM - 4:00 PM</strong>
        </p>
        <p className="text-gray-500 mb-8">
          Experience our HD Liquid Foundation live at Edenvinne, Pretoria Menlyn Mall, or Johannesburg Randburg Mall.
        </p>
      </section>

      <section className="px-6 pb-16">
        <ShadeMatchForm />
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 bg-white rounded-3xl shadow-sm border border-gray-100 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">HD Liquid Foundation</h2>
            <p className="text-gray-600 mb-6">
              Achieve flawless, long-lasting coverage proudly formulated for South African skin tones. This 3-in-1 formula acts as a concealer, primer, and oil-free UV protector for photo-ready skin.
            </p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-rose-500 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-100 rounded-2xl p-8 aspect-square flex items-center justify-center">
             <div className="text-center text-rose-400">
                <p className="text-xl font-bold">Profuse Beauty</p>
                <p>HD Liquid Foundation</p>
                <p className="text-sm">30ml</p>
             </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-500 text-sm">
        &copy; 2026 Profuse Beauty. Proudly formulated for South African skin tones.
      </footer>
    </main>
  )
}
