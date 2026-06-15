import styles from './About.module.css'

export default function About({ lawyer }) {
  if (!lawyer) return null
  return (
    <section className={styles.about} id="about">
      <div className={`${styles.inner} container`}>
        <div className={styles.imgWrap}>
          <div className={styles.imgBox}>
            <span className={styles.initials}>RS</span>
          </div>
          <div className={styles.accent} />
        </div>
        <div className={styles.textContent}>
          <span className="section-label">About the Advocate</span>
          <h2 className="section-title">
            A legacy of <em>principled</em> legal practice
          </h2>
          {lawyer.bio.map((para, i) => (
            <p key={i} className={styles.para}>{para}</p>
          ))}
          <div className={styles.credentials}>
            {lawyer.credentials.map((c, i) => (
              <div key={i} className={styles.credential}>
                <span className={styles.year}>{c.year}</span>
                <span className={styles.credText}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
