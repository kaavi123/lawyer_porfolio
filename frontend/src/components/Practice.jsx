import { useFetch } from '../hooks/useApi'
import styles from './Practice.module.css'

export default function Practice() {
  const { data: areas, loading } = useFetch('/practice-areas')

  return (
    <section className={styles.practice} id="practice">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Practice <em>Areas</em></h2>
          <p className={styles.sub}>Comprehensive legal representation across multiple domains of Indian law.</p>
        </div>
        {loading ? (
          <div className={styles.loading}>Loading…</div>
        ) : (
          <div className={styles.grid}>
            {areas?.map((area, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.icon}>{area.icon}</div>
                <div className={styles.name}>{area.name}</div>
                <p className={styles.desc}>{area.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
