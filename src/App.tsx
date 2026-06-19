import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import { SettingsProvider } from './contexts/SettingsContext';
import { UserProvider } from './contexts/UserContext';
import { SEO } from './components/SEO';
import { PageSuspenseLoader } from './components/PageSuspenseLoader';

import { OfflineBanner } from './components/OfflineBanner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const DevicesPage = lazy(() => import('./pages/DevicesPage').then(module => ({ default: module.DevicesPage })));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage').then(module => ({ default: module.UpdatesPage })));
const ServiceCentersPage = lazy(() => import('./pages/ServiceCentersPage').then(module => ({ default: module.ServiceCentersPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));
const PrivacyPage = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/LegalPages').then(module => ({ default: module.DisclaimerPage })));
const DevicePage = lazy(() => import('./pages/DevicePage').then(module => ({ default: module.DevicePage })));
const ComparePage = lazy(() => import('./pages/ComparePage').then(module => ({ default: module.ComparePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const ChangelogPage = lazy(() => import('./pages/ChangelogPage').then(module => ({ default: module.ChangelogPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(module => ({ default: module.FaqPage })));
const ReportPricePage = lazy(() => import('./pages/ReportPricePage').then(module => ({ default: module.ReportPricePage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then(module => ({ default: module.SearchPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const SavedDevicesPage = lazy(() => import('./pages/SavedDevicesPage').then(module => ({ default: module.SavedDevicesPage })));

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SettingsProvider>
          <UserProvider>
            <BrowserRouter>
              <SEO />
              <OfflineBanner />
              <Layout>
                <Suspense fallback={<PageSuspenseLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/updates" element={<UpdatesPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/saved" element={<SavedDevicesPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/device/:id" element={<DevicePage />} />
                    
                    <Route path="/centers" element={<ServiceCentersPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/disclaimer" element={<DisclaimerPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/report-price" element={<ReportPricePage />} />
                    <Route path="/changelog" element={<ChangelogPage />} />
                    
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </UserProvider>
        </SettingsProvider>
      </ErrorBoundary>
      <Analytics />
    </HelmetProvider>
  );
}
