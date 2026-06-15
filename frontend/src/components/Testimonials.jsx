import { useFetch } from '../hooks/useApi'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { data: testimonials, loading } = useFetch('/testimonials')
  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Client Voices</span>
          <h2 className="section-title">What Clients <em>Say</em></h2>
        </div>
        {loading ? (
          <div className={styles.loading}>Loading…</div>
        ) : (
          <div className={styles.grid}>
            {testimonials?.map((t, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.quote}>"</div>
                <p className={styles.text}>{t.text}</p>
                <div className={styles.author}>{t.author}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
