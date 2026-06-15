import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = ['About', 'Practice', 'Cases', 'Testimonials', 'Contact']

export default function Navbar({ lawyerName }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>
        {lawyerName || 'Adv. Rajiv Sharma'}
      </div>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map(link => (
          <li key={link}>
            <button onClick={() => scrollTo(link)} className={styles.link}>
              {link}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={styles.cta}
        onClick={() => scrollTo('Contact')}
      >
        Consult Now
      </button>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
