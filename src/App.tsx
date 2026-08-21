import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'wouter'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { MobileBar } from './components/MobileBar'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import WorkPage from './pages/WorkPage'
import ProcessPage from './pages/ProcessPage'
import FaqPage from './pages/FaqPage'
import AboutPage from './pages/AboutPage'
import ServiceAreaPage from './pages/ServiceAreaPage'
import ContactPage from './pages/ContactPage'
import EstimatePage from './pages/EstimatePage'
import ThanksPage from './pages/ThanksPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/services/:slug" component={ServiceDetailPage} />
          <Route path="/work" component={WorkPage} />
          <Route path="/process" component={ProcessPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/service-area" component={ServiceAreaPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/estimate" component={EstimatePage} />
          <Route path="/thanks" component={ThanksPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <SiteFooter />
      <MobileBar />
    </>
  )
}
