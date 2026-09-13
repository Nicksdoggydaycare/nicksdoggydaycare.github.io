import './Privacy.css'

export default function Privacy() {
  return (
    <main className="privacy-page privacy-page-enter">
      <header className="privacy-hero">
        <div className="privacy-hero-inner">
          <a className="privacy-back" href="/">
            ← Back to home
          </a>

          <p className="privacy-eyebrow">NICK&apos;S DOGGY DAYCARE</p>

          <h1>Privacy Policy</h1>

          <p className="privacy-intro">
            Your trust matters to us. This Privacy Policy explains how
            Nick&apos;s Doggy Daycare collects, uses, stores, and protects
            information when you use our website and mobile app.
          </p>

          <p className="privacy-updated">
            Last updated September 13, 2026
          </p>
        </div>
      </header>

      <section className="privacy-content">
        <div className="privacy-layout">
          <section className="privacy-section">
            <h2>Information We Collect</h2>

            <p>
              We may collect information you provide directly to us when you
              create an account, manage your dog&apos;s profile, request care,
              communicate with us, or otherwise use our services.
            </p>

            <ul>
              <li>Name, email address, phone number, and account information</li>
              <li>
                Home address, service address, and home-access instructions
              </li>
              <li>
                Dog profile information, including breed, birthday, weight,
                feeding instructions, medications, allergies, behavior, and
                care notes
              </li>
              <li>Veterinarian contact information</li>
              <li>
                Booking details for daycare, overnight boarding, and at-home
                visits
              </li>
              <li>
                Messages, comments, and other information you submit through
                the app
              </li>
              <li>
                Photos and care updates associated with your dog&apos;s services
              </li>
              <li>
                Notification preferences and device information needed to send
                push notifications
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Use Information</h2>

            <p>We may use the information we collect to:</p>

            <ul>
              <li>Provide and manage pet care services</li>
              <li>Create and maintain customer and dog profiles</li>
              <li>Process and manage booking requests</li>
              <li>Provide care updates and service-related notifications</li>
              <li>
                Communicate with customers about bookings, schedules, payments,
                and support
              </li>
              <li>
                Improve the reliability, security, and functionality of our
                services
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Payments</h2>

            <p>
              Payment-related services may be processed through third-party
              payment providers such as Stripe. Nick&apos;s Doggy Daycare does
              not store full payment card numbers on its own servers.
              Payment providers process payment information according to their
              own privacy policies and security practices.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Service Providers</h2>

            <p>
              We may use trusted third-party service providers to operate our
              website and mobile app, including services for data storage,
              authentication, notifications, payment processing, hosting, and
              related functionality.
            </p>

            <p>
              These providers may process information only as necessary to
              provide their services to Nick&apos;s Doggy Daycare.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Data Storage and Security</h2>

            <p>
              We use reasonable administrative and technical measures designed
              to protect personal information. However, no method of electronic
              storage or transmission can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Data Retention</h2>

            <p>
              We retain information for as long as reasonably necessary to
              provide our services, maintain business and transaction records,
              comply with legal obligations, resolve disputes, and enforce our
              agreements.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Your Choices</h2>

            <p>
              You may contact us to request access to, correction of, or
              deletion of your personal information, subject to applicable
              legal, operational, and recordkeeping requirements.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Push Notifications</h2>

            <p>
              If you enable push notifications, the app may store a device
              notification token so that we can send booking updates, care
              updates, reminders, and other service-related notifications.
            </p>

            <p>
              You may change notification permissions at any time through your
              device settings.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Children&apos;s Privacy</h2>

            <p>
              Our services are not intended for children under 13, and we do
              not knowingly collect personal information from children under
              13.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Changes to This Privacy Policy</h2>

            <p>
              We may update this Privacy Policy from time to time. Any updated
              version will be posted on this page with a revised effective
              date.
            </p>
          </section>

          <section className="privacy-section privacy-contact">
            <h2>Contact Us</h2>

            <p>
              If you have questions about this Privacy Policy or your personal
              information, please contact us.
            </p>

            <div className="privacy-contact-card">
              <strong>Nick&apos;s Doggy Daycare</strong>

              <a href="mailto:nicksdoggydaycare@gmail.com">
                nicksdoggydaycare@gmail.com
              </a>

              <a href="https://www.nicksdoggydaycare.com/">
                www.nicksdoggydaycare.com
              </a>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}