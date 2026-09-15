import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
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
      <a className={`brand ${scrolled ? "brand-visible" : "brand-hero-hidden"}`} href="#top">
        <span className="brand-main">Nick's</span>
        <span className="brand-sub">Doggy Daycare</span>
      </a>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>

      <nav className={`site-nav ${open ? 'open' : ''}`}>
        <a href="#meadow" onClick={() => setOpen(false)}>The Meadow</a>
        <a href="#experiences" onClick={() => setOpen(false)}>Services</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
        <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        <button
          className="button button-small button-light"
          onClick={() => {
            onBooking('general')
            setOpen(false)
          }}
        >
          Start Your Booking
        </button>
      </nav>
    </header>
  )
}

function Hero({ onBooking }) {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, .25], [1, 1.06])

  return (
    <section className="hero" id="top">
      <motion.video
        className="hero-media"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/images/hero-poster.jpg"
        style={{ scale }}
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </motion.video>

      <div className="hero-fallback" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-brand-message">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .45, duration: .85 }}
          >
            Nick’s Doggy Daycare
          </motion.h1>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .68, duration: .7 }}
          >
            Happy pets. Peace of mind.
          </motion.p>
        </div>

        <div className="hero-booking-message">
          <motion.p
            className="hero-copy hero-description"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .82, duration: .7 }}
          >
            Daycare &amp; overnight boarding on over half an acre of natural grass, with complimentary pickup &amp; drop-off.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: .65 }}
          >
            <button className="button button-primary" onClick={() => onBooking('general')}>
              Start Your Booking
            </button>
          </motion.div>
        </div>
      </div>

      <a className="hero-scroll-cue" href="#meadow" aria-label="Explore the rest of the website">
        <span>Explore</span>
        <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

const galleryPhotos = [
  ['/assets/video/gallery-run-new.mp4', 'Dog enjoying an energetic outdoor run', 'Outdoor energy', 'video'],
  ['/assets/images/gallery/meadow-play.jpg', "Dog exploring the grass at Nick's Doggy Daycare", 'Room to explore'],
  ['/assets/images/gallery/friends.jpg', 'Two happy dogs spending time together', 'Good company'],
  ['/assets/images/gallery/home-comfort.jpg', 'Small dog relaxing comfortably indoors', 'Care that feels familiar'],
  ['/assets/images/gallery/meadow-rest.jpg', 'Two dogs relaxing together in the natural grass at The Meadow', 'Meadow rest'],
  ['/assets/images/meadow-running.jpg', 'Dog running through the grass at The Meadow', 'Meadow running'],
  ['/assets/images/gallery/sunlit-rest.jpg', 'Apricot Goldendoodle relaxing in the sun on warm pavers', 'Sunlit rest'],
  ['/assets/images/gallery/resting.jpg', 'Dog resting peacefully in a home environment', 'Time to recharge'],
  ['/assets/images/gallery/sibling-time.jpg', 'Two French Bulldogs relaxing together in a cozy home setting', 'Sibling time'],
  ['/assets/images/gallery/adventure.jpg', 'Dog enjoying an outdoor adventure near the beach', 'Care beyond the ordinary'],
  ['/assets/images/gallery/home-care.jpg', 'Dogs receiving comfortable home-style care', 'Home-style comfort'],
  ['/assets/images/social-preview.jpeg', "Nick's Doggy Daycare", 'Nick’s Doggy Daycare'],
  ['/assets/images/home-style-rest.jpg', 'Dog relaxing comfortably at home', 'Home-style rest'],
  ['/assets/images/at-home-visits-new.jpg', 'Three French Bulldogs during an at-home visit', 'At-home visits'],
  ['/assets/images/daycare.jpg', "Dog enjoying daycare at Nick's Doggy Daycare", 'Daycare'],
  ['/assets/images/gallery/fetch.jpg', 'Dog playing fetch outdoors', 'Play with purpose'],
]

const faqs = [
  ['Which areas do you serve?', 'Jacksonville, Ponte Vedra, Ponte Vedra Beach, Nocatee, and northern Saint Johns County.'],
  ['Is transportation included?', 'Yes. Complimentary pickup and drop-off are included, subject to availability and service-area limits.'],
  ['What should I pack for boarding?', "Your dog's regular food, instructions, medications, and any approved comfort item."],
  ['How do I request a booking?', 'Use Start Your Booking. New customers can contact us directly, while returning customers can continue in the app.'],
]


function getWeatherSymbol(code) {
  const value = String(code || '').toLowerCase()

  if (value.includes('thunder')) return '⛈'
  if (value.includes('rain') || value.includes('shower')) return '☂'
  if (value.includes('fog') || value.includes('haze')) return '◌'
  if (value.includes('cloud') || value.includes('overcast')) return '☁'
  return '☀'
}

function getMeadowWeatherMessage(shortForecast, temperature) {
  const forecast = String(shortForecast || '').toLowerCase()

  if (forecast.includes('thunder')) return 'Cozy breaks between the storms'
  if (forecast.includes('rain') || forecast.includes('shower')) return 'Fresh grass & cozy breaks'
  if (temperature >= 90) return 'Shade, water & plenty of breaks'
  if (temperature <= 55) return 'Cool air, happy paws'
  if (forecast.includes('cloud') || forecast.includes('overcast')) return 'Comfortable Meadow weather'
  return 'A beautiful day for The Meadow'
}

export default function App() {
  const [bookingType, setBookingType] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [meadowWeather, setMeadowWeather] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadMeadowWeather() {
      try {
        // General Jacksonville coordinates are intentional: the public site
        // does not expose Nick's exact property location.
        const pointResponse = await fetch(
          'https://api.weather.gov/points/30.3322,-81.6557'
        )

        if (!pointResponse.ok) throw new Error('Unable to load weather point')

        const pointData = await pointResponse.json()
        const hourlyUrl = pointData?.properties?.forecastHourly

        if (!hourlyUrl) throw new Error('Hourly forecast unavailable')

        const forecastResponse = await fetch(hourlyUrl)

        if (!forecastResponse.ok) throw new Error('Unable to load hourly weather')

        const forecastData = await forecastResponse.json()
        const current = forecastData?.properties?.periods?.[0]

        if (!current || typeof current.temperature !== 'number') {
          throw new Error('Weather data incomplete')
        }

        if (!cancelled) {
          setMeadowWeather({
            temperature: current.temperature,
            shortForecast: current.shortForecast || '',
          })
        }
      } catch (error) {
        console.error('Unable to load Meadow weather:', error)
      }
    }

    void loadMeadowWeather()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Header onBooking={setBookingType} />

      <main>
        <Hero onBooking={setBookingType} />

        <section className="meadow-compact" id="meadow">
          <Reveal className="meadow-compact-card">
            <div className="meadow-compact-copy">
              <p className="eyebrow">The Meadow</p>
              <h2>More grass<br />More freedom</h2>
              <p>
                Over half an acre of fenced natural space for running,
                resting, and being dogs.
              </p>
            </div>
            {meadowWeather && (
              <div className="meadow-weather" aria-label="Current Jacksonville weather">
                <span className="meadow-weather-icon" aria-hidden="true">
                  {getWeatherSymbol(meadowWeather.shortForecast)}
                </span>
                <span className="meadow-weather-temp">{Math.round(meadowWeather.temperature)}°</span>
                <span className="meadow-weather-divider" aria-hidden="true" />
                <span className="meadow-weather-copy">
                  <strong>{getMeadowWeatherMessage(meadowWeather.shortForecast, meadowWeather.temperature)}</strong>
                  <small>Jacksonville · Live forecast</small>
                </span>
              </div>
            )}
          </Reveal>
        </section>

        <section className="services-compact" id="experiences">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Care, your way</p>
            <h2>Three ways to book</h2>
          </Reveal>

          <div className="service-cards">
            <Reveal className="service-card service-daycare">
              <div>
                <p className="eyebrow">Daycare</p>
                <h3>Play all day<br />Come home happy</h3>
                <button className="text-link booking-text-link" onClick={() => setBookingType('daycare')}>
                  Start daycare booking <span>→</span>
                </button>
              </div>
            </Reveal>

            <Reveal className="service-card service-boarding" delay={.08}>
              <div>
                <p className="eyebrow">Overnight Boarding</p>
                <h3>A stay that feels<br />like home</h3>
                <button className="text-link booking-text-link" onClick={() => setBookingType('boarding')}>
                  Start boarding booking <span>→</span>
                </button>
              </div>
            </Reveal>

            <Reveal className="service-card service-visits" delay={.16}>
              <div>
                <p className="eyebrow">At-Home Visits</p>
                <h3>Care without<br />leaving home</h3>
                <button className="text-link booking-text-link" onClick={() => setBookingType('general')}>
                  Ask about visits <span>→</span>
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="pricing-section compact-section" id="pricing">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Prices</p>
            <h2>Simple pricing</h2>
          </Reveal>

          <div className="pricing-grid pricing-grid-compact">
            <Reveal className="pricing-card">
              <div>
                <p className="eyebrow dark">Daycare</p>
                <h3>$75 <span>/ first dog</span></h3>
              </div>
              <p>$55 second dog · $40 each additional</p>
            </Reveal>

            <Reveal className="pricing-card featured" delay={.06}>
              <div>
                <p className="eyebrow">Daycare + Overnight Boarding</p>
                <h3>$100 <span>/ first dog / night</span></h3>
              </div>
              <p>Includes a full day of daycare<br />$75 second dog · $50 each additional</p>
            </Reveal>

            <Reveal className="pricing-card" delay={.12}>
              <div>
                <p className="eyebrow dark">At-Home Pet Visits</p>
                <h3>From $35 <span>/ visit</span></h3>
              </div>
              <p>Personalized care for pets happiest at home</p>
            </Reveal>
          </div>

          <p className="pricing-note">
            Complimentary transportation is included with daycare and boarding.
            Multi-dog discounts apply to the same household. Ask about new and returning customer discounts!
          </p>
        </section>

        <section className="details-hub compact-section" id="details">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Want to know more?</p>
            <h2>The details are here when you need them</h2>
          </Reveal>

          <div className="detail-accordion">
            <details>
              <summary>
                <span>Why families choose us</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="detail-body detail-grid">
                <div><strong>Natural Space</strong><p>Real grass, fresh air, shade, and room to move freely.</p></div>
                <div><strong>Home-Style Care</strong><p>A personal, comfortable alternative to an industrial kennel.</p></div>
                <div><strong>Free Transportation</strong><p>We handle pickup and drop-off so your day keeps moving.</p></div>
                <div><strong>Peace of Mind</strong><p>Attentive supervision, dependable communication, and thoughtful care.</p></div>
              </div>
            </details>

            <details>
              <summary>
                <span>What a day at Nick's looks like</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="detail-body day-detail">
                <div><span>01</span><strong>Morning pickup</strong><p>A convenient start to the day.</p></div>
                <div><span>02</span><strong>Outdoor play</strong><p>Time to run, explore, and socialize.</p></div>
                <div><span>03</span><strong>Water & rest</strong><p>Fresh water and calm shade breaks.</p></div>
                <div><span>04</span><strong>Ride home</strong><p>Happy, exercised, and ready to relax.</p></div>
              </div>
            </details>

            <details>
              <summary>
                <span>Home-style boarding</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="detail-body detail-story">
                <img
                  src="/assets/images/home-style-rest.jpg"
                  alt="Small apricot dog resting comfortably in a home setting"
                  loading="lazy"
                />
                <div>
                  <h3>Comfort should feel familiar.</h3>
                  <p>
                    Overnight care is designed to feel personal, calm, and reassuring—not
                    like a row of kennels. Quiet indoor moments are part of the experience, too.
                  </p>
                </div>
              </div>
            </details>

            <details>
              <summary>
                <span>What makes The Meadow different</span>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="detail-body detail-story">
                <video autoPlay muted loop playsInline preload="metadata" aria-label="Two dogs running together at The Meadow">
                  <source src="/assets/video/zoomies.mp4" type="video/mp4" />
                </video>
                <div>
                  <h3>Movement, play, and room to breathe.</h3>
                  <p>
                    Open grass gives dogs space to run together, explore at their own pace,
                    and enjoy the outdoors beyond a typical daycare setting.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section className="gallery gallery-compact compact-section" id="gallery">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">Hall of fame</p>
            <h2>Your favorite faces</h2>
          </Reveal>

          <div className={`gallery-dropdown-grid ${showAllPhotos ? 'expanded' : ''}`}>
            {galleryPhotos.map(([src, alt, caption, mediaType], index) => (
              <Reveal
                className={`gallery-photo ${index >= 4 ? 'gallery-extra' : ''}`}
                delay={Math.min(index, 3) * .05}
                key={src}
              >
                {mediaType === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={alt}
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={src} alt={alt} loading="lazy" />
                )}
              </Reveal>
            ))}
          </div>

          <div className="gallery-toggle-wrap">
            <button
              className="gallery-toggle"
              type="button"
              aria-expanded={showAllPhotos}
              onClick={() => setShowAllPhotos(!showAllPhotos)}
            >
              {showAllPhotos ? 'Show fewer photos' : 'View all photos'}
              <ChevronDown className={showAllPhotos ? 'rotated' : ''} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="meet-nick-teaser compact-section">
          <div className="meet-nick-teaser-grid">
            <Reveal className="meet-nick-teaser-copy">
              <p className="eyebrow dark">Meet Nick</p>
              <h2>The person behind Nick&apos;s Doggy Daycare</h2>
              <p>
                Personal care starts with knowing who&apos;s behind it. Learn more about
                Nick&apos;s lifelong experience caring for dogs.
              </p>
              <Link className="meet-nick-link" to="/meet-nick">
                Get to know Nick <span>→</span>
              </Link>
            </Reveal>
          </div>
        </section>

        <section className="faq-section compact-section" id="faq">
          <Reveal className="compact-heading">
            <p className="eyebrow dark">FAQs</p>
            <h2>Before you book</h2>
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

        <section className="final-cta final-cta-compact" id="contact">
          <div className="final-overlay" />
          <Reveal className="final-content">
            <p className="eyebrow">Happy pets. Peace of mind.</p>
            <h2>Ready when you are</h2>
            <button className="button button-primary" onClick={() => setBookingType('general')}>
              Start Your Booking
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
          <p className="footer-brand">Nick's Doggy Daycare</p>
          <p>Happy pets. Peace of mind.</p>
        </div>
        <div>
          <p>Jacksonville & Ponte Vedra</p>
          <p>Daycare · Boarding · At-Home Visits · Transportation</p>
        </div>
        <div className="footer-legal">
          <Link className="footer-privacy-link" to="/privacy">Privacy Policy</Link>
          <p>© {new Date().getFullYear()} Nick's Doggy Daycare</p>
        </div>
      </footer>
    </>
  )
}
