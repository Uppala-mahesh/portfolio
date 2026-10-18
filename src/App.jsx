import Header from './components/Header'
import Hero from './components/Hero'
import MetricsStrip from './components/MetricsStrip'
import NowStrip from './components/NowStrip'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Coursemap from './components/Coursemap'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import Footer from './components/Footer'

// v3 — every v2 section is mounted again (content intact), restyled by the
// dark token values. Stack stays mounted but outside the nav; it can be
// folded into the project cards if the full page reads better without it.
export default function App() {
  return (
    <div className="relative min-h-screen bg-void text-bone">
      <Header />
      <main>
        <Hero />
        <MetricsStrip />
        <NowStrip />
        <Projects />
        <Coursemap />
        <Stack />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
