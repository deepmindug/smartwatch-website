import ContactForm from '../components/ContactForm'
import Icon from '../components/Icon'
import Reveal from '../components/Reveal'
import { WhatsAppMark } from '../components/WhatsAppButton'
import { anchors, mapEmbed, offices, site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { cx } from '../lib/cx'
import s from './ContactPage.module.css'

export default function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'Talk to Smartwatch Solutions sales or support 24/7. Offices in Kampala, Nairobi and the Netherlands. Request a demo or get help with an installed device.',
  })

  return (
    <div className={s.page}>
      <section className={s.band}>
        <div className={cx('container', s.bandInner)}>
          <div className="eyebrow eyebrow--rule">Contact</div>
          <h1 className="h-page">Talk to sales or support, 24/7.</h1>
          <p className={s.lead}>Request a demo, ask about pricing, or get help with an installed device.</p>
        </div>
      </section>

      <div className={s.body}>
        <Reveal as="section" stagger className={cx('container', s.router)} aria-label="How can we help">
          <a href={`#${anchors.demo}`} className={cx(s.card, s.cardLink, 'lift')}>
            <span className={s.cardIcon}>
              <Icon name="sales" />
            </span>
            <div className={s.cardTitle}>Talk to sales</div>
            <p className={s.cardBody}>See Smartwatch FM on your own fleet and get pricing for your vehicles.</p>
            <span className={s.cardMore}>Request a demo ↓</span>
          </a>
          <a href={`#${anchors.support}`} className={cx(s.card, s.cardLink, 'lift')}>
            <span className={s.cardIcon}>
              <Icon name="help" />
            </span>
            <div className={s.cardTitle}>Help centre</div>
            <p className={s.cardBody}>Installation, setup and everyday use of Smartwatch FM, VSS and OnTrack.</p>
            <span className={s.cardMore}>Get support ↓</span>
          </a>
          <div className={s.card}>
            <span className={s.cardIcon}>
              <Icon name="support" />
            </span>
            <div className={s.cardTitle}>Call or email us</div>
            <p className={s.cardBody}>Our sales and support lines run 24/7 from Kampala and Nairobi.</p>
            <a href={`mailto:${site.email}`} className={s.cardMore}>
              {site.email}
            </a>
          </div>
        </Reveal>

        <section id={anchors.support} className={cx('container', s.support)}>
          <Reveal className={s.supportCopy}>
            <div className="eyebrow">Customer support</div>
            <h2 className="h-section">Prompt, relevant help by phone, email, remote log-in or in person.</h2>
            <p className="lead">
              Whether it is a routine inquiry or an emergency, our service inquiries and case management
              process is built for rapid diagnosis and resolution. Email us or call the office nearest to you.
            </p>
            <div className={s.supportActions}>
              <a href={`mailto:${site.email}`} className="btn btn--primary">
                Email support
              </a>
              <a href={`#${anchors.offices}`} className="btn btn--outline">
                Office phone numbers
              </a>
            </div>
          </Reveal>
        </section>

        <section id={anchors.offices} className={cx('container', s.officesSection)}>
          <div className={s.officesHead}>
            <div className="eyebrow">Our offices</div>
            <h2 className="h-section">Where to find us.</h2>
          </div>
          <div className={s.map}>
            <iframe
              title={mapEmbed.title}
              src={mapEmbed.src}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <Reveal stagger className={s.offices}>
            {offices.map((office) => (
              <div key={office.city} className={s.office}>
                <div className={s.officeRole}>{office.role}</div>
                <h3 className={s.officeCity}>
                  {office.city}, {office.country}
                </h3>
                <div className={s.officeAddr}>
                  {office.lines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <div className={s.officePhones}>
                  {office.phones.map((phone) => (
                    <a key={phone.href} href={phone.href} className={s.officeTel}>
                      {phone.label}
                    </a>
                  ))}
                </div>
                {office.whatsapp && (
                  <a
                    href={office.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.officeWhatsApp}
                  >
                    <WhatsAppMark size={16} />
                    WhatsApp {office.whatsapp.label}
                  </a>
                )}
              </div>
            ))}
          </Reveal>
        </section>
      </div>

      <section id={anchors.demo} className={s.demo}>
        <div className={cx('container', s.demoGrid)}>
          <div className={s.demoCopy}>
            <div className="eyebrow">Request a demo</div>
            <h2 className={s.demoTitle}>We'd love to show you around.</h2>
            <p className={s.demoLead}>
              Tell us about your fleet and a specialist from our Kampala or Nairobi team will get back to
              you within one business day.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
