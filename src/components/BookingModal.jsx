import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './BookingModal.css'

const bookingContent = {
  general: {
    title: 'Start Your Booking',
    welcome: "We're excited to meet you and your dog.",
    emailSubject: 'Booking Request',
    emailBody: `Hi Nick,

I'd like to start a booking.

Service requested:

Dog's name:

Breed:

Preferred dates:

Pickup location:

Anything else you'd like us to know:

Thank you!`,
    textMessage:
      "Hi Nick! I'd like to start a booking for daycare, boarding, or an at-home visit.",
  },

  daycare: {
    title: 'Start Your Daycare Booking',
    welcome: "We're excited to welcome your dog for a fun day of play.",
    emailSubject: 'Daycare Booking Request',
    emailBody: `Hi Nick,

I'd like to start a booking for daycare.

Dog's name:

Breed:

Preferred date or schedule:

Pickup location:

Anything else you'd like us to know:

Thank you!`,
    textMessage:
      "Hi Nick! I'd like to start a booking for daycare.",
  },

  boarding: {
    title: 'Start Your Boarding Booking',
    welcome: "We're excited to care for your dog while you're away.",
    emailSubject: 'Boarding Booking Request',
    emailBody: `Hi Nick,

I'd like to start a booking for boarding.

Dog's name:

Breed:

Requested dates:

Pickup location:

Anything else you'd like us to know:

Thank you!`,
    textMessage:
      "Hi Nick! I'd like to start a booking for boarding.",
  },
}

export default function BookingModal({
  bookingType = 'general',
  onClose,
}) {
  const [isLeaving, setIsLeaving] = useState(false)
  const content =
    bookingContent[bookingType] || bookingContent.general

  const emailLink =
    `mailto:nicksdoggydaycare@gmail.com` +
    `?subject=${encodeURIComponent(content.emailSubject)}` +
    `&body=${encodeURIComponent(content.emailBody)}`

  const textLink =
    `sms:+19047286552` +
    `?body=${encodeURIComponent(content.textMessage)}`

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

    const handleContactClick = (event, destination) => {
    event.preventDefault()
    setIsLeaving(true)

    window.setTimeout(() => {
      window.location.href = destination
      onClose()
    }, 180)
  }

  return createPortal(
    <div
      className={`booking-modal-backdrop ${isLeaving ? 'booking-modal-leaving' : ''}`}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          className="booking-close"
          onClick={onClose}
          aria-label="Close booking window"
        >
          ×
        </button>

        <div className="booking-brand">
        <span className="booking-brand-main">The Meadow</span>
        <span className="booking-brand-sub">by Nick's Doggy Daycare</span>
        </div>

        <h2 id="booking-modal-title">
          {content.title}
        </h2>

        <p className="booking-welcome">
          {content.welcome}
        </p>

        <p className="booking-intro">
          Choose whichever way is easiest to get in touch.
        </p>

        <p className="booking-reassurance">
        
        </p>

        <div className="booking-options">
          <a
  className="booking-card"
  href={emailLink}
  onClick={(event) => handleContactClick(event, emailLink)}
>
         <span className="booking-card-icon" aria-hidden="true">
  ✉️
</span>

<h3>Email Us</h3>

<p className="booking-contact-detail">
  nicksdoggydaycare@gmail.com
</p>
          </a>

          <a
  className="booking-card"
  href={textLink}
  onClick={(event) => handleContactClick(event, textLink)}
>
            <span className="booking-card-icon" aria-hidden="true">
  💬
</span>

<h3>Text Us</h3>

<p className="booking-contact-detail">
  (904) 728-6552
</p>
          </a>
        </div>
      </div>
    </div>,
    document.body
  )
}