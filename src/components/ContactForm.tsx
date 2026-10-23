import { useState, type FormEvent } from 'react'
import { countries } from '../data/content'
import { pillars } from '../data/pillars'
import { submitLead } from '../lib/leads'
import { cx } from '../lib/cx'
import s from './DemoForm.module.css'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    await submitLead({
      firstName: String(data.get('firstName') ?? ''),
      lastName: String(data.get('lastName') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      country: String(data.get('country') ?? ''),
      interest: String(data.get('interest') ?? ''),
      message: String(data.get('message') ?? ''),
    })
    setSent(true)
  }

  if (sent) {
    return (
      <div className={s.card}>
        <div className={s.check} aria-hidden="true">
          ✓
        </div>
        <h3 className={s.thanks}>Request sent</h3>
        <p className={s.thanksBody}>
          Thanks for reaching out. Our Kampala or Nairobi team will get back to you within one
          business day.
        </p>
        <button type="button" className={s.again} onClick={() => setSent(false)}>
          Send another request
        </button>
      </div>
    )
  }

  return (
    <form className={s.card} onSubmit={onSubmit}>
      <h3 className={s.title}>Request a demo</h3>
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
          Country
          <select name="country" defaultValue={countries[0]}>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        I'm interested in
        <select name="interest" defaultValue={pillars[0].name}>
          {pillars.map((p) => (
            <option key={p.name}>{p.name}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Message
        <textarea name="message" rows={4} />
      </label>
      <button type="submit" className={cx('btn', 'btn--primary', s.submit)}>
        Send request
      </button>
    </form>
  )
}
