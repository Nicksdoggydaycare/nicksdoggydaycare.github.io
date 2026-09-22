import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import BookingModal from '../components/BookingModal'

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.14 }}
    transition={{ duration: .7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

function Header({ onBooking }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <Link className="brand brand-visible" to="/">
        <span className="brand-main">Nick's</span>
        <span className="brand-sub">Doggy Daycare</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={`site-nav ${open ? 'open' : ''}`}>
  <div className="nav-services">
    <button
      type="button"
      className="nav-services-label"
    >
      Services
    </button>

    <div className="nav-services-menu">
      <Link to="/daycare" onClick={() => setOpen(false)}>
        Daycare
      </Link>

      <Link to="/boarding" onClick={() => setOpen(false)}>
        Boarding
      </Link>

      <Link to="/at-home-visits" onClick={() => setOpen(false)}>
        At-Home Visits
      </Link>
    </div>
  </div>

  <Link to="/#pricing" onClick={() => setOpen(false)}>
    Pricing
  </Link>

  <Link to="/#gallery" onClick={() => setOpen(false)}>
    Gallery
  </Link>

  <Link to="/#faq" onClick={() => setOpen(false)}>
    FAQ
  </Link>

  <button
    className="button button-small button-light"
    onClick={() => {
      onBooking('daycare')
      setOpen(false)
    }}
  >
    Start Your Booking
  </button>
</nav>
    </header>
  )
}

const SERVICE_AREA_COORDINATES = [
  [30.4018169, -81.3908377],
  [30.403712, -81.4183035],
  [30.3949468, -81.4353323],
  [30.385233, -81.4430227],
  [30.3833376, -81.4496145],
  [30.3864177, -81.4638968],
  [30.3890239, -81.466918],
  [30.3951837, -81.4798269],
  [30.3949468, -81.4946585],
  [30.3932884, -81.5020742],
  [30.3913931, -81.5108633],
  [30.3906823, -81.5237722],
  [30.3890239, -81.5386038],
  [30.3880762, -81.552886],
  [30.3890239, -81.5616751],
  [30.3923407, -81.5688162],
  [30.3958944, -81.5770559],
  [30.3992111, -81.5839224],
  [30.4003955, -81.5902395],
  [30.4006324, -81.6036978],
  [30.3989742, -81.6152334],
  [30.3980266, -81.6193533],
  [30.396842, -81.6311636],
  [30.396842, -81.6383047],
  [30.3956575, -81.6514883],
  [30.394473, -81.6619253],
  [30.3921038, -81.671813],
  [30.388787, -81.6836233],
  [30.3861808, -81.6921377],
  [30.3821529, -81.7025747],
  [30.3795465, -81.7097158],
  [30.3748075, -81.7198782],
  [30.3662766, -81.7319632],
  [30.359404, -81.738555],
  [30.3518199, -81.747344],
  [30.3475536, -81.7520132],
  [30.3338052, -81.7588797],
  [30.3245596, -81.7632742],
  [30.312942, -81.7687674],
  [30.3046429, -81.7695913],
  [30.2913628, -81.77069],
  [30.2832991, -81.77069],
  [30.2749975, -81.77069],
  [30.2643229, -81.7660208],
  [30.2529355, -81.7638235],
  [30.2467667, -81.7624502],
  [30.2382247, -81.7619009],
  [30.2246984, -81.7627249],
  [30.2197145, -81.7621756],
  [30.2104581, -81.7608023],
  [30.2009634, -81.7605276],
  [30.1869572, -81.7588797],
  [30.174611, -81.759429],
  [30.1596511, -81.7597036],
  [30.1463514, -81.7605276],
  [30.1351878, -81.7591543],
  [30.1268737, -81.7487173],
  [30.1263986, -81.7382803],
  [30.1266362, -81.7204275],
  [30.1254484, -81.7066946],
  [30.1249732, -81.694335],
  [30.1249732, -81.6803274],
  [30.119034, -81.6671438],
  [30.0990757, -81.6600027],
  [30.0824407, -81.6583548],
  [30.0734091, -81.6385793],
  [30.0729337, -81.6215505],
  [30.0710322, -81.5968313],
  [30.0705568, -81.5682669],
  [30.0604544, -81.5375051],
  [30.0507076, -81.531188],
  [30.0388794, -81.5023489],
  [30.0458933, -81.4649954],
  [30.0499349, -81.4240713],
  [30.0485085, -81.3993521],
  [30.0520746, -81.3768301],
  [30.0575424, -81.3548575],
  [30.0634852, -81.3284903],
  [30.4018169, -81.3908377],
]

function ServiceAreaMap() {
  const mapElementRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const loadStylesheet = () => {
      if (document.querySelector('link[data-leaflet-styles]')) return

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.crossOrigin = ''
      link.dataset.leafletStyles = 'true'
      document.head.appendChild(link)
    }

    const loadLeaflet = () =>
      new Promise((resolve, reject) => {
        if (window.L) {
          resolve(window.L)
          return
        }

        const existing = document.querySelector('script[data-leaflet-script]')

        if (existing) {
          existing.addEventListener('load', () => resolve(window.L), { once: true })
          existing.addEventListener('error', reject, { once: true })
          return
        }

        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.crossOrigin = ''
        script.dataset.leafletScript = 'true'
        script.onload = () => resolve(window.L)
        script.onerror = reject
        document.body.appendChild(script)
      })

    const initializeMap = async () => {
      try {
        loadStylesheet()
        const L = await loadLeaflet()

        if (cancelled || !mapElementRef.current || mapInstanceRef.current) return

        const map = L.map(mapElementRef.current, {
          zoomControl: true,
          attributionControl: true,
          scrollWheelZoom: false,
          doubleClickZoom: true,
          dragging: true,
          touchZoom: true,
          boxZoom: false,
          keyboard: true,
        })

        L.tileLayer(
          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          }
        ).addTo(map)

        const polygon = L.polygon(SERVICE_AREA_COORDINATES, {
          color: '#234033',
          weight: 3,
          opacity: 0.92,
          fillColor: '#5f806f',
          fillOpacity: 0.24,
          lineJoin: 'round',
        }).addTo(map)

        map.fitBounds(polygon.getBounds(), {
          padding: [8, 8],
          animate: false,
        })

        mapInstanceRef.current = map

        window.setTimeout(() => {
          if (!cancelled) map.invalidateSize()
        }, 100)
      } catch (error) {
        console.error('Unable to load service-area map:', error)
      }
    }

    initializeMap()

    return () => {
      cancelled = true

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mapElementRef}
      className="service-area-map-canvas"
      aria-label="Interactive map showing Nick's Doggy Daycare service area"
    />
  )
}

export default function Daycare() {
  const [bookingType, setBookingType] = useState(null)

  useEffect(() => {
    const previousTitle = document.title
    let meta = document.querySelector('meta[name="description"]')
    const metaWasCreated = !meta
    const previousDescription = meta?.getAttribute('content') || ''

    document.title = "Dog Daycare in Jacksonville, FL | Nick's Doggy Daycare"

    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }

    meta.setAttribute(
      'content',
      "Home-style dog daycare in Jacksonville, FL with over half an acre of fenced natural grass, attentive care, and complimentary pickup and drop-off."
    )

    window.scrollTo(0, 0)

    useEffect(() => {
  document.title = "Dog Daycare in Jacksonville, FL | Nick's Doggy Daycare"

  const description =
    "Dog daycare in Jacksonville, FL with over half an acre of fenced natural grass, home-style care, and complimentary pickup and drop-off."

  let meta = document.querySelector('meta[name="description"]')

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', description)
  let canonical = document.querySelector('link[rel="canonical"]')

if (!canonical) {
  canonical = document.createElement('link')
  canonical.setAttribute('rel', 'canonical')
  document.head.appendChild(canonical)
}

canonical.setAttribute(
  'href',
  'https://www.nicksdoggydaycare.com/daycare'
)
}, [])

    return () => {
      document.title = previousTitle

      if (metaWasCreated) {
        meta?.remove()
      } else {
        meta?.setAttribute('content', previousDescription)
      }
    }
  }, [])

  const faqs = [
    [
      'Does my dog need to meet you before daycare?',
      'No, but Nick can meet you and your dog at your home anywhere within our service area, or arrive a little earlier for pickup on their first day. It’s a chance for your dog to get comfortable with Nick while you walk through their routine, personality, preferences, care instructions, and anything else that will help make their first day feel familiar.',
    ],
    [
      'Is pickup and drop-off included?',
      'Yes. Complimentary pickup and drop-off are included with daycare. Pickup is typically between 8–10 AM, with drop-off between 4–6 PM. These windows allow Nick to plan an efficient route between each home while giving every dog plenty of time to enjoy their day at The Meadow.',
    ],
    [
      'Where do the dogs spend their day?',
      'Dogs enjoy home-style care and access to The Meadow, our fenced natural outdoor space with over half an acre for running, exploring, resting, and play.',
    ],
    [
      'What should I send with my dog?',
      'You’re welcome to send anything your dog may need or enjoy during daycare, including toys, a leash or harness, treats, food, or other familiar items that help them feel comfortable.',
    ],
    [
      'How do I request daycare?',
      'Select Start Your Booking. New customers can contact Nick directly, while returning customers can continue through the app.',
    ],
  ]

  return (
    <>
      <Header onBooking={setBookingType} />

      <main className="service-page">
        <section className="service-page-hero service-page-daycare-hero">
          <video
            className="service-page-hero-media"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Dog enjoying outdoor daycare at The Meadow"
          >
            <source src="/assets/video/meadow-play-new.mp4" type="video/mp4" />
          </video>

          <div className="service-page-hero-overlay" />

          <Reveal className="service-page-hero-content">
            <div className="service-page-hero-headline">
              <h1>Daycare with room to run</h1>
            </div>

            <div className="service-page-hero-bottom">
              <p className="eyebrow">Doggy Daycare · Jacksonville, FL</p>

              <button
                className="button button-primary"
                onClick={() => setBookingType('daycare')}
              >
                Start Daycare Booking
              </button>
            </div>
          </Reveal>

          <a
            className="service-page-scroll-cue"
            href="#daycare-intro"
            aria-label="Explore the daycare page"
          >
            <span>Explore</span>
            <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
          </a>
        </section>

        <section
          className="service-page-intro compact-section"
          id="daycare-intro"
        >
          <div className="service-page-two-column">
            <Reveal>
              <p className="eyebrow dark">Daycare at Nick&apos;s</p>
              <h2>A different kind of dog daycare</h2>
            </Reveal>

            <Reveal delay={.08} className="service-page-body-copy">
              <p>
                Nick&apos;s Doggy Daycare gives dogs space to move, play,
                explore, and recharge in a comfortable home-style environment.
                Instead of spending the day in an office-plaza setting, dogs
                can enjoy real grass, fresh air, shade, and room to be dogs.
              </p>

              <p>
                The experience is designed for busy families who want
                dependable care without adding another drive to the day.
                Complimentary pickup and drop-off are included with daycare,
                subject to availability and service-area limits.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="service-page-feature">
          <Reveal className="service-page-feature-card">
            <div className="service-page-feature-copy">
              <p className="eyebrow">The Meadow</p>
              <h2>Over half an acre of natural grass</h2>

              <p>
                A fenced outdoor space for running, exploring, socializing,
                resting, and enjoying the kind of freedom dogs love.
              </p>

              <button
                type="button"
                className="text-link booking-text-link"
                onClick={() => setBookingType('daycare')}
              >
                Start daycare booking <span>→</span>
              </button>
            </div>
          </Reveal>
        </section>

        <section className="service-page-day compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">A day at Nick&apos;s</p>
            <h2>Play, rest, repeat</h2>
          </Reveal>

          <div className="service-page-steps">
            <Reveal>
              <span>01</span>
              <h3>Morning pickup</h3>
              <p>
                Complimentary pickup between 8–10 AM makes the start of the
                day simple.
              </p>
            </Reveal>

            <Reveal delay={.05}>
              <span>02</span>
              <h3>Outdoor time</h3>
              <p>Room to run, explore, play, and enjoy The Meadow.</p>
            </Reveal>

            <Reveal delay={.1}>
              <span>03</span>
              <h3>Water &amp; rest</h3>
              <p>Fresh water and calmer breaks are part of the day, too.</p>
            </Reveal>

            <Reveal delay={.15}>
              <span>04</span>
              <h3>Ride home</h3>
              <p>
                Complimentary drop-off between 4–6 PM brings your dog home
                happy and exercised.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="service-page-pricing compact-section">
          <div className="service-page-pricing-grid">
            <Reveal>
              <p className="eyebrow dark">Daycare pricing</p>
              <h2>Simple pricing</h2>

              <p className="service-page-muted">
                Multi-dog discounts apply to dogs from the same household.
                Ask about new and returning customer discounts.
              </p>
            </Reveal>

            <Reveal className="service-page-price-card" delay={.08}>
              <div>
                <span className="service-page-price">$75</span>
                <span className="service-page-price-label">first dog</span>
              </div>

              <div className="service-page-price-row">
                <span>Second dog</span>
                <strong>$55</strong>
              </div>

              <div className="service-page-price-row">
                <span>Each additional dog</span>
                <strong>$40</strong>
              </div>

              <p>
                Complimentary pickup and drop-off included, subject to
                availability and service-area limits.
              </p>

              <button
                className="button button-primary"
                onClick={() => setBookingType('daycare')}
              >
                Start Daycare Booking
              </button>
            </Reveal>
          </div>
        </section>

        <section className="service-page-area compact-section">
          <Reveal className="service-page-area-card">
            <div className="service-page-area-copy">
              <p className="eyebrow dark">Service area</p>
              <h2>
                Dog daycare for Jacksonville &amp; surrounding communities
              </h2>

              <p>
              </p>

              <p className="service-page-area-note">
                Complimentary pickup and drop-off are available within our
                service area, subject to availability. Exact service
                eligibility is confirmed when you book.
              </p>
            </div>

            <div className="service-area-map">
              <ServiceAreaMap />
            </div>

            <p
              style={{
                margin: '14px 4px 0',
                color: 'rgba(38, 38, 38, 0.62)',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                textAlign: 'center',
              }}
            >
              The outlined area represents our complimentary pickup and
              drop-off service area.
            </p>
          </Reveal>
        </section>

        <section className="faq-section compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Daycare FAQs</p>
            <h2>Before their first day</h2>
          </Reveal>

          <div className="faq-list faq-list-compact">
            {faqs.map(([q, a]) => (
              <Reveal key={q}>
                <details>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="final-cta final-cta-compact">
          <div className="final-overlay" />

          <Reveal className="final-content">
            <p className="eyebrow">Happy pets. Peace of mind.</p>
            <h2>Ready for their first day?</h2>

            <p className="final-cta-copy">
              Tell Nick a little about your dog and the days you need care.
              We&apos;ll take it from there.
            </p>

            <button
              className="button button-primary"
              onClick={() => setBookingType('daycare')}
            >
              Start Daycare Booking
            </button>
          </Reveal>
        </section>
      </main>

      {bookingType && (
        <BookingModal
          bookingType={bookingType}
          onClose={() => setBookingType(null)}
        />
      )}

      <footer className="footer footer-compact">
        <div>
          <p className="footer-brand">Nick&apos;s Doggy Daycare</p>
          <p>Happy pets. Peace of mind.</p>
        </div>

        <div>
          <p>Jacksonville &amp; Ponte Vedra</p>
          <p>Daycare · Boarding · At-Home Visits · Transportation</p>
        </div>

        <div className="footer-legal">
          <Link className="footer-privacy-link" to="/privacy">
            Privacy Policy
          </Link>
          <p>© {new Date().getFullYear()} Nick&apos;s Doggy Daycare</p>
        </div>
      </footer>
    </>
  )
}