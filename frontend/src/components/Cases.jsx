import { useFetch } from '../hooks/useApi'
import styles from './Cases.module.css'

export default function Cases() {
  const { data: cases, loading } = useFetch('/cases')
  return (
    <section className={styles.cases} id="cases">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Track Record</span>
          <h2 className="section-title">Notable <em>Cases</em></h2>
        </div>
        {loading ? (
          <div className={styles.loading}>Loading…</div>
        ) : (
          <div className={styles.grid}>
            {cases?.map((c, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.tag}>{c.tag}</div>
                <div className={styles.title}>{c.title}</div>
                <p className={styles.desc}>{c.desc}</p>
                <div className={styles.result}>✓ {c.result}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
