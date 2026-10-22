/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSection } from './components/ProductSection';
import { SizeCalculatorSection } from './components/SizeCalculatorSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { LookbookCommunity } from './components/LookbookCommunity';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeFinderModal } from './components/SizeFinderModal';
import { LegalModal } from './components/LegalModal';
import { ClientCoachingBanner } from './components/ClientCoachingBanner';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-zinc-900 selection:bg-zinc-900 selection:text-white">
            {/* Top Slim Announcement */}
            <AnnouncementBar />

          {/* Strict 3-zone Header */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="flex-1">
            {/* Split Hero with 1440px presence and Trust Metrics */}
            <Hero />

            {/* Featured Curated Bestsellers Grid */}
            <ProductSection />

            {/* Interactive Dog Size Calculator */}
            <SizeCalculatorSection />

            {/* Ergonomics & Material Craftsmanship Bento */}
            <CraftsmanshipSection />

            {/* Social Proof & Lookbook */}
            <LookbookCommunity />
          </main>

          {/* Comprehensive Boutique Footer */}
          <Footer />

          {/* Interactive Modals and Drawers */}
          <CartDrawer />
          <QuickViewModal />
          <SizeFinderModal />
          <LegalModal />

          {/* Floating Sales & Dev Academy Guide for the user */}
          <ClientCoachingBanner />
        </div>
      </CartProvider>
    </AuthProvider>
  </ErrorBoundary>
);
}
