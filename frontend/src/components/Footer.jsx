import styles from './Footer.module.css'

export default function Footer({ name }) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.logo}>{name || 'Adv. Rajiv Sharma'} & Associates</div>
        <div className={styles.copy}>© {new Date().getFullYear()} Rajiv Sharma. All rights reserved. | Bar Council of Rajasthan</div>
        <div className={styles.links}>
          {['Home', 'About', 'Contact'].map(link => (
            <button
              key={link}
              className={styles.link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
