import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import './MeetNick.css'
import BookingModal from '../components/BookingModal'

export default function MeetNick() {
    const [bookingOpen, setBookingOpen] = useState(false)
      const heroRef = useRef(null)

      useEffect(() => {
  const previousTitle = document.title
  const previousDescription = document
    .querySelector('meta[name="description"]')
    ?.getAttribute('content')

  document.title = "Meet Nick | Nick's Doggy Daycare"

  const description =
    document.querySelector('meta[name="description"]')

  if (description) {
    description.setAttribute(
      'content',
      "Meet Nick, the person behind Nick's Doggy Daycare, and learn about his 16+ years of experience caring for dogs of all sizes, personalities, and energy levels."
    )
  }

  return () => {
    document.title = previousTitle

    if (description && previousDescription) {
      description.setAttribute(
        'content',
        previousDescription
      )
    }
  }
}, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.88]
  )

  const heroRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ['0px', '28px']
  )

  const heroOverlay = useTransform(
    scrollYProgress,
    [0, 1],
    [0.56, 0.28]
  )

  const heroTextY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -35]
  )
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [])

  return (
    <main className="meet-nick-page meet-nick-page-enter">
      <section className="meet-nick-hero-stage" ref={heroRef}>
  <motion.div
    className="meet-nick-hero"
    style={{
      scale: heroScale,
      borderRadius: heroRadius,
    }}
  >
    <img
      className="meet-nick-hero-image"
      src="/assets/images/meet-nick-current.jpg"
      alt="Nick spending time with a dog"
    />

    <motion.div
      className="meet-nick-hero-overlay"
      style={{ opacity: heroOverlay }}
    />

    <Link className="meet-nick-back" to="/">
      ← Back to home
    </Link>

    <motion.div
      className="meet-nick-hero-copy"
      style={{ y: heroTextY }}
    >
      <p className="eyebrow">Meet Nick</p>

      <h1>
        Personal care starts with knowing who&apos;s behind it.
      </h1>
    </motion.div>
  </motion.div>
</section>

      <section className="meet-nick-story section-padding">
        <div className="meet-nick-layout">
          

          <article className="meet-nick-copy">
            <p className="eyebrow dark">Hi, I’m Nick.</p>

            <p>
              For as long as I can remember, dogs have been a part of my life.
              Long before Nick&apos;s Doggy Daycare existed, I was the person
              friends, neighbors, and family members called whenever they needed
              someone to care for their pets. Before I was even old enough to
              drive, I&apos;d ride my bike or walk to nearby homes to feed dogs,
              keep them company, and make sure they felt cared for while their
              families were away.
            </p>

            <p>
              Today, after more than 16 years of caring for dogs of all sizes,
              personalities, and energy levels, that passion has grown into
              Nick&apos;s Doggy Daycare.
            </p>

            <p>
              I created this business because I wanted to offer something
              different from the traditional daycare or boarding experience.
              Instead of spending the day surrounded by concrete, fences, and
              rows of kennels, dogs here have room to run in a natural
              environment, explore, play, and simply enjoy being dogs—all while
              receiving the personal attention they deserve.
            </p>

            <p>
              Every dog is treated as an individual, and every owner deserves
              the confidence of knowing their pet is being cared for as if they
              were my own.
            </p>

            <p>
              Whether your dog is energetic and adventurous, shy and reserved,
              or somewhere in between, my goal is always the same: to make them
              feel safe, comfortable, and genuinely excited to come back.
            </p>
          </article>
        </div>
      </section>

      <section className="meet-nick-memory section-padding">
        <div className="meet-nick-memory-grid">
          <div>
            <p className="eyebrow dark">Where it all began</p>
            <h2>Some things never change.</h2>
          </div>

          <div className="meet-nick-childhood-image">
            <img
              src="/assets/images/meet-nick-childhood.jpg"
              alt="Nick as a child surrounded by puppies"
            />
          </div>
           <div className="meet-nick-childhood-copy">
    <h3>A lifelong love for dogs.</h3>

    <p>
      One of my favorite photos is from when I was a little kid,
      surrounded by a litter of puppies. Looking back, it&apos;s hard
      not to smile because it reminds me that not much has changed.
      Caring for dogs has never felt like work to me—it&apos;s simply
      something I&apos;ve always loved doing.
    </p>

    <p>
      That same passion is what I bring to every dog that spends time here.
    </p>
  </div>
        </div>
      </section>
      <section className="meet-nick-closing section-padding">
  <div className="meet-nick-closing-content">
    <p className="eyebrow dark">Ready to meet?</p>

    <h2>I'd love the opportunity to care for your dog.</h2>

    <p>
      Whether you're looking for daycare, overnight boarding, or simply
      someone you can trust, I'd be honored to welcome your dog and give
      them the same care and attention I'd give my own.
    </p>

    <button
  className="button button-primary"
  onClick={() => setBookingOpen(true)}
>
  Start Your Booking
</button>
  </div>
</section>
{bookingOpen && (
  <BookingModal
    bookingType="general"
    onClose={() => setBookingOpen(false)}
  />
)}
    </main>
  )
}
