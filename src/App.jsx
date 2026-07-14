import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: .8, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
)

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler(); window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
    <a className="brand" href="#top"><span className="brand-main">Nick's</span><span className="brand-sub">Doggy Daycare</span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
    <nav className={`site-nav ${open ? 'open' : ''}`}>
      {['The Meadow','Experiences','Gallery','FAQ','Contact'].map((label) => <a key={label} href={`#${label.toLowerCase().replace('the ','').replace(' ','-')}`} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="button button-small button-light" href="#contact">Book a Stay</a>
    </nav>
  </header>
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, .25], [1, 1.08])
  return <section className="hero" id="top">
    <motion.video className="hero-media" autoPlay muted loop playsInline poster="/assets/images/hero-poster.jpg" style={{ scale }}>
      <source src="/assets/video/hero.mp4" type="video/mp4" />
    </motion.video>
    <div className="hero-fallback" /><div className="hero-overlay" />
    <div className="hero-content">
      <motion.p className="eyebrow" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:1.0,duration:.8}}>Home-style dog care in Jacksonville</motion.p>
      <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:1.5,duration:1}}>Every dog deserves room to run.<br/>Every owner deserves peace of mind.</motion.h1>
      <motion.p className="hero-copy" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:2.0,duration:.8}}>Daycare and overnight boarding on natural green space, with complimentary transportation.</motion.p>
      <motion.div className="hero-actions" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:2.5,duration:.8}}>
        <a className="button button-primary" href="#contact">Book a Stay</a><a className="button button-ghost" href="#meadow">Meet The Meadow</a>
      </motion.div>
      <motion.p className="hero-signature" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.1,duration:1}}>More than daycare. A place dogs look forward to returning to.</motion.p>
    </div>
    <a className="scroll-cue" href="#forecast"><span>Discover</span><span className="scroll-line" /></a>
  </section>
}

function Forecast() {
  const [weather, setWeather] = useState({temp:'—',icon:'🌿',status:'A good day for thoughtful, supervised play.',note:'Jacksonville, Florida',activities:['Fetch','Nature time','Shade breaks','Fresh water']})
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=30.3322&longitude=-81.6557&current=temperature_2m,weather_code,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FNew_York')
      .then(r => r.json()).then(data => {
        const c = data.current, t = Math.round(c.temperature_2m), code = c.weather_code
        let icon='☀', status='A beautiful day for outdoor play.', activities=['Fetch','Nature time','Shade breaks','Fresh water']
        if ([1,2,3].includes(code)) { icon='⛅'; status='Comfortable conditions for play and exploring.' }
        if ([51,53,55,61,63,65,80,81,82].includes(code) || c.precipitation > 0) { icon='🌦'; status='Mixed weather—playtime adjusted as needed.'; activities=['Covered breaks','Indoor comfort','Fresh water','Flexible play'] }
        if ([95,96,99].includes(code)) { icon='⛈'; status='Stormy conditions—safety-first indoor care.'; activities=['Indoor play','Calm rest','Fresh water','Weather monitoring'] }
        if (t >= 90) { status='Warm weather with extra water and shade breaks.'; activities=['Morning play','Shade breaks','Fresh water','Cool-down time'] }
        setWeather({temp:`${t}°`,icon,status,note:`Jacksonville · Wind ${Math.round(c.wind_speed_10m)} mph`,activities})
      }).catch(() => {})
  }, [])
  return <section className="forecast-section" id="forecast"><Reveal className="forecast-card">
    <div><p className="eyebrow dark">Today in The Meadow</p><h2>Today's Play Forecast</h2></div>
    <div className="forecast-main"><span className="weather-icon">{weather.icon}</span><span className="forecast-temp">{weather.temp}</span><div><p className="forecast-status">{weather.status}</p><p className="forecast-note">{weather.note}</p></div></div>
    <div className="activity-list">{weather.activities.map(a => <span key={a}>{a}</span>)}</div>
  </Reveal></section>
}

const benefits = [['01','Natural Space','Real grass, fresh air, shade, and space to move freely.'],['02','Home-Style Care','A personal and comfortable alternative to an industrial kennel.'],['03','Free Transportation','We handle pickup and drop-off so your day keeps moving.'],['04','Peace of Mind','Attentive supervision, dependable communication, and thoughtful care.']]
const timeline = [['01','Morning pickup','A convenient start to the day.'],['02','Outdoor play','Time to run, explore, and socialize.'],['03','Water and rest','Fresh water and calm shade breaks.'],['04','Ride home','Happy, exercised, and ready to relax.']]
const faqs = [['Which areas do you serve?','Jacksonville and Ponte Vedra. Transportation availability may vary based on route and schedule.'],['Is transportation included?','Yes. Complimentary pickup and drop-off are included, subject to availability and service-area limits.'],['What should I pack for boarding?',"Your dog's regular food, instructions, medications, and any approved comfort item."],['How do I request a booking?','Use the inquiry button below. We will confirm availability and care requirements directly.']]

export default function App() {
  return <><Header/><main><Hero/><Forecast/>
    <section className="intro-section section-padding"><div className="section-grid"><Reveal><p className="eyebrow dark">A different kind of dog care</p><h2>A home away from home.</h2></Reveal><Reveal delay={.12}><p className="large-copy">Natural grass, open air, room to explore, and a calm home-style environment—far from the concrete and noise of an office plaza.</p></Reveal></div></section>
    <section className="feature-image-section" id="meadow"><Reveal className="image-panel meadow-panel"><div className="panel-copy"><p className="eyebrow">The Meadow</p><h2>Over half an acre of fenced green space.</h2><p>A place we've come to call The Meadow—where dogs spend their days running, exploring, resting under the trees, and simply being dogs.</p></div></Reveal></section>
    <section className="meadow-video-section section-padding"><div className="meadow-video-grid"><Reveal className="meadow-video-copy"><p className="eyebrow dark">Life in The Meadow</p><h2>Movement, play, and room to breathe.</h2><p>Open grass gives dogs space to run together, explore at their own pace, and enjoy the outdoors beyond a typical daycare setting.</p></Reveal><Reveal className="meadow-video-frame portrait-film" delay={.12}><video autoPlay muted loop playsInline poster="/assets/images/property.jpg"><source src="/assets/video/meadow-running.mp4" type="video/mp4"/></video><div className="video-caption"><span>Morning light</span><span>Room to run</span></div></Reveal></div></section>
    <section className="benefits section-padding" id="experiences"><Reveal className="section-heading"><p className="eyebrow dark">Why families choose us</p><h2>Care designed around your dog—and your life.</h2></Reveal><div className="benefit-grid">{benefits.map(([n,t,c],i)=><Reveal className="benefit-card" delay={i*.08} key={t}><span className="number">{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div></section>
    <section className="split-section"><Reveal className="split-panel split-daycare"><div><p className="eyebrow">For busy professionals</p><h2>Your day is busy enough.<br/>We'll handle the drive.</h2><p>Daycare with complimentary pickup and drop-off.</p><a href="#contact" className="text-link">Ask about daycare <span>→</span></a></div></Reveal><Reveal className="split-panel split-boarding" delay={.1}><div><p className="eyebrow">For frequent travelers</p><h2>Your dog's vacation<br/>while you're on yours.</h2><p>Comfortable overnight care in a peaceful home environment.</p><a href="#contact" className="text-link">Ask about boarding <span>→</span></a></div></Reveal></section>
    <section className="home-style-story section-padding"><div className="home-style-grid"><div className="home-style-visuals"><Reveal className="home-style-image"><img src="/assets/images/home-style-rest.jpg" alt="Small apricot dog resting comfortably in a home setting" loading="lazy"/></Reveal><Reveal className="quiet-film" delay={.1}><video autoPlay muted loop playsInline><source src="/assets/video/quiet-tail.mp4" type="video/mp4"/></video><span>Comfort in the little moments</span></Reveal></div><Reveal className="home-style-copy" delay={.12}><p className="eyebrow dark">Home-style boarding</p><h2>Comfort should feel familiar.</h2><p>Overnight care is designed to feel personal, calm, and reassuring—not like a row of kennels. Quiet indoor moments are part of the experience, too.</p></Reveal></div></section>
    <section className="day-section section-padding"><Reveal className="section-heading"><p className="eyebrow dark">A day at Nick's</p><h2>A day well spent.</h2></Reveal><Reveal className="day-film portrait-day-film"><video autoPlay muted loop playsInline poster="/assets/images/daycare.jpg"><source src="/assets/video/day-outdoor.mp4" type="video/mp4"/></video><div className="day-film-overlay"><p className="eyebrow">Outdoor time</p><h3>Play, pause, explore, repeat.</h3></div></Reveal><div className="timeline">{timeline.map(([n,t,c],i)=><Reveal className="timeline-item" delay={i*.08} key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></Reveal>)}</div></section>
    <section className="gallery section-padding" id="gallery"><Reveal className="section-heading"><p className="eyebrow dark">Life at Nick's</p><h2>Real dogs. Real care. Room to simply be themselves.</h2></Reveal><div className="gallery-grid gallery-editorial">
      <Reveal className="gallery-photo gallery-large"><img src="/assets/images/gallery/sunlit-rest.jpg" alt="Apricot Goldendoodle relaxing in the sun on warm pavers" loading="lazy"/><span>Sunlit rest</span></Reveal>
      <Reveal className="gallery-photo gallery-wide" delay={.06}><img src="/assets/images/gallery/meadow-play.jpg" alt="Dog exploring the grass at Nick's Doggy Daycare" loading="lazy"/><span>Room to explore</span></Reveal>
      <Reveal className="gallery-photo" delay={.1}><img src="/assets/images/gallery/home-care.jpg" alt="Dogs receiving comfortable home-style care" loading="lazy"/><span>Home-style comfort</span></Reveal>
      <Reveal className="gallery-photo" delay={.14}><img src="/assets/images/gallery/home-comfort.jpg" alt="Small dog relaxing comfortably indoors" loading="lazy"/><span>Care that feels familiar</span></Reveal>
      <Reveal className="gallery-photo gallery-wide" delay={.08}><img src="/assets/images/gallery/friends.jpg" alt="Two happy dogs spending time together" loading="lazy"/><span>Good company</span></Reveal>
      <Reveal className="gallery-photo" delay={.12}><img src="/assets/images/gallery/resting.jpg" alt="Dog resting peacefully in a home environment" loading="lazy"/><span>Time to recharge</span></Reveal>
      <Reveal className="gallery-photo" delay={.16}><img src="/assets/images/gallery/adventure.jpg" alt="Dog enjoying an outdoor adventure near the beach" loading="lazy"/><span>Care beyond the ordinary</span></Reveal>
      <Reveal className="gallery-photo gallery-wide" delay={.18}><img src="/assets/images/gallery/fetch.jpg" alt="Dog playing fetch outdoors" loading="lazy"/><span>Play with purpose</span></Reveal>
</div></section>
    <section className="pricing-section section-padding"><Reveal className="section-heading"><p className="eyebrow dark">Simple pricing</p><h2>Clear care. No surprises.</h2></Reveal><div className="pricing-grid"><Reveal className="pricing-card"><p className="eyebrow dark">Daycare</p><h3>$75 <span>/ first dog</span></h3><p>$55 second dog · $40 each additional dog</p></Reveal><Reveal className="pricing-card featured"><p className="eyebrow">Overnight boarding</p><h3>$100 <span>/ first dog</span></h3><p>$75 second dog · $50 each additional dog</p></Reveal><Reveal className="pricing-card"><p className="eyebrow dark">Baths</p><h3>From $30</h3><p>Free bath with five consecutive boarding days.</p></Reveal></div><p className="pricing-note">Multi-dog discounts apply to dogs from the same household.</p></section>
    <section className="faq-section section-padding" id="faq"><Reveal className="section-heading"><p className="eyebrow dark">Frequently asked questions</p><h2>Everything you need to feel prepared.</h2></Reveal><div className="faq-list">{faqs.map(([q,a])=><Reveal key={q}><details><summary>{q}</summary><p>{a}</p></details></Reveal>)}</div></section>
    <section className="final-cta" id="contact"><div className="final-overlay"/><Reveal className="final-content"><p className="eyebrow">Ready when you are</p><h2>Give your dog a place they'll love coming back to.</h2><p>Tell us what you need and we will follow up with availability.</p><a className="button button-primary" href="mailto:hello@nicksdoggydaycare.com">Request a Stay</a><p className="placeholder-note">Replace this email before launch.</p></Reveal></section>
  </main><footer className="footer"><div><p className="footer-brand">Nick's Doggy Daycare</p><p>Happy pets. Peace of mind.</p></div><div><p>Jacksonville & Ponte Vedra</p><p>Daycare · Boarding · Baths · Transportation</p></div><p>© {new Date().getFullYear()} Nick's Doggy Daycare</p></footer></>
}
