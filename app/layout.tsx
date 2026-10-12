import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { MobileNavProvider } from '../components/MobileNavContext';

export const metadata: Metadata = {
  title: 'Dental ERP - Social Media & Creative Automation',
  description: 'AI-Powered Creative Operations and Social Media Automation for Dental Practices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 flex antialiased">
        <MobileNavProvider>
          {/* Persistent ERP Sidebar (Desktop) + Slide-over Drawer (Mobile) */}
          <Sidebar />

          {/* Main Operational Canvas */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
            <Header />
            <main className="flex-1 p-4 sm:p-6 xl:p-8 max-w-[1600px] w-full mx-auto">
              {children}
            </main>
          </div>
        </MobileNavProvider>
      </body>
    </html>
  );
}
