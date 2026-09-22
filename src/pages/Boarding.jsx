import { useEffect, useState } from 'react'
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

export default function Boarding() {
  const [bookingType, setBookingType] = useState(null)
  const [boardingGalleryOpen, setBoardingGalleryOpen] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    let meta = document.querySelector('meta[name="description"]')
    const metaWasCreated = !meta
    const previousDescription = meta?.getAttribute('content') || ''

    document.title = "Dog Boarding in Jacksonville, FL | Nick's Doggy Daycare"

    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }

    meta.setAttribute(
      'content',
      "Home-style overnight dog boarding in Jacksonville, FL with a full day of daycare included, natural outdoor space, attentive care, and complimentary transportation."
    )

    window.scrollTo(0, 0)

    return () => {
      document.title = previousTitle

      if (metaWasCreated) {
        meta?.remove()
      } else {
        meta?.setAttribute('content', previousDescription)
      }
    }
  }, [])

  useEffect(() => {
    let map
    let cancelled = false

    const loadLeaflet = () =>
      new Promise((resolve, reject) => {
        if (window.L) {
          resolve(window.L)
          return
        }

        if (!document.querySelector('link[data-leaflet-css]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          link.dataset.leafletCss = 'true'
          document.head.appendChild(link)
        }

        const existing = document.querySelector('script[data-leaflet-js]')

        if (existing) {
          existing.addEventListener(
            'load',
            () => resolve(window.L),
            { once: true }
          )
          existing.addEventListener('error', reject, { once: true })
          return
        }

        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.dataset.leafletJs = 'true'
        script.onload = () => resolve(window.L)
        script.onerror = reject
        document.body.appendChild(script)
      })

    loadLeaflet()
      .then((L) => {
        if (cancelled || !L) return

        const container = document.getElementById(
          'boarding-service-area-map'
        )

        if (!container || container._leaflet_id) return

        map = L.map(container, {
          scrollWheelZoom: false,
          zoomControl: true,
          attributionControl: true,
        })

        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
          }
        ).addTo(map)

        const serviceArea = [
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

        const polygon = L.polygon(serviceArea, {
          color: '#234033',
          weight: 3,
          opacity: 1,
          fillColor: '#234033',
          fillOpacity: 0.18,
        }).addTo(map)

        map.fitBounds(polygon.getBounds(), {
          padding: [24, 24],
        })

        map.setZoom(map.getZoom() + 1)

        setTimeout(() => map?.invalidateSize(), 0)
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (map) map.remove()
    }
  }, [])

  const faqs = [
    [
      'How much is overnight boarding?',
      'Boarding is $100 per night for the first dog, $75 per night for the second dog, and $50 per night for each additional dog from the same household.',
    ],
    [
      'Does boarding include daycare?',
      'Yes. Every boarding night includes a full day of daycare, so your dog can enjoy play, outdoor time, rest, and The Meadow as part of their stay.',
    ],
    [
      'Where will my dog sleep?',
      'Because boarding is always kept to a small group, dogs will sleep freely in the home rather than being crated. Most choose to curl up on the couch or their beds, while some prefer to sleep next to Nick. The goal is to let each dog settle in wherever they feel most comfortable.',
    ],
    [
      'Is pickup and drop-off included?',
      'Yes. Complimentary pickup and return are included with boarding, subject to availability and service-area limits.',
    ],
    [
      'How do I request a boarding stay?',
      'Select Start Your Booking. New customers can contact Nick directly, while returning customers can continue through the app.',
    ],
  ]

  return (
    <>
      <Header onBooking={setBookingType} />

      <main className="service-page boarding-page">
        <section className="service-page-hero service-page-boarding-hero">
          <div className="service-page-hero-overlay" />

          <Reveal className="service-page-hero-content">
            <div className="service-page-hero-headline">
              <h1>A home away from home</h1>
            </div>

            <div className="service-page-hero-bottom">
              <p className="eyebrow">
                Overnight Boarding · Jacksonville, FL
              </p>

              <button
                className="button button-primary"
                onClick={() => setBookingType('boarding')}
              >
                Start Boarding Booking
              </button>
            </div>
          </Reveal>

          <a
            className="service-page-scroll-cue"
            href="#boarding-intro"
            aria-label="Explore the boarding page"
          >
            <span>Explore</span>
            <span className="hero-scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </section>

        <section
          className="service-page-intro compact-section"
          id="boarding-intro"
        >
          <div className="service-page-two-column">
            <Reveal>
              <p className="eyebrow dark">Boarding at Nick&apos;s</p>
              <h2>Comfortable care while you&apos;re away</h2>
            </Reveal>

            <Reveal delay={.08} className="service-page-body-copy">
              <p>
                Overnight boarding at Nick&apos;s is designed to feel
                personal, familiar, and comfortable. Your dog stays in a
                home-style environment rather than spending their trip in a
                traditional kennel or commercial boarding facility.
              </p>

              <p>
                Every boarding stay includes a full day of daycare, giving
                your dog time to run, explore, play, rest, and enjoy The
                Meadow before settling in for the night. Complimentary pickup
                and return help make travel days easier, too.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="service-page-feature">
          <Reveal className="service-page-feature-card boarding-feature-card">
            <div className="service-page-feature-copy">
              <p className="eyebrow">Daycare included</p>
              <h2>Boarding includes daycare at Nick&apos;s</h2>

              <button
                type="button"
                className="text-link booking-text-link"
                onClick={() => setBookingType('boarding')}
              >
                Start boarding booking <span>→</span>
              </button>
            </div>
          </Reveal>
        </section>

        <section className="service-page-day compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">A boarding stay</p>
            <h2>From playtime to bedtime</h2>
          </Reveal>

          <div className="service-page-steps">
            <Reveal>
              <span>01</span>
              <h3>Arrive &amp; settle in</h3>
              <p>
                A comfortable start with time to settle in and get ready for
                the day.
              </p>
            </Reveal>

            <Reveal delay={.05}>
              <span>02</span>
              <h3>Full day of daycare</h3>
              <p>
                Outdoor time, play, exploration, water, and rest are all
                included.
              </p>
            </Reveal>

            <Reveal delay={.1}>
              <span>03</span>
              <h3>Wind down at home</h3>
              <p>
                After a full day, your dog settles into a relaxed home
                environment for the evening.
              </p>
            </Reveal>

            <Reveal delay={.15}>
              <span>04</span>
              <h3>Stay the night</h3>
              <p>
                A comfortable overnight stay with attentive, home-style care
                until morning.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="service-page-pricing compact-section">
          <div className="service-page-pricing-grid">
            <Reveal>
              <p className="eyebrow dark">Boarding pricing</p>
              <h2>Simple nightly pricing</h2>

              <p className="service-page-muted">
                Every boarding night includes a full day of daycare.
                Multi-dog discounts apply to dogs from the same household.
              </p>
            </Reveal>

            <Reveal className="service-page-price-card" delay={.08}>
              <div>
                <span className="service-page-price">$100</span>
                <span className="service-page-price-label">
                  first dog / night
                </span>
              </div>

              <div className="service-page-price-row">
                <span>Second dog / night</span>
                <strong>$75</strong>
              </div>

              <div className="service-page-price-row">
                <span>Each additional dog / night</span>
                <strong>$50</strong>
              </div>

              <p>
                Full-day daycare plus complimentary pickup and return
                included, subject to availability and service-area limits.
              </p>

              <button
                className="button button-primary"
                onClick={() => setBookingType('boarding')}
              >
                Start Boarding Booking
              </button>
            </Reveal>
          </div>
        </section>

        <section className="boarding-essentials compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">For their stay</p>
            <h2>Pack the familiar things</h2>
          </Reveal>

          <div className="boarding-essentials-grid">
            <Reveal>
              <span>01</span>
              <h3>Regular food</h3>
              <p>
                Keeping their normal diet helps maintain a familiar routine.
              </p>
            </Reveal>

            <Reveal delay={.05}>
              <span>02</span>
              <h3>Feeding instructions</h3>
              <p>
                Send the portions and schedule your dog is accustomed to at
                home.
              </p>
            </Reveal>

            <Reveal delay={.1}>
              <span>03</span>
              <h3>Medications</h3>
              <p>
                Include clearly labeled medications and care instructions
                when needed.
              </p>
            </Reveal>

            <Reveal delay={.15}>
              <span>04</span>
              <h3>Comfort item</h3>
              <p>
                An approved familiar item can help your dog settle in for
                their stay.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="boarding-gallery compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Boarding at Nick&apos;s</p>
            <h2>A little look at life here</h2>
          </Reveal>

          <Reveal className="boarding-gallery-main">
            <img
              src="/assets/images/boarding/gallery-main.jpg"
              alt="Two dogs relaxing together on the couch during boarding at Nick's"
            />
          </Reveal>

          <div
            className={`boarding-gallery-more ${
              boardingGalleryOpen ? 'open' : ''
            }`}
          >
            <div className="boarding-gallery-grid">
              <img
                src="/assets/images/boarding/gallery-window.jpg"
                alt="Two dogs spending time together by the windows during boarding"
                loading="lazy"
              />

              <img
                src="/assets/images/boarding/gallery-rug.jpg"
                alt="Two dogs relaxing together indoors during boarding"
                loading="lazy"
              />

              <img
                src="/assets/images/boarding/gallery-sleep.jpg"
                alt="Dogs sleeping comfortably on the couches during boarding"
                loading="lazy"
              />

              <img
                src="/assets/images/boarding/gallery-group.jpg"
                alt="Small group of dogs spending time together indoors at Nick's"
                loading="lazy"
              />
            </div>
          </div>

          <div className="boarding-gallery-toggle-wrap">
            <button
              type="button"
              className="boarding-gallery-toggle"
              aria-expanded={boardingGalleryOpen}
              onClick={() =>
                setBoardingGalleryOpen((open) => !open)
              }
            >
              {boardingGalleryOpen
                ? 'Show less'
                : 'View more boarding photos'}

              <span aria-hidden="true">
                {boardingGalleryOpen ? '↑' : '↓'}
              </span>
            </button>
          </div>
        </section>

        <section className="service-page-area compact-section">
          <Reveal className="service-page-area-card">
            <div className="service-page-area-copy">
              <p className="eyebrow dark">Service area</p>

              <h2>
                Boarding for Jacksonville &amp; surrounding communities
              </h2>

              <p className="service-page-area-note">
                Complimentary pickup and return are available within our
                service area, subject to availability. Exact service
                eligibility is confirmed when you book.
              </p>
            </div>

            <div
              className="service-area-map"
              aria-label="Nick's Doggy Daycare service area map"
            >
              <div
                id="boarding-service-area-map"
                className="service-area-map-canvas"
              />
            </div>
          </Reveal>
        </section>

        <section className="faq-section compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Boarding FAQs</p>
            <h2>Before their stay</h2>
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
            <h2>Ready for their stay?</h2>

            <button
              className="button button-primary"
              onClick={() => setBookingType('boarding')}
            >
              Start Boarding Booking
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
          <p className="footer-brand">
            Nick&apos;s Doggy Daycare
          </p>
          <p>Happy pets. Peace of mind.</p>
        </div>

        <div>
          <p>Jacksonville &amp; Ponte Vedra</p>
          <p>
            Daycare · Boarding · At-Home Visits · Transportation
          </p>
        </div>

        <div className="footer-legal">
          <Link
            className="footer-privacy-link"
            to="/privacy"
          >
            Privacy Policy
          </Link>

          <p>
            © {new Date().getFullYear()} Nick&apos;s Doggy Daycare
          </p>
        </div>
      </footer>
    </>
  )
}