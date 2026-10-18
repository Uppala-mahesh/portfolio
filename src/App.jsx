import Header from './components/Header'
import Hero from './components/Hero'
import NowStrip from './components/NowStrip'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* faint hairline grid, fixed behind everything */}
      <div aria-hidden="true" className="texture-grid pointer-events-none fixed inset-0 opacity-25" />
      <div className="relative z-10">
        <Header />
        <main id="top">
          <Hero />
          <NowStrip />
          <Stack />
          <Projects />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
