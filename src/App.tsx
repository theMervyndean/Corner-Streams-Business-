import React, { useState } from "react";
import { Sparkles, Terminal, ShieldCheck, Smartphone, Cpu, ShieldCheckIcon, ShieldAlert, Globe, Layers, Eye, X } from "lucide-react";
import PhoneSimulator from "./components/PhoneSimulator";
import FlutterCodeViewer from "./components/FlutterCodeViewer";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import LandingPage from "./components/LandingPage";
import { ShopOwner, Product, StaffAccount, ActivityLog } from "./types";

// SEEDED INITIAL SHOP OWNER RECORDS (RESTORED / MOCK DATA WAREHOUSE)
const SEEDED_SHOPS: ShopOwner[] = [
  {
    id: "owner_adewale",
    businessName: "Adewale Provisions & Mini-Mart",
    ownerName: "Adewale Ibrahim",
    email: "adewale@mart.ng",
    phoneNumber: "+234 803 111 2222",
    password: "password123",
    nin: "12345678901",
    ninVerifiedName: "Adewale Ibrahim",
    ninLookupStatus: "verified",
    goodsType: "provisions",
    selectedPlan: "yearly",
    cardNumber: "4242 4242 4242 1122",
    expiry: "12/28",
    cvv: "321",
    activePlanType: "yearly",
    dateRegistered: "2026-06-12",
    status: "active",
    cumulativeRevenue: 185500,
    products: [
      { id: "prod1", productName: "Indomie Super Pack", costPrice: 5200, sellingPrice: 6000, currentStock: 18, category: "Snacks", minStockLevel: 5 },
      { id: "prod2", productName: "Golden Penny Pasta", costPrice: 4100, sellingPrice: 4800, currentStock: 4, category: "Snacks", minStockLevel: 5 },
      { id: "prod3", productName: "Peak Milk Refill 400g", costPrice: 2850, sellingPrice: 3200, currentStock: 3, category: "Beverages", minStockLevel: 5 },
      { id: "prod4", productName: "Gala Super Sausage", costPrice: 150, sellingPrice: 200, currentStock: 45, category: "Snacks", minStockLevel: 10 },
    ],
    staff: [
      { username: "staff_chinelo", password: "password123", dateAdded: "2026-06-18", salesToday: 15400, ordersCount: 5, isOnline: true, permissions: "Counter Sales Only" },
      { username: "staff_obi", password: "safe_pass_44", dateAdded: "2026-06-19", salesToday: 24800, ordersCount: 9, isOnline: false, permissions: "Counter & Inventory" }
    ],
    activities: [
      { id: "act_init_1", timestamp: "09:12:45 AM", type: "Login", description: "Owner Adewale logged in on Android terminal." },
      { id: "act_init_2", timestamp: "08:33:12 AM", type: "Staff", description: "Staff account 'staff_chinelo' checked-in." },
      { id: "act_init_3", timestamp: "08:15:00 AM", type: "Register", description: "Business compliance catalog verified." }
    ],
    debtors: [
      { id: "deb1", customerName: "Abiodun Kola", phoneNumber: "+2348031122334", amountOwed: 8500, dateAdded: "2026-06-25", dueDate: "2026-07-10", status: "unpaid" },
      { id: "deb2", customerName: "Mama Ngozi", phoneNumber: "+2348122334455", amountOwed: 14500, dateAdded: "2026-06-28", dueDate: "2026-07-05", status: "partially_paid" }
    ],
    shifts: [
      { id: "sh1", date: "2026-06-30", staffUsername: "staff_chinelo", expectedCash: 35000, actualCash: 34800, difference: -200, remarks: "Shortage of ₦200 due to change scarcity", timestamp: "18:05" }
    ],
    branches: [
      { id: "br1", name: "Ikeja Main Shop", location: "Computer Village, Ikeja", manager: "staff_chinelo" },
      { id: "br2", name: "Alaba Outlet", location: "Alaba Int'l Market, Ojo", manager: "staff_obi" }
    ],
    offlineSalesQueue: [],
    salesReceipts: [
      {
        id: "rcpt_ade_1",
        receiptNumber: "CSB-ADE-2026-001",
        timestamp: "2026-07-02 09:32 AM",
        operator: "staff_chinelo",
        items: [
          { productName: "Indomie Super Pack", price: 6000, quantity: 2, total: 12000 },
          { productName: "Gala Super Sausage", price: 200, quantity: 17, total: 3400 }
        ],
        totalAmount: 15400,
        paymentMethod: "Cash",
        status: "verified"
      },
      {
        id: "rcpt_ade_2",
        receiptNumber: "CSB-ADE-2026-002",
        timestamp: "2026-07-02 10:15 AM",
        operator: "staff_obi",
        items: [
          { productName: "Golden Penny Pasta", price: 4800, quantity: 5, total: 24000 },
          { productName: "Gala Super Sausage", price: 200, quantity: 4, total: 800 }
        ],
        totalAmount: 24800,
        paymentMethod: "POS Card",
        status: "verified"
      },
      {
        id: "rcpt_ade_3",
        receiptNumber: "CSB-ADE-2026-003",
        timestamp: "2026-07-01 04:50 PM",
        operator: "Owner Principal",
        items: [
          { productName: "Indomie Super Pack", price: 6000, quantity: 20, total: 120000 },
          { productName: "Peak Milk Refill 400g", price: 3200, quantity: 7, total: 22400 },
          { productName: "Gala Super Sausage", price: 200, quantity: 14, total: 2900 }
        ],
        totalAmount: 145300,
        paymentMethod: "Bank Transfer",
        status: "verified"
      }
    ],
    subscriptionPaused: false,
    subscriptionPauseSchedule: "none",
    subscriptionEndDate: "2026-07-28",
    isRegisteredYetToUpdate: false
  },
  {
    id: "owner_chinelo",
    businessName: "Chinelo Cosmetics & Beauty Shop",
    ownerName: "Chinelo Okeke",
    email: "chinelo@beauty.ng",
    phoneNumber: "+234 812 333 4444",
    password: "chinelo_beauty",
    nin: "98765432109",
    ninVerifiedName: "Chinelo Okeke",
    ninLookupStatus: "verified",
    goodsType: "cosmetics",
    selectedPlan: "monthly",
    cardNumber: "4242 4242 4242 8844",
    expiry: "09/27",
    cvv: "567",
    activePlanType: "monthly",
    dateRegistered: "2026-06-20",
    status: "active",
    cumulativeRevenue: 92000,
    products: [
      { id: "cosm1", productName: "Colgate MaxFresh", costPrice: 1200, sellingPrice: 1500, currentStock: 35, category: "Cosmetics & Pharmacy", minStockLevel: 5 },
      { id: "cosm2", productName: "Nivea Nourishing Cocoa Gel", costPrice: 2400, sellingPrice: 2800, currentStock: 12, category: "Cosmetics & Pharmacy", minStockLevel: 5 },
      { id: "cosm3", productName: "Vaseline Intensive Care", costPrice: 1800, sellingPrice: 2200, currentStock: 8, category: "Cosmetics & Pharmacy", minStockLevel: 5 }
    ],
    staff: [
      { username: "staff_ngozi", password: "ngozi_pass", dateAdded: "2026-06-21", salesToday: 92000, ordersCount: 15, isOnline: true, permissions: "Counter Sales Only" }
    ],
    activities: [
      { id: "act_cosm_1", timestamp: "11:24:00 AM", type: "Sale", description: "Ngozi completed bulk cosmetics sales total ₦18,500." },
      { id: "act_cosm_2", timestamp: "10:10:15 AM", type: "Inventory", description: "Colgate MaxFresh inventory replenished by owner." }
    ],
    debtors: [
      { id: "deb3", customerName: "Amina Bala", phoneNumber: "+2349051234567", amountOwed: 5200, dateAdded: "2026-06-29", dueDate: "2026-07-04", status: "unpaid" }
    ],
    shifts: [],
    branches: [
      { id: "br3", name: "Lekki Salon & Boutique", location: "Admiralty Way, Lekki", manager: "staff_ngozi" }
    ],
    offlineSalesQueue: [],
    salesReceipts: [
      {
        id: "rcpt_chi_1",
        receiptNumber: "CSB-CHI-2026-001",
        timestamp: "2026-07-02 08:44 AM",
        operator: "staff_ngozi",
        items: [
          { productName: "Nivea Nourishing Cocoa Gel", price: 2800, quantity: 20, total: 56000 },
          { productName: "Vaseline Intensive Care", price: 2200, quantity: 10, total: 22000 },
          { productName: "Colgate MaxFresh", price: 1500, quantity: 9, total: 14000 }
        ],
        totalAmount: 92000,
        paymentMethod: "Bank Transfer",
        status: "verified"
      }
    ],
    subscriptionPaused: false,
    subscriptionPauseSchedule: "none",
    subscriptionEndDate: "2026-07-06",
    isRegisteredYetToUpdate: false
  },
  {
    id: "owner_musa",
    businessName: "Danjuma Electronics Hub",
    ownerName: "Musa Danjuma",
    email: "musa@danjumatech.com",
    phoneNumber: "+234 905 555 6666",
    password: "musa_gadgets",
    nin: "45678912304",
    ninVerifiedName: "Musa Danjuma",
    ninLookupStatus: "error", // Unverified / Review Needed
    goodsType: "electronics",
    selectedPlan: "monthly",
    cardNumber: "4242 4242 4242 9900",
    expiry: "11/28",
    cvv: "111",
    activePlanType: "trial",
    dateRegistered: "2026-06-28",
    status: "suspended", // Demonstrates block status
    cumulativeRevenue: 0,
    products: [
      { id: "elec1", productName: "Oraimo Power Bank 20k", costPrice: 11000, sellingPrice: 13500, currentStock: 15, category: "Electronics & Gadgets", minStockLevel: 5 },
      { id: "elec2", productName: "Smart Bluetooth Speaker", costPrice: 8500, sellingPrice: 10500, currentStock: 6, category: "Electronics & Gadgets", minStockLevel: 5 }
    ],
    staff: [],
    activities: [
      { id: "act_musa_1", timestamp: "02:44:11 PM", type: "Admin", description: "Manual review flagged: NIN name mismatch. Terminals temporarily suspended by Super Admin." }
    ],
    debtors: [],
    shifts: [],
    branches: [],
    offlineSalesQueue: [],
    subscriptionPaused: false,
    subscriptionPauseSchedule: "none",
    subscriptionEndDate: "2026-07-03",
    isRegisteredYetToUpdate: false
  },
  {
    id: "owner_yet_to_update",
    businessName: "Bello Provisions Store (Pending Setup)",
    ownerName: "Bello Aliko",
    email: "bello@provisions.ng",
    phoneNumber: "+234 810 555 7777",
    password: "bello_provisions",
    nin: "",
    ninVerifiedName: "",
    ninLookupStatus: "idle",
    goodsType: "provisions",
    selectedPlan: "monthly",
    cardNumber: "",
    expiry: "",
    cvv: "",
    activePlanType: "trial",
    dateRegistered: "2026-07-01",
    status: "active",
    cumulativeRevenue: 0,
    products: [],
    staff: [],
    activities: [
      { id: "act_bello_1", timestamp: "09:00:00 AM", type: "Register", description: "Incomplete onboarding: registered but profile is pending compliance details." }
    ],
    debtors: [],
    shifts: [],
    branches: [],
    offlineSalesQueue: [],
    subscriptionPaused: false,
    subscriptionPauseSchedule: "none",
    subscriptionEndDate: "2026-07-05", // Ends in 3 days from local time 2026-07-02
    isRegisteredYetToUpdate: true
  }
];

export default function App() {
  // Global Shared States (Durable In-Memory DB)
  const [shopOwners, setShopOwners] = useState<ShopOwner[]>(SEEDED_SHOPS);
  const [activeShopId, setActiveShopId] = useState<string | null>(null);

  // Layout mode switcher state (Isolated production vs workspace)
  const [layoutMode, setLayoutMode] = useState<"workspace" | "website_only" | "app_only">(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m === "website") return "website_only";
    if (m === "app") return "app_only";
    return "workspace"; // default workspace sandbox view
  });
  const [showConfigDesk, setShowConfigDesk] = useState(false);

  // Desktop active workspace view
  const [activeTab, setActiveTab] = useState<"website" | "simulator" | "admin_dashboard">("website");

  // Custom callback from Landing Page to App simulator or admin tab
  const handleNavigateFromLanding = (tab: "simulator" | "admin_dashboard") => {
    if (layoutMode === "website_only") {
      if (tab === "simulator") {
        setLayoutMode("app_only");
      } else {
        alert("🔒 Admin Panel is locked in isolated Public Website mode. Use the Simulation Controls at the bottom corner to switch back to the Workspace Sandbox!");
      }
    } else {
      setActiveTab(tab);
    }
  };

  // Helper to copy simulation urls
  const handleCopyModePath = (path: string) => {
    const fullUrl = window.location.origin + path;
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        alert(`Copied simulation link to clipboard:\n${fullUrl}\n\nOpen this in another tab, in incognito, or on your smartphone to test!`);
      })
      .catch(() => {
        alert(`Simulation Link:\n${fullUrl}`);
      });
  };

  // Force trigger direct owner simulation in simulator pane
  const handleSimulateOwnerLogin = (email: string) => {
    const owner = shopOwners.find((o) => o.email.toLowerCase() === email.toLowerCase());
    if (owner) {
      if (owner.status === "suspended") {
        alert(`Cannot simulate login: "${owner.businessName}" is currently suspended! Unlock them first in the Control Panel.`);
        return;
      }
      setActiveShopId(owner.id);
      setActiveTab("simulator");
    }
  };

  // Render layout mode-based simulation control panel
  const renderFloatingConfigDesk = () => {
    return (
      <div className="fixed bottom-6 right-6 z-[9999] font-sans">
        {/* Main Floating Trigger Button */}
        {!showConfigDesk ? (
          <button
            onClick={() => setShowConfigDesk(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-950 text-white px-4 py-3 rounded-full shadow-2xl border border-slate-800 hover:scale-105 active:scale-95 transition-all"
            title="Open Simulation Control Desk"
          >
            <Layers className="h-4 w-4 text-blue-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase">Simulation Setup</span>
          </button>
        ) : (
          <div className="bg-slate-900 border border-slate-850 rounded-2xl shadow-2xl p-5 w-80 text-left space-y-4 text-white">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Simulation Control Desk</h4>
              </div>
              <button
                onClick={() => setShowConfigDesk(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <p className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider">Simulated Layout Mode</p>
              
              {/* Option 1: Full Dev Workspace */}
              <button
                onClick={() => {
                  setLayoutMode("workspace");
                  setShowConfigDesk(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                  layoutMode === "workspace"
                    ? "bg-blue-600/20 border-blue-500 text-blue-400 font-extrabold"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 font-medium"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">🛠️</span>
                  <div className="truncate">
                    <p className="text-[11px] leading-tight">Developer Sandbox Workspace</p>
                    <p className="text-[8.5px] text-slate-500 font-normal leading-tight mt-0.5">Landing, Simulator + Flutter Code</p>
                  </div>
                </div>
                {layoutMode === "workspace" && <span className="text-[8.5px] text-blue-400 font-black shrink-0 bg-blue-400/10 px-1.5 py-0.5 rounded ml-2">ACTIVE</span>}
              </button>

              {/* Option 2: Website Only */}
              <button
                onClick={() => {
                  setLayoutMode("website_only");
                  setShowConfigDesk(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                  layoutMode === "website_only"
                    ? "bg-emerald-600/20 border-emerald-500 text-emerald-400 font-extrabold"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 font-medium"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">🌐</span>
                  <div className="truncate">
                    <p className="text-[11px] leading-tight">Public Website (CornerStreams.com)</p>
                    <p className="text-[8.5px] text-slate-500 font-normal leading-tight mt-0.5">Isolated static landing page only</p>
                  </div>
                </div>
                {layoutMode === "website_only" && <span className="text-[8.5px] text-emerald-400 font-black shrink-0 bg-emerald-400/10 px-1.5 py-0.5 rounded ml-2">ACTIVE</span>}
              </button>

              {/* Option 3: App Only */}
              <button
                onClick={() => {
                  setLayoutMode("app_only");
                  setShowConfigDesk(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                  layoutMode === "app_only"
                    ? "bg-purple-600/20 border-purple-500 text-purple-400 font-extrabold"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 font-medium"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">📱</span>
                  <div className="truncate">
                    <p className="text-[11px] leading-tight">Standalone Mobile App Terminal</p>
                    <p className="text-[8.5px] text-slate-500 font-normal leading-tight mt-0.5">No headers, code views, or overrides</p>
                  </div>
                </div>
                {layoutMode === "app_only" && <span className="text-[8.5px] text-purple-400 font-black shrink-0 bg-purple-400/10 px-1.5 py-0.5 rounded ml-2">ACTIVE</span>}
              </button>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
                <span>⚡</span> Multi-Device Testing URL Tips
              </p>
              <p className="text-[9px] text-slate-400 leading-normal">
                To test standalone layouts on real mobile phones or separate browser tabs, append these modes to your address:
              </p>
              <div className="space-y-1 pt-1 text-[8.5px] font-mono text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 leading-relaxed">
                <div 
                  className="truncate hover:text-white cursor-pointer flex justify-between items-center" 
                  onClick={() => handleCopyModePath("/?mode=website")}
                  title="Copy Link"
                >
                  <span>🌐 Website URL</span>
                  <span className="text-blue-400 font-sans font-bold hover:underline">Copy 📋</span>
                </div>
                <div 
                  className="truncate hover:text-white cursor-pointer flex justify-between items-center" 
                  onClick={() => handleCopyModePath("/?mode=app")}
                  title="Copy Link"
                >
                  <span>📱 App Terminal URL</span>
                  <span className="text-purple-400 font-sans font-bold hover:underline">Copy 📋</span>
                </div>
                <div 
                  className="truncate hover:text-white cursor-pointer flex justify-between items-center" 
                  onClick={() => handleCopyModePath("/")}
                  title="Copy Link"
                >
                  <span>🛠️ Dev Sandbox URL</span>
                  <span className="text-slate-400 font-sans font-bold hover:underline">Copy 📋</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // RENDER SELECTION ACCORDING TO SIMULATED MODE
  if (layoutMode === "website_only") {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans select-none text-slate-700">
        <LandingPage onNavigateToTab={handleNavigateFromLanding} />
        {renderFloatingConfigDesk()}
      </div>
    );
  }

  if (layoutMode === "app_only") {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center font-sans select-none text-slate-700 p-4 relative overflow-hidden">
        {/* Futuristic glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#0052CC] opacity-10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500 opacity-[0.05] blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-[320px] flex flex-col items-center relative z-10">
          <div className="text-center mb-5 text-white">
            <h2 className="text-[10px] font-black font-sans tracking-widest text-slate-400 uppercase flex items-center justify-center gap-1.5">
              <Smartphone className="h-4 w-4 text-[#0052CC]" />
              <span>Corner Streams App Terminal</span>
            </h2>
            <p className="text-[8.5px] text-slate-500 font-mono mt-0.5">Standalone Device Simulator Mode</p>
          </div>

          <PhoneSimulator
            shopOwners={shopOwners}
            setShopOwners={setShopOwners}
            activeShopId={activeShopId}
            setActiveShopId={setActiveShopId}
          />
        </div>

        {renderFloatingConfigDesk()}
      </div>
    );
  }

  // DEFAULT WORKSPACE SANDBOX VIEW
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-slate-700">
      {/* Upper Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#0052CC] text-white p-2.5 rounded-xl shadow-sm flex items-center justify-center">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-slate-900 text-lg md:text-xl flex items-center gap-1.5 leading-none">
              <span>Corner Streams</span>
              <span className="text-[#0052CC] font-semibold">Business</span>
            </h1>
            <p className="text-xs text-slate-500 font-sans mt-1">
              "Monitor your shop from everywhere" — Live Full-Stack Interactive Suite
            </p>
          </div>
        </div>

        {/* Tab Selector - Switch between website, simulator, and administrative registry */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("website")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "website"
                ? "bg-white text-[#0052CC] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>🌐 CBS Website</span>
          </button>

          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "simulator"
                ? "bg-white text-[#0052CC] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>📱 Mobile App Simulator</span>
          </button>
          
          <button
            onClick={() => setActiveTab("admin_dashboard")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 relative ${
              activeTab === "admin_dashboard"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#00875A]" />
            <span>👑 CSB Super Admin Panel</span>
            {shopOwners.some((s) => s.status === "suspended" || s.ninLookupStatus === "error") && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </button>
        </div>

        {/* High Key Indicators */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E6F4EA] text-[#0F5132] border border-[#A3E2C9]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00875A]"></span>
            <span>Local DB Connected</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-[#0052CC] border border-blue-100">
            <span>Material 3 Ready</span>
          </span>
        </div>
      </header>

      {/* Main Content Workspace Layout */}
      {activeTab === "website" ? (
        <LandingPage onNavigateToTab={handleNavigateFromLanding} />
      ) : activeTab === "simulator" ? (
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: INTERACTIVE PHONE PREVIEW SIMULATION */}
          <section className="lg:col-span-5 xl:col-span-4 flex justify-center w-full z-10 shrink-0">
            <PhoneSimulator
              shopOwners={shopOwners}
              setShopOwners={setShopOwners}
              activeShopId={activeShopId}
              setActiveShopId={setActiveShopId}
            />
          </section>

          {/* RIGHT COLUMN: HIGH QUALITY DART MODULE CODE VIEWER */}
          <section className="lg:col-span-7 xl:col-span-8 flex flex-col h-full gap-6 w-full">
            
            {/* Welcome Dashboard Brand Info Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 space-y-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-[#0052CC]/10 p-3 rounded-2xl text-[#0052CC] shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-display font-bold text-slate-900 text-base md:text-lg flex items-center gap-2">
                    <span>Interactive Mobile App Terminal</span>
                    {activeShopId ? (
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-sans font-semibold">
                        Logged in: {shopOwners.find(o => o.id === activeShopId)?.businessName}
                      </span>
                    ) : (
                      <span className="text-[11px] bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-full font-sans font-semibold">
                        Ready for registration & login
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-xl">
                    Experience the complete merchant terminal! Register a new business with verified NINs, subscribe to premium billing tiers with active cards, record cash sales, register staff roles, or swap over to the <strong>CSB Super Admin Panel</strong> to manage suspended accounts, configure staff, and inject live revenues!
                  </p>
                </div>
              </div>

              {/* Quick Core highlights checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-semibold text-[#0A2540]">
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <Smartphone className="h-4 w-4 text-[#0052CC] shrink-0" />
                  <span>Interactive Sync Engine</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <ShieldCheck className="h-4 w-4 text-[#00875A] shrink-0" />
                  <span>Real-time Compliance Overrides</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <Terminal className="h-4 w-4 text-[#0052CC] shrink-0" />
                  <span>Automatic Sales Injection</span>
                </div>
              </div>
            </div>

            {/* Source Code Viewer panel */}
            <div className="flex-1">
              <FlutterCodeViewer />
            </div>
          </section>
        </main>
      ) : (
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <SuperAdminDashboard
            shopOwners={shopOwners}
            setShopOwners={setShopOwners}
            activeShopId={activeShopId}
            setActiveShopId={setActiveShopId}
            onSimulateOwnerLogin={handleSimulateOwnerLogin}
          />
        </main>
      )}

      {/* Applet Copyright Layout Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <span>© 2026 Corner Streams Business Ltd. All Rights Reserved.</span>
        <div className="flex items-center gap-4">
          <a
            href="https://flutter.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0052CC] transition-colors font-medium"
          >
            Flutter SDK
          </a>
          <span>•</span>
          <a
            href="https://material.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0A2540] transition-colors font-medium"
          >
            Material Design 3
          </a>
        </div>
      </footer>

      {renderFloatingConfigDesk()}
    </div>
  );
}
