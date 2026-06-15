import styles from './Hero.module.css'

export default function Hero({ lawyer }) {
  if (!lawyer) return null

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg} />
      <div className={`${styles.grid} container`}>
        <div className={styles.content}>
          <p className="section-label">{lawyer.title} · {lawyer.court}</p>
          <h1 className={styles.title}>
            {lawyer.tagline.split('—')[0].trim()} —
            <em> {lawyer.tagline.split('—')[1]?.trim()}</em>
          </h1>
          <p className={styles.desc}>{lawyer.bio[0]}</p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={() => scrollTo('contact')}>
              Book a Consultation
            </button>
            <button className={styles.btnGhost} onClick={() => scrollTo('cases')}>
              View Notable Cases
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.glowRing} />
          <svg className={styles.scales} viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="177" y="60" width="6" height="220" fill="#C9A84C" opacity="0.7"/>
            <circle cx="180" cy="60" r="10" fill="#C9A84C" opacity="0.9"/>
            <rect x="130" y="278" width="100" height="8" rx="2" fill="#C9A84C" opacity="0.7"/>
            <rect x="150" y="286" width="60" height="5" rx="2" fill="#C9A84C" opacity="0.5"/>
            <g className={styles.beam}>
              <line x1="90" y1="120" x2="270" y2="120" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
              <line x1="100" y1="120" x2="100" y2="170" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
              <line x1="260" y1="120" x2="260" y2="170" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.6"/>
            </g>
            <g className={styles.panLeft}>
              <ellipse cx="100" cy="178" rx="38" ry="10" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
              <path d="M62 178 Q100 190 138 178" fill="#C9A84C" opacity="0.12"/>
              <circle cx="93" cy="173" r="4" fill="#C9A84C" opacity="0.5"/>
              <circle cx="107" cy="173" r="3" fill="#C9A84C" opacity="0.4"/>
            </g>
            <g className={styles.panRight}>
              <ellipse cx="260" cy="170" rx="38" ry="10" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.8"/>
              <path d="M222 170 Q260 182 298 170" fill="#C9A84C" opacity="0.12"/>
              <circle cx="255" cy="165" r="5" fill="#C9A84C" opacity="0.5"/>
            </g>
            <circle cx="180" cy="120" r="80" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="3,8" opacity="0.25"/>
            <circle cx="180" cy="180" r="130" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="2,12" opacity="0.15"/>
          </svg>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {lawyer.stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statNum}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
