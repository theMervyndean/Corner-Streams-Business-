import React from "react";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  Zap, 
  Sparkles, 
  Globe, 
  RefreshCw, 
  Lock, 
  Activity, 
  FileText, 
  Users,
  Database,
  QrCode,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface LandingPageProps {
  onNavigateToTab: (tab: "simulator" | "admin_dashboard") => void;
}

export default function LandingPage({ onNavigateToTab }: LandingPageProps) {
  return (
    <div id="landing-page-root" className="flex-1 bg-white flex flex-col font-sans select-none text-slate-700">
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#0A2540] text-white py-16 px-6 lg:py-24">
        {/* Abstract background grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating gradient orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0052CC] opacity-20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500 opacity-10 blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0052CC]/20 border border-[#0052CC]/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              <span>Corner Streams Business v2.4</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
              Empower Your SMB.<br />
              <span className="text-blue-400">Monitor From Everywhere.</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Corner Streams Business (CBS) is Africa’s premier forensic cashbook and absentee-owner retail monitor. Synchronize physical registers, manage multi-branch inventory, verify compliance with instant government NIN lookups, and prevent retail leakage in real-time.
            </p>

            {/* DOWNLOAD BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Apple Store Button */}
              <a 
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Simulating iOS download: Corner Streams Business package 'app-store-cbs-v2.ipa' successfully queued!");
                }}
                className="bg-black hover:bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg"
              >
                {/* Custom SVG Apple Logo */}
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Download on the</p>
                  <p className="text-xs font-bold font-sans">App Store</p>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a 
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Simulating Android APK download: 'cbs-merchant-terminal-release.apk' downloading directly in background!");
                }}
                className="bg-black hover:bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-lg"
              >
                {/* Custom SVG Google Play Logo */}
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M5 3.05c-.13.13-.2.33-.2.58v16.74c0 .25.07.45.2.58l.06.06L14.6 11.5v-.15L5.06 2.99l-.06.06zM17.8 8.3l-3.2 3.2v.15l3.2 3.2.07-.04 3.8-2.16c1.08-.61 1.08-1.62 0-2.24l-3.8-2.16-.07-.05zM14.1 11.1L5.6 2.6c-.36-.36-.95-.12-1.32.55l8.7 8.7 1.1-.75zM14.1 11.9l-1.1-.75-8.7 8.7c.37.67.96.91 1.32.55l8.5-8.5z"/>
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[9px] uppercase text-slate-400 font-semibold tracking-wider">Get it on</p>
                  <p className="text-xs font-bold font-sans">Google Play</p>
                </div>
              </a>
            </div>

            {/* Fast Track Simulator CTAs */}
            <div className="pt-6 flex items-center gap-4 text-xs font-bold border-t border-slate-800">
              <span className="text-slate-400">Sandbox Fast-Track:</span>
              <button 
                onClick={() => onNavigateToTab("simulator")}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline"
              >
                <span>📱 Open Mobile App Simulator</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <span className="text-slate-600">•</span>
              <button 
                onClick={() => onNavigateToTab("admin_dashboard")}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
              >
                <span>👑 Super Admin Controls</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Hero Right: Aesthetic App Promo Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-2xl relative max-w-[280px]"
            >
              {/* Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-20"></div>
              {/* Home Indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-800 rounded-full z-20"></div>

              {/* Internal Mockscreen Layout */}
              <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-[9/19] flex flex-col text-left border border-slate-800">
                <div className="p-3 pt-6 bg-gradient-to-b from-[#0A2540] to-slate-950 space-y-4">
                  <div className="flex justify-between items-center text-[9px] text-slate-400">
                    <span>9:41 AM</span>
                    <span className="flex items-center gap-1">🟢 Connected</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">CS</div>
                    <div>
                      <h4 className="text-[11px] font-bold text-white leading-none">Corner Streams</h4>
                      <p className="text-[8px] text-slate-400 mt-1">Merchant Terminal #A302</p>
                    </div>
                  </div>

                  {/* Micro dashboard layout preview */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[7.5px] text-slate-400 uppercase tracking-wider font-semibold">Today's Sales</span>
                      <span className="text-[7.5px] text-emerald-400 font-bold">100% Synced</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-white font-mono">₦24,800.00</span>
                      <span className="text-[8px] text-emerald-400 font-bold">↑ 12% today</span>
                    </div>
                  </div>

                  {/* Dummy List preview */}
                  <div className="space-y-1.5">
                    <p className="text-[7.5px] text-slate-400 uppercase font-semibold">Pending Audits</p>
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-[8px] text-slate-300 flex justify-between items-center">
                      <span>👤 Adewale (Ikeja main)</span>
                      <span className="text-emerald-400 font-mono font-bold">₦15,400</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-[8px] text-slate-300 flex justify-between items-center">
                      <span>👤 Chinelo (Alaba branch)</span>
                      <span className="text-amber-400 font-mono font-bold">₦9,400</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-slate-950 p-3 flex flex-col justify-end">
                  <button 
                    onClick={() => onNavigateToTab("simulator")}
                    className="w-full bg-blue-600 text-white text-[10px] font-bold py-2 rounded-lg text-center hover:bg-blue-500 transition-colors"
                  >
                    Open Live Sandbox
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE CONCEPT & PURPOSE */}
      <section className="py-16 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              The CBS Vision: Secure Absentee Ownership
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Corner Streams Business was built with a singular mission: to eliminate retail leakage, inventory loss, and cash discrepancies for small business owners who cannot be physically present at their shops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 text-left shadow-sm">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                🛡️
              </div>
              <h3 className="font-bold text-base text-slate-900">Anti-Leakage Auditing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Manually record expected physical cash with system-stamped totals. Any discrepancy or variance triggers instant security log reports. Freeze terminals remotely from anywhere if theft is suspected.
              </p>
            </div>

            {/* Value Card 2 */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 text-left shadow-sm">
              <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                🔄
              </div>
              <h3 className="font-bold text-base text-slate-900">Unified Sync Engine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Never lose a single receipt even when offline. CBS operates a multi-device synced register that aggregates cash, POS card, and transfer receipts the moment internet connectivity is restored.
              </p>
            </div>

            {/* Value Card 3 */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl space-y-4 text-left shadow-sm">
              <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                💬
              </div>
              <h3 className="font-bold text-base text-slate-900">WhatsApp Dispatch</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Integrate directly with customer WhatsApp numbers. Dispatch beautiful PDF performance invoices or verified purchase receipts atomically right from the checkout terminal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FULL PLANS AND PURPOSE ANALYSIS */}
      <section className="py-16 px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Plan Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              The Forensic Merchant Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Traditional ERPs and POS systems are designed for large corporations with active in-store IT departments. CBS is engineered from the ground up for the micro-mart, the cosmetics boutique, the electronics dealer, and the open-market fabric stall.
            </p>

            <div className="space-y-4.5">
              <div className="flex gap-3">
                <div className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Government NIN Identity Compliance</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Integrates verified national databases to cross-check staff registry identities and business registration details instantly.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Ogbese Ledger Debt Book</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Track informal lines of customer credit securely with scheduled payment notifications and automated status updates.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Live Multi-Branch Aggregator</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Connect infinite outlet nodes. Compare performance metrics, product category shares, and sales-staff contributions on a single pane.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Model & Pricing Plans */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 text-left">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Simple, Transparent Pricing</h3>
              <p className="text-xs text-slate-500 mt-1">Configure your card with secure auto-renew and monitor your store effortlessly.</p>
            </div>

            <div className="divide-y divide-slate-200 space-y-4">
              <div className="pt-2 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">Monthly Plan</p>
                  <p className="text-slate-500 text-[11px]">Best for starting shops</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-950 text-sm font-mono">₦5,000</p>
                  <p className="text-[10px] text-slate-400">Monthly auto-renewal</p>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900">Quarterly Plan</p>
                  <p className="text-slate-500 text-[11px]">Best for growing businesses</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-950 text-sm font-mono">₦12,550</p>
                  <p className="text-[10px] text-[#0052CC] font-bold">Save 16% on auto-renewal</p>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-slate-900 flex items-center gap-1">
                    <span>Yearly Plan</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded font-black font-sans uppercase">Best Value</span>
                  </p>
                  <p className="text-slate-500 text-[11px]">Best for multi-branch operators</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-950 text-sm font-mono">₦42,000</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Save 30% on auto-renewal</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-[10px] text-[#0052CC] font-medium leading-relaxed">
              💡 <strong>Auto-Renewal Promise:</strong> All subscriptions default to auto-pay cycle using bank-grade cards. Deactivate anytime instantly with one-tap inside the Merchant App.
            </div>

            <button
              onClick={() => onNavigateToTab("simulator")}
              className="w-full bg-[#0A2540] hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-center text-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Mobile Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-16 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Stop cash leakages. Lock down your profits.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Join thousands of absentee business owners in Nigeria and across West Africa who trust Corner Streams Business to protect their hard-earned capital.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => {
                alert("Corner Streams Business iOS App installation package 'cbs_production.ipa' downloaded!");
              }}
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all hover:scale-105 active:scale-95"
            >
               iOS Download
            </button>
            <button
              onClick={() => {
                alert("Corner Streams Business Android APK package 'cbs_production.apk' downloaded!");
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all hover:scale-105 active:scale-95"
            >
              🤖 Android Download
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
