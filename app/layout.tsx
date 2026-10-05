import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

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
      <body className="min-h-screen bg-[#f8faf9] text-[#203b35] flex antialiased">
        {/* Persistent ERP Sidebar */}
        <Sidebar />

        {/* Main Operational Canvas */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
          <Header />
          <main className="flex-1 p-5 sm:p-7 xl:p-8 max-w-[1600px] w-full mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
