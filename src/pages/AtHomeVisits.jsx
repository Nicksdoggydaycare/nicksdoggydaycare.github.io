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
      <Link
  className="brand brand-visible"
  to="/"
>
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

const serviceAreaCoordinates = [
  [30.4018169,-81.3908377],[30.403712,-81.4183035],[30.3949468,-81.4353323],
  [30.385233,-81.4430227],[30.3833376,-81.4496145],[30.3864177,-81.4638968],
  [30.3890239,-81.466918],[30.3951837,-81.4798269],[30.3949468,-81.4946585],
  [30.3932884,-81.5020742],[30.3913931,-81.5108633],[30.3906823,-81.5237722],
  [30.3890239,-81.5386038],[30.3880762,-81.552886],[30.3890239,-81.5616751],
  [30.3923407,-81.5688162],[30.3958944,-81.5770559],[30.3992111,-81.5839224],
  [30.4003955,-81.5902395],[30.4006324,-81.6036978],[30.3989742,-81.6152334],
  [30.3980266,-81.6193533],[30.396842,-81.6311636],[30.396842,-81.6383047],
  [30.3956575,-81.6514883],[30.394473,-81.6619253],[30.3921038,-81.671813],
  [30.388787,-81.6836233],[30.3861808,-81.6921377],[30.3821529,-81.7025747],
  [30.3795465,-81.7097158],[30.3748075,-81.7198782],[30.3662766,-81.7319632],
  [30.359404,-81.738555],[30.3518199,-81.747344],[30.3475536,-81.7520132],
  [30.3338052,-81.7588797],[30.3245596,-81.7632742],[30.312942,-81.7687674],
  [30.3046429,-81.7695913],[30.2913628,-81.77069],[30.2832991,-81.77069],
  [30.2749975,-81.77069],[30.2643229,-81.7660208],[30.2529355,-81.7638235],
  [30.2467667,-81.7624502],[30.2382247,-81.7619009],[30.2246984,-81.7627249],
  [30.2197145,-81.7621756],[30.2104581,-81.7608023],[30.2009634,-81.7605276],
  [30.1869572,-81.7588797],[30.174611,-81.759429],[30.1596511,-81.7597036],
  [30.1463514,-81.7605276],[30.1351878,-81.7591543],[30.1268737,-81.7487173],
  [30.1263986,-81.7382803],[30.1266362,-81.7204275],[30.1254484,-81.7066946],
  [30.1249732,-81.694335],[30.1249732,-81.6803274],[30.119034,-81.6671438],
  [30.0990757,-81.6600027],[30.0824407,-81.6583548],[30.0734091,-81.6385793],
  [30.0729337,-81.6215505],[30.0710322,-81.5968313],[30.0705568,-81.5682669],
  [30.0604544,-81.5375051],[30.0507076,-81.531188],[30.0388794,-81.5023489],
  [30.0458933,-81.4649954],[30.0499349,-81.4240713],[30.0485085,-81.3993521],
  [30.0520746,-81.3768301],[30.0575424,-81.3548575],[30.0634852,-81.3284903],
  [30.4018169,-81.3908377]
]

const faqs = [
  [
    'What happens during an at-home visit?',
    'Visits are personalized around your pet and can include feeding, fresh water, walks, playtime, medication administration, companionship, and care updates.'
  ],
  [
    'How much are at-home visits?',
    'At-home pet visits start at $35 per visit. Pricing can vary based on the care needed and the number of pets in the household.'
  ],
  [
    'Can you give my pet medication?',
    'Yes. Medication can be included when you provide clear instructions and the medication is appropriate to administer during the visit.'
  ],
  [
    'Are at-home visits only for dogs?',
    'No. At-home visits are designed for pets who are happiest staying in their own familiar environment, including cats.'
  ],
  [
    'How do I request at-home visits?',
    'Select Start Your Booking. New customers can contact Nick directly, while returning customers can continue through the app.'
  ],
]

export default function AtHomeVisits() {
  const [bookingType, setBookingType] = useState(null)
  const [galleryOpen, setGalleryOpen] = useState(false)

  useEffect(() => {
    document.title =
      "At-Home Pet Visits in Jacksonville, FL | Nick's Doggy Daycare"

    let meta = document.querySelector('meta[name="description"]')

    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }

    meta.content =
      'Personalized at-home pet visits in Jacksonville, FL with feeding, walks, playtime, medication help, companionship, and care updates while you are away.'
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
          'at-home-service-area-map'
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

        const polygon = L.polygon(serviceAreaCoordinates, {
          color: '#234033',
          weight: 3,
          fillColor: '#234033',
          fillOpacity: .18,
        }).addTo(map)

        map.fitBounds(polygon.getBounds(), {
          padding: [24, 24],
        })

        map.setZoom(map.getZoom() + 1)

        setTimeout(() => map?.invalidateSize(), 0)
      })
      .catch(() => {})

      useEffect(() => {
  document.title = "At-Home Pet Visits in Jacksonville, FL | Nick's Doggy Daycare"

  const description =
    "At-home pet visits in Jacksonville, FL for pets who are most comfortable at home, with personalized care, feeding, potty breaks, and updates."

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
  'https://www.nicksdoggydaycare.com/at-home-visits'
)
}, [])

    return () => {
      cancelled = true
      if (map) map.remove()
    }
  }, [])

  return (
    <div className="service-page at-home-page">
      <Header onBooking={setBookingType} />

      <main>
        <section
          className="service-page-hero service-page-at-home-hero"
          id="top"
        >
          <div className="service-page-hero-overlay" />

          <div className="service-page-hero-content">
            <div className="service-page-hero-headline">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .35, duration: .85 }}
              >
                Care without leaving home
              </motion.h1>
            </div>

            <motion.div
              className="service-page-hero-bottom"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .75, duration: .7 }}
            >
              <p className="eyebrow">
                At-Home Pet Visits · Jacksonville, FL
              </p>

              <button
                className="button button-primary"
                onClick={() => setBookingType('general')}
              >
                Start At-Home Visit Booking
              </button>
            </motion.div>
          </div>

          <a
            className="service-page-scroll-cue"
            href="#at-home-intro"
            aria-label="Explore at-home pet visits"
          >
            <span>Explore</span>
            <span className="hero-scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </section>

        <section
          className="compact-section"
          id="at-home-intro"
        >
          <Reveal className="service-page-two-column">
            <div>
              <p className="eyebrow dark">At-home care</p>
              <h2>Familiar surroundings. Personal attention.</h2>
            </div>

            <div className="service-page-body-copy">
              <p>
                Some pets are happiest right where they are. At-home visits
                let them stay in their familiar environment while still
                receiving thoughtful, dependable care when you cannot be
                there.
              </p>

              <p>
                Visits can be personalized around your pet&apos;s routine,
                including meals, fresh water, walks, playtime, medication,
                companionship, and updates so you can enjoy peace of mind
                while you&apos;re away.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="service-page-feature">
          <Reveal className="service-page-feature-card at-home-feature-card">
            <div className="service-page-feature-copy">
              <p className="eyebrow">Their routine, their space</p>
              <h2>Care that comes to them</h2>

              <button
                type="button"
                className="text-link booking-text-link"
                onClick={() => setBookingType('general')}
              >
                Start at-home visit booking <span>→</span>
              </button>
            </div>
          </Reveal>
        </section>

        <section className="compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">During a visit</p>
            <h2>The essentials, handled</h2>
          </Reveal>

          <div className="service-page-steps">
            <Reveal>
              <span>01</span>
              <h3>Meals &amp; water</h3>
              <p>
                Food, portions, and fresh water according to your
                instructions.
              </p>
            </Reveal>

            <Reveal delay={.05}>
              <span>02</span>
              <h3>Walks &amp; play</h3>
              <p>
                Movement, bathroom breaks, playtime, and attention based on
                your pet&apos;s needs.
              </p>
            </Reveal>

            <Reveal delay={.1}>
              <span>03</span>
              <h3>Medication</h3>
              <p>
                Clearly labeled medication can be given according to the care
                instructions you provide.
              </p>
            </Reveal>

            <Reveal delay={.15}>
              <span>04</span>
              <h3>Updates</h3>
              <p>
                A care update helps you know how your pet is doing while
                you&apos;re away.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="service-page-pricing compact-section">
          <Reveal className="service-page-pricing-grid">
            <div>
              <p className="eyebrow dark">Visit pricing</p>
              <h2>Simple care at home</h2>

              <p className="service-page-muted">
                Personalized visits start at $35 and are 30 minutes long at a
                minimum, with a limit of 3 visits per day.
              </p>
            </div>

            <div className="service-page-price-card">
              <div>
                <span className="service-page-price">$35</span>
                <span className="service-page-price-label">
                  starting / visit
                </span>
              </div>

              <div className="service-page-price-row">
                <span>First pet</span>
                <strong>$35 / visit</strong>
              </div>

              <div className="service-page-price-row">
                <span>Each additional pet</span>
                <strong>+$5 / visit</strong>
              </div>

              <p>
                Care is personalized to your household and scheduled subject
                to availability.
              </p>

              <button
                className="button button-primary"
                onClick={() => setBookingType('general')}
              >
                Start At-Home Visit Booking
              </button>
            </div>
          </Reveal>
        </section>

        <section className="at-home-prep compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Before the first visit</p>
            <h2>Help make care seamless</h2>
          </Reveal>

          <div className="boarding-essentials-grid at-home-essentials-grid">
            <Reveal>
              <span>01</span>
              <h3>Care instructions</h3>
              <p>
                Share your pet&apos;s normal routine, preferences, and
                anything Nick should know.
              </p>
            </Reveal>

            <Reveal delay={.05}>
              <span>02</span>
              <h3>Food &amp; supplies</h3>
              <p>
                Leave meals, treats, leashes, and other essentials somewhere
                easy to find.
              </p>
            </Reveal>

            <Reveal delay={.1}>
              <span>03</span>
              <h3>Medications</h3>
              <p>
                Clearly label medications and include straightforward
                administration instructions.
              </p>
            </Reveal>

            <Reveal delay={.15}>
              <span>04</span>
              <h3>Home access</h3>
              <p>
                Provide the access information needed to enter, care for your
                pet, and secure your home afterward.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="at-home-gallery compact-section">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">At-home visits</p>
            <h2>A little look at care at home</h2>
          </Reveal>

          <Reveal>
            <div className="at-home-gallery-main">
              <img
                src="/assets/images/at-home-gallery-1.jpg"
                alt="Dog enjoying time outdoors during personalized pet care"
                loading="lazy"
              />
            </div>

            <div
              className={`at-home-gallery-more ${
                galleryOpen ? 'open' : ''
              }`}
            >
              <div className="at-home-gallery-grid">
                <img
                  src="/assets/images/at-home-gallery-2.jpg"
                  alt="Dog relaxing comfortably at home"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-3.jpg"
                  alt="Dogs enjoying an outdoor walk"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-4.jpg"
                  alt="Dog relaxing in a familiar home environment"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-5.jpg"
                  alt="Dogs spending time together during at-home care"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-7.jpg"
                  alt="Dog relaxing comfortably indoors during at-home care"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-8.jpg"
                  alt="Two dogs enjoying the sunshine at home"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-9.jpg"
                  alt="Two dogs enjoying an outdoor walk near the water"
                  loading="lazy"
                />

                <img
                  src="/assets/images/at-home-gallery-10.jpg"
                  alt="Two dogs spending time together outdoors at home"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="at-home-gallery-toggle-wrap">
              <button
                type="button"
                className="at-home-gallery-toggle"
                onClick={() => setGalleryOpen((open) => !open)}
                aria-expanded={galleryOpen}
              >
                {galleryOpen ? 'Show less' : 'View more'}

                <span
                  className={galleryOpen ? 'open' : ''}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </button>
            </div>
          </Reveal>
        </section>

        <section className="service-page-area compact-section">
          <Reveal className="service-page-area-card">
            <div className="service-page-area-copy">
              <p className="eyebrow dark">Service area</p>
              <h2>At-home visits across Jacksonville</h2>

              <p className="service-page-area-note">
                Exact service eligibility and scheduling availability are
                confirmed when you book.
              </p>
            </div>

            <div
              className="service-area-map"
              aria-label="Nick's Doggy Daycare at-home visits service area map"
            >
              <div
                id="at-home-service-area-map"
                className="service-area-map-canvas"
              />
            </div>
          </Reveal>
        </section>

        <section
          className="faq-section compact-section"
          id="faq"
        >
          <Reveal className="compact-heading">
            <p className="eyebrow dark">At-home visit FAQs</p>
            <h2>Before your first visit</h2>
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

        <section
          className="final-cta final-cta-compact"
          id="contact"
        >
          <div className="final-overlay" />

          <Reveal className="final-content">
            <p className="eyebrow">Happy pets. Peace of mind.</p>
            <h2>Care, right at home.</h2>

            <button
              className="button button-primary"
              onClick={() => setBookingType('general')}
            >
              Start At-Home Visit Booking
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
          <p>Daycare · Boarding · At-Home Visits</p>
        </div>

        <div className="footer-legal">
          <p>© 2026 Nick&apos;s Doggy Daycare</p>
          <a
            className="footer-privacy-link"
            href="/privacy"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  )
}