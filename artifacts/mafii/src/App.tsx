import { useEffect, type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import Home from '@/pages/editorial/PersonalSpecialist';
import Services from '@/pages/editorial/Services';
import About from '@/pages/editorial/About';
import FirstVisit from '@/pages/editorial/FirstVisit';
import Visit from '@/pages/editorial/Visit';
import '@/pages/editorial/Refinement.css';
import '@/pages/editorial/HeroRefinement.css';
import '@/pages/editorial/InnerPages.css';
import '@/pages/editorial/ServiceGroups.css';
import { booking, page } from '@/pages/editorial/SiteShell';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

function LegacyRedirect({ to }: { to: string }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return <p className="p-8">Continue to <a className="underline" href={to}>MAFII {to === booking ? "booking on GlossGenius" : "studio information"}</a>.</p>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/brazilian">{() => <LegacyRedirect to={page("Brazilian")} />}</Route>
        <Route path="/brazilian">{() => <LegacyRedirect to={page("Brazilian")} />}</Route>
        <Route path="/about" component={About} />
        <Route path="/visit" component={Visit} />
        <Route path="/studio">{() => <LegacyRedirect to={page("About")} />}</Route>
        <Route path="/first-visit" component={FirstVisit} />
        <Route path="/cancellation-policy">{() => <LegacyRedirect to={page("FirstVisit")} />}</Route>
        <Route path="/book">{() => <LegacyRedirect to={booking} />}</Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
