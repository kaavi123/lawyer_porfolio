import { useFetch } from './hooks/useApi'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Practice from './components/Practice'
import Cases from './components/Cases'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { data: lawyer } = useFetch('/lawyer')

  return (
    <>
      <Navbar lawyerName={lawyer?.name} />
      <main>
        <Hero lawyer={lawyer} />
        <About lawyer={lawyer} />
        <Practice />
        <Cases />
        <Testimonials />
        <Contact contact={lawyer?.contact} />
      </main>
      <Footer name={lawyer?.name} />
    </>
  )
}
