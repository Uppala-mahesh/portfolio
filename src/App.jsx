import usePointer from './hooks/usePointer'
import MouseLight from './components/MouseLight'
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

export default function App() {
  usePointer()

  return (
    <div className="relative min-h-screen">
      <MouseLight />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <MetricsStrip />
          <NowStrip />
          <Stack />
          <Projects />
          <Coursemap />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
