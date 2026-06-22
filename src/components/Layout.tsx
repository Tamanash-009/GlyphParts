import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Smartphone, Activity, MapPin, Wrench, Globe, Settings, ExternalLink, WifiOff, Download } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { CURRENCIES } from '../data/serviceCenters';

import { SearchOverlay } from './SearchOverlay';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useUser } from '../contexts/UserContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { currency, setCurrency, showLocationBanner } = useSettings();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isInstallable, install, dismiss } = usePWAInstall();
  const { theme, setTheme } = useUser();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Theme is applied in UserContext, but we still toggle here
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        navigate('/search');
      }
      // Support '/' for search if not focusing an input
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        navigate('/search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className={`min-h-[100dvh] flex flex-col font-sans selection:bg-zinc-300/30 pb-24 md:pb-0 transition-colors duration-200`}>
      {/* Mobile Install Toast */}
      {isInstallable && (
        <div className="fixed bottom-[80px] left-4 right-4 md:hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
          <div className="bg-foreground text-background p-4 rounded-2xl shadow-2xl flex flex-col gap-3 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-background text-foreground rounded-xl flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Install GlyphParts</h4>
                <p className="text-xs opacity-80">For faster access & offline mode.</p>
              </div>
            </div>
            <div className="flex gap-2 w-full mt-1">
              <button onClick={dismiss} className="flex-1 py-2 rounded-xl border border-background/20 text-xs font-medium hover:bg-background/10 transition-colors">
                Dismiss
              </button>
              <button onClick={install} className="flex-1 py-2 rounded-xl bg-background text-foreground text-xs font-medium hover:opacity-90 transition-colors">
                Install
              </button>
            </div>
          </div>
        </div>
      )}
 {/* Offline Banner */}
 {!isOnline && (
 <div className="fixed top-0 inset-x-0 z-[100] animate-in slide-in-from-top-full fade-in duration-300">
  <div className="bg-[#E52534] text-white px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-3 text-sm font-medium tracking-wide shadow-lg">
  <WifiOff className="h-4 w-4 shrink-0" />
  <span className="text-center">You are currently offline. Some features may not be available.</span>
  </div>
 </div>
 )}

 {/* Location Banner Prompt */}
 {showLocationBanner && (
 <div className="fixed top-0 inset-x-0 z-[60] animate-in slide-in-from-top-full fade-in duration-500">
  <div className="bg-foreground text-background px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-3 text-sm font-medium tracking-wide shadow-lg">
  <MapPin className="h-4 w-4 shrink-0" />
  <span className="text-center">Allow location access to find nearby service centers and show local pricing.</span>
  </div>
 </div>
 )}

 {/* Navbar */}
 <header className={`sticky top-0 z-50 w-full backdrop-blur-2xl border-b border-border bg-background/80 ${showLocationBanner ? 'mt-14' : ''}`}>
 <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
 <Link to="/" className="flex items-center gap-2 font-display font-medium tracking-tight text-xl hover:opacity-70 transition-opacity">
 <Wrench className="h-5 w-5" />
 GLYPHPARTS
 </Link>

 <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
 {[
 { path: '/', label: 'Home' },
 { path: '/devices', label: 'Devices' },
 { path: '/centers', label: 'Centers' },
 { path: '/compare', label: 'Compare' },
 { path: '/updates', label: 'Updates' }
 ].map(link => (
 <Link 
 key={link.path}
 to={link.path} 
 className={`transition-colors py-2 ${location.pathname === link.path ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
 >
 {link.label}
 </Link>
 ))}
 </nav>

 <div className="flex items-center gap-3">
 {isInstallable && (
   <button 
     onClick={install}
     className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
   >
     <Download className="w-4 h-4" />
     Install App
   </button>
 )}
 <SearchOverlay trigger={
  <button 
   className="p-2.5 rounded-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted dark:hover:bg-zinc-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-transparent hover:border-border hidden md:flex"
   aria-label="Search"
  >
   <Search className="h-[1.125rem] w-[1.125rem]" />
  </button>
 } />
 <div className="relative group">
 <div className="flex items-center gap-2 p-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted dark:hover:bg-zinc-900 transition-colors cursor-pointer border border-transparent hover:border-border">
 <Globe className="h-4 w-4" />
 <span className="hidden sm:inline uppercase font-mono tracking-widest text-[10px] min-w-[30px]">{currency}</span>
 </div>
 <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 z-50">
 {CURRENCIES.map(c => (
  <button
  key={c.code}
  onClick={() => setCurrency(c.code)}
  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors flex items-center justify-between ${currency === c.code ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-zinc-900'} min-h-[44px]`}
  >
  <span>{c.label}</span>
  <span className="text-xs font-mono">{c.code}</span>
  </button>
 ))}
 </div>
 </div>

 <button 
 onClick={toggleTheme} 
 className="p-2.5 rounded-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted dark:hover:bg-zinc-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-transparent hover:border-border"
 aria-label="Toggle theme"
 >
 <div className="h-3.5 w-3.5 rounded-full bg-current" />
 </button>

 <button 
 onClick={() => navigate('/settings')} 
 className="p-2.5 rounded-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted dark:hover:bg-zinc-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-transparent hover:border-border"
 aria-label="Settings"
 >
 <Settings className="h-[1.125rem] w-[1.125rem]" />
 </button>
 </div>
 </div>
 </header>

 {/* Main Content */}
 <main className="flex-1">
 {children}
 </main>

 {/* Footer */}
 <footer className="border-t border-border bg-card mt-auto pb-safe">
 <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
 <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-8">
 
 <div className="col-span-2 md:col-span-2 space-y-6 md:pr-12">
  <div className="flex items-center gap-2 font-display font-medium tracking-tight text-foreground text-lg mb-6">
   <Wrench className="h-5 w-5" />
   GLYPHPARTS
  </div>
  <p className="text-sm text-muted-foreground leading-relaxed font-light">
   Independent archive. Not affiliated with Nothing Technology Limited.
  </p>
  <div className="flex flex-col gap-2 pt-4">
   <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
    System Active
   </div>
   <p className="text-xs text-muted-foreground/60">Last verified: June 2026</p>
  </div>
 </div>

 <div className="space-y-6">
 <h4 className="font-semibold tracking-wide text-foreground text-sm">Explore</h4>
 <nav className="flex flex-col gap-3.5 text-sm text-muted-foreground">
 <Link to="/" className="hover:text-foreground transition-colors min-h-[24px]">Home</Link>
 <Link to="/devices" className="hover:text-foreground transition-colors min-h-[24px]">Devices Archive</Link>
 <Link to="/compare" className="hover:text-foreground transition-colors min-h-[24px]">Compare Models</Link>
 <Link to="/updates" className="hover:text-foreground transition-colors min-h-[24px]">Price Updates</Link>
 <Link to="/changelog" className="hover:text-foreground transition-colors min-h-[24px]">Changelog</Link>
 <Link to="/centers" className="hover:text-foreground transition-colors min-h-[24px]">Service Centers</Link>
 </nav>
 </div>
 
 <div className="space-y-6">
 <h4 className="font-semibold tracking-wide text-foreground text-sm">Legal & Connect</h4>
 <nav className="flex flex-col gap-3.5 text-sm text-muted-foreground">
 <Link to="/privacy" className="hover:text-foreground transition-colors min-h-[24px]">Privacy Philosophy</Link>
 <Link to="/terms" className="hover:text-foreground transition-colors min-h-[24px]">Terms of Use</Link>
 <Link to="/disclaimer" className="hover:text-foreground transition-colors min-h-[24px]">Legal Disclaimer</Link>
 <Link to="/faq" className="hover:text-foreground transition-colors min-h-[24px]">FAQ</Link>
 <Link to="/about" className="hover:text-foreground transition-colors min-h-[24px]">About Us</Link>
 <Link to="/contact" className="hover:text-foreground transition-colors min-h-[24px]">Contact</Link>
 </nav>
 </div>

 <div className="space-y-6 col-span-2 md:col-span-1">
 <h4 className="font-semibold tracking-wide text-foreground text-sm">Community</h4>
 <nav className="flex flex-col gap-3.5 text-sm text-muted-foreground">
 <a href="https://github.com/Tamanash-009" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2 min-h-[24px]">
  GitHub Repository <ExternalLink className="h-3 w-3" />
 </a>
 <a href="mailto:feedback@glyphparts.com?subject=Feature Request" className="hover:text-foreground transition-colors min-h-[24px]">Feature Requests</a>
 <a href="mailto:bug@glyphparts.com?subject=Bug Report" className="hover:text-foreground transition-colors min-h-[24px]">Bug Reports</a>
 <Link to="/report-price" className="hover:text-foreground transition-colors min-h-[24px]">Report Incorrect Price</Link>
 </nav>
 </div>

 </div>

 <div className="mt-16 pt-8 border-t border-border flex flex-col gap-6 text-xs text-muted-foreground/60 font-light pr-4">
  <p className="max-w-4xl text-[10px] sm:text-[11px] leading-relaxed opacity-70">
   <strong>Legal Disclaimer:</strong> GlyphParts is an independent, community-driven database. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Nothing Technology Limited, CMF, or any of its subsidiaries. The names 'Nothing', 'CMF', and related trademarks are the property of their respective owners. All product images are AI-generated representations and not official photographs.
  </p>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
   <p>© {new Date().getFullYear()} GlyphParts. Independent Archive.</p>
   <p>Not affiliated with Nothing Technology Limited.</p>
  </div>
 </div>
 </div>
 </footer>

 {/* Floating Bottom Nav (Mobile) */}
 <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border pb-safe pt-2">
 <div className="w-full flex items-center justify-around px-2 pb-2">
 {[
 { path: '/', icon: Home, label: 'Home' },
 { path: '/search', icon: Search, label: 'Search' },
 { path: '/devices', icon: Smartphone, label: 'Devices' },
 { path: '/centers', icon: MapPin, label: 'Centers' },
 { path: '/settings', icon: Settings, label: 'Settings' }
 ].map((item) => (
 <Link 
 key={item.path}
 to={item.path} 
 className={`flex flex-col items-center justify-center p-2 min-w-[64px] min-h-[48px] rounded-2xl transition-colors ${location.pathname === item.path ? 'text-foreground' : 'text-muted-foreground hover:bg-muted'}`}
 aria-label={item.label}
 >
 <item.icon className="h-5 w-5 mb-1" />
 <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
 </Link>
 ))}
 </div>
 </div>
 </div>
 );
}
