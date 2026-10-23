import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { fleetSizes, leadSources } from '../data/content'
import { routes } from '../data/site'
import { submitLead } from '../lib/leads'
import { cx } from '../lib/cx'
import CornerButton from './ui/corner-button'
import s from './DemoForm.module.css'

export default function DemoForm() {
  const [sent, setSent] = useState(false)
  const [source, setSource] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await submitLead({
      firstName: String(data.get('firstName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      company: String(data.get('company') ?? ''),
      fleetSize: String(data.get('fleetSize') ?? ''),
      marketingOptIn: data.get('optIn') === 'on',
    })
    setSent(true)
  }

  function reset() {
    setSent(false)
    setSource(null)
  }

  if (sent) {
    return (
      <div className={s.card}>
        <div className={s.check} aria-hidden="true">
          ✓
        </div>
        <h3 className={s.thanks}>Thank you!</h3>
        <p className={s.thanksBody}>
          Our sales team is excited to talk with you. We'll be reaching out within one business day
          with more information.
        </p>
        <div className={s.survey}>
          <div className={s.surveyQuestion}>
            How did you first discover Smartwatch? <span className={s.surveyHint}>(Select one)</span>
          </div>
          <div className={s.chips}>
            {leadSources.map((name) => (
              <button
                key={name}
                type="button"
                className={cx(s.chip, source === name && s.chipOn)}
                aria-pressed={source === name}
                onClick={() => setSource(name)}
              >
                {name}
              </button>
            ))}
          </div>
          {source && <div className={s.surveySent}>Your submission has been sent.</div>}
        </div>
        <button type="button" className={s.again} onClick={reset}>
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form className={s.card} onSubmit={onSubmit} noValidate={false}>
      <h3 className={s.title}>Schedule a demo</h3>
      <div className="field-row">
        <label className="field">
          First name
          <input type="text" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="field">
          Last name
          <input type="text" name="lastName" required autoComplete="family-name" />
        </label>
      </div>
      <label className="field">
        Work email
        <input type="email" name="email" required autoComplete="email" />
      </label>
      <div className="field-row">
        <label className="field">
          Phone
          <input type="tel" name="phone" required autoComplete="tel" />
        </label>
        <label className="field">
          Company
          <input type="text" name="company" required autoComplete="organization" />
        </label>
      </div>
      <label className="field">
        Fleet size
        <select name="fleetSize" defaultValue={fleetSizes[0]}>
          {fleetSizes.map((size) => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </label>
      <label className="field-check">
        <input type="checkbox" name="optIn" />
        Yes, I would like to receive communications about Smartwatch products, services, and events
        and understand that I can unsubscribe at any time.
      </label>
      <CornerButton type="submit" className={s.submit}>
        Get a demo
      </CornerButton>
      <div className={s.finePrint}>
        By clicking "Get a demo", I acknowledge receipt of the{' '}
        <Link to={routes.privacy}>Smartwatch Privacy Policy</Link>.
      </div>
    </form>
  )
}
