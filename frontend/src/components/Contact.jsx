import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

const PRACTICE_OPTIONS = [
  'Civil Litigation', 'Criminal Defence', 'Corporate & Commercial',
  'Property & Real Estate', 'Family & Matrimonial', 'Constitutional Law', 'Other',
]

export default function Contact({ contact }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', practice_area: '', description: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
  await emailjs.send(
    'service_y15m7il',
    'template_b4hxe46',
    {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone,
      practice_area: form.practice_area,
      message: form.description,
    },
    'yQx2MgLsG--lRjvEF'
  )

  setMessage('Your inquiry has been sent successfully!')
  setStatus('success')
  setForm({
    name: '',
    phone: '',
    email: '',
    practice_area: '',
    description: '',
  })
} catch (err) {
  setMessage('Failed to send inquiry. Please try again.')
  setStatus('error')
}
  }

  if (!contact) return null

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.grid}>
          {/* Info */}
          <div>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Schedule a <em>Consultation</em></h2>
            <p className={styles.intro}>Every case deserves careful, personal attention. Reach out to discuss your legal matter in confidence.</p>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.icon}>📍</span>
                <div>
                  <div className={styles.infoLabel}>Office</div>
                  <div className={styles.infoVal}>{contact.address}</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>📞</span>
                <div>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoVal}>{contact.phone}</div>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>✉️</span>
                <div>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoVal}>
  <a href={`mailto:${contact.email}`}>
    {contact.email}
  </a>
</div>  
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.icon}>🕐</span>
                <div>
                  <div className={styles.infoLabel}>Hours</div>
                  <div className={styles.infoVal}>{contact.hours}<br/>Prior appointment preferred</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Full Name *</label>
                <input className={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Phone Number</label>
                <input className={styles.input} name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Email Address *</label>
              <input className={styles.input} type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Area of Legal Matter</label>
              <select className={styles.input} name="practice_area" value={form.practice_area} onChange={handleChange}>
                <option value="">Select practice area…</option>
                {PRACTICE_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Brief Description</label>
              <textarea className={`${styles.input} ${styles.textarea}`} name="description" value={form.description} onChange={handleChange} placeholder="Briefly describe your legal matter (kept strictly confidential)…" />
            </div>

            {status === 'success' && <div className={styles.success}>{message}</div>}
            {status === 'error' && <div className={styles.error}>{message}</div>}

            <button type="submit" className={styles.submit} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send Inquiry →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
