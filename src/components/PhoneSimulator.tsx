import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  Battery,
  Signal,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Store,
  Eye,
  EyeOff,
  CheckCircle,
  HelpCircle,
  Smartphone,
  Sparkles,
  RefreshCw,
  Clock,
  Phone,
  ShoppingCart,
  PlusCircle,
  MinusCircle,
  AlertTriangle,
  QrCode,
  LogOut,
  Plus,
  Minus,
  Check,
  CreditCard,
  Briefcase,
  FileText,
  Download,
  Bell,
  Camera,
  Image as ImageIcon,
  ShieldAlert,
  Layers,
  ChevronRight,
  Crown,
  Users,
  MapPin,
  Activity,
  TrendingUp,
  Coins,
  Send,
  ShieldCheck,
  AlertCircle,
  Settings,
  Target,
  Sliders,
  Menu,
  X
} from "lucide-react";
import Logo from "./Logo";

// Import premium generated store assets
import onboardingBg from "../assets/images/onboarding_bg_1781724337804.jpg";
import registerBg from "../assets/images/register_bg_1781724354101.jpg";
import ownerMonitoringSales from "../assets/images/owner_monitoring_sales_while_traveling_1781725081139.jpg";
import ownerTravelingUnseen from "../assets/images/owner_traveling_unseen_screen_1781726488344.jpg";

const RetailShopFrontBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
    <svg className="w-full h-full opacity-[0.45]" viewBox="0 0 360 640" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="640" fill="#F8FAFC" />
      <rect x="0" y="480" width="360" height="160" fill="#E2E8F0" />
      <line x1="0" y1="480" x2="360" y2="480" stroke="#CBD5E1" strokeWidth="2" />
      
      {/* Brick building wall background texture */}
      <rect x="20" y="100" width="320" height="380" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2" rx="4" />
      <rect x="40" y="130" width="24" height="8" rx="1" fill="#E2E8F0" />
      <rect x="70" y="150" width="24" height="8" rx="1" fill="#E2E8F0" />
      <rect x="290" y="130" width="24" height="8" rx="1" fill="#E2E8F0" />
      <rect x="260" y="160" width="24" height="8" rx="1" fill="#E2E8F0" />
      
      {/* Retail front window */}
      <rect x="40" y="240" width="130" height="190" rx="8" fill="#FFFFFF" stroke="#0052CC" strokeWidth="2.5" />
      <line x1="105" y1="240" x2="105" y2="430" stroke="#0052CC" strokeWidth="1.5" />
      <line x1="40" y1="330" x2="170" y2="330" stroke="#0052CC" strokeWidth="1.5" />
      
      {/* Little shop items inside the window */}
      <circle cx="75" cy="290" r="10" fill="#00875A" fillOpacity="0.15" />
      <circle cx="135" cy="290" r="10" fill="#0052CC" fillOpacity="0.15" />
      
      {/* Entrance Door */}
      <rect x="190" y="240" width="110" height="240" rx="4" fill="#FFFFFF" stroke="#0A2540" strokeWidth="3" />
      <rect x="200" y="255" width="90" height="110" rx="2" fill="#E2E8F0" fillOpacity="0.3" stroke="#0A2540" strokeWidth="1.5" />
      <rect x="200" y="375" width="8" height="24" rx="2" fill="#0A2540" />
      
      {/* Shop Awning stripes */}
      <path d="M15 210 L345 210 L330 240 L30 240 Z" fill="#0A2540" />
      <path d="M45 210 L75 210 L65 240 L35 240 Z" fill="#0052CC" />
      <path d="M105 210 L135 210 L125 240 L95 240 Z" fill="#0052CC" />
      <path d="M165 210 L195 210 L185 240 L155 240 Z" fill="#0052CC" />
      <path d="M225 210 L255 210 L245 240 L215 240 Z" fill="#0052CC" />
      <path d="M285 210 L315 210 L305 240 L275 240 Z" fill="#0052CC" />
      
      {/* Welcome logo/sign above awning */}
      <rect x="80" y="140" width="200" height="45" rx="6" fill="#0A2540" stroke="#0052CC" strokeWidth="3" />
      <text x="180" y="168" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5">CORNER STREAMS</text>
    </svg>
    {/* White tint overlay mixed over keeping text fully readable */}
    <div className="absolute inset-0 bg-white/88 backdrop-blur-[1px] z-10" />
  </div>
);

// Shop Category templates and realistic Nigerian suggestions
const GOODS_TYPES = [
  { id: "provisions", name: "Provisions & Groceries", icon: "🛒", suggestions: ["Golden Penny Pasta", "Peak Milk Refill 400g", "Milo Chocolate Tin", "Indomie Onion Flavor", "Gala Super Sausage", "Sardine Queen Brand"] },
  { id: "fashion", name: "Fashion & Clothing", icon: "👕", suggestions: ["Ankara Luxury Lace Fabric", "Senator Wear Custom White", "Designer Cotton T-Shirt", "Classic Blue Denim Jeans", "Casual Leather Loafers", "Smart Wrist Watch Silver"] },
  { id: "cosmetics", name: "Cosmetics & Pharmacy", icon: "🧴", suggestions: ["Colgate MaxFresh", "Nivea Nourishing Cocoa Gel", "Dettol Liquid Antiseptic", "Vaseline Intensive Care", "Nyal Paracetamol Extra", "Hand Sanitizer Pocket Spray"] },
  { id: "electronics", name: "Electronics & Gadgets", icon: "🔌", suggestions: ["Samsung Fast Charger Plug", "Sony Wireless Earbuds", "Oraimo Power Bank 20k", "Rechargeable LED Fan AC/DC", "Extension Plug Board 4Way", "Smart Bluetooth Speaker"] },
  { id: "beverages", name: "Wines & Beverages", icon: "🍷", suggestions: ["Eva Premium Bottled Water", "Chi Exotic Pineapple Fruit", "Coca-Cola Classic Can", "Power Horse Energy Drink", "St. Remy Brandy Wine", "Nescafe Instant Coffee 100g"] }
];

import { Product, StaffAccount, ActivityLog, ShopOwner } from "../types";

// Lightweight multi-step tour-tip guide definition for registration fields
const REG_TOUR_STEPS = [
  {
    target: "business-name",
    title: "🏪 Step 1: Business Name",
    desc: "Give your shop an identity. When you type here, Corner Streams configures your database ledger template dynamically.",
    field: "regBusinessName",
    autoFillVal: "Alaba Electronics Store",
  },
  {
    target: "owner-name",
    title: "👤 Step 2: Owner Full Name",
    desc: "Enter your legal name. This aligns with official KYC records for Nigerian retail store audits.",
    field: "regOwnerName",
    autoFillVal: "Chinedu Eze",
  },
  {
    target: "whatsapp-number",
    title: "💬 Step 3: WhatsApp Number",
    desc: "Crucial element. Corner Streams automatically forwards instant digital receipts and alerts to customers via WhatsApp!",
    field: "regPhoneNumber",
    autoFillVal: "+234 803 123 4567",
  },
  {
    target: "nin",
    title: "🇳🇬 Step 4: NIMC National ID (NIN)",
    desc: "Direct verification lookup with the NIMC Identity Database is simulated here to verify your identity and eliminate retail fraud.",
    field: "regNin",
    autoFillVal: "12345678901",
  },
  {
    target: "email",
    title: "📧 Step 5: Principal Email",
    desc: "Your master credentials. As the principal owner, you hold super-user root clearance across all staff terminal instances.",
    field: "regEmail",
    autoFillVal: "chinedu.eze@alaba.com",
  },
  {
    target: "password",
    title: "🔑 Step 6: Resilient Password",
    desc: "Set up a highly secure master password to encrypt access to your owner dashboard and offline sales logs.",
    field: "regPassword",
    autoFillVal: "CornerStreams2026",
  },
  {
    target: "goods-type",
    title: "📦 Step 7: Preset Goods Template",
    desc: "Pick your standard retail domain (e.g. Provisions, Electronics). Corner Streams pre-loads realistic inventory templates to jump-start your catalog!",
    field: "regGoodsType",
    autoFillVal: "electronics",
  },
  {
    target: "submit-signup",
    title: "🚀 Step 8: Verify & Run Simulation!",
    desc: "All set! When you click submit, we will simulate dispatching a secure 6-digit OTP code to your WhatsApp to activate your terminal.",
    field: "",
    autoFillVal: "",
  }
];

interface PhoneSimulatorProps {
  shopOwners?: ShopOwner[];
  setShopOwners?: React.Dispatch<React.SetStateAction<ShopOwner[]>>;
  activeShopId?: string | null;
  setActiveShopId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PhoneSimulator({
  shopOwners = [],
  setShopOwners,
  activeShopId = null,
  setActiveShopId,
}: PhoneSimulatorProps) {
  const [currentScreen, setCurrentScreen] = useState<
    "welcome" | "login" | "register" | "whatsapp_verification" | "terms" | "subscription_gateway" | "dashboard"
  >("welcome");
  const [timeStr, setTimeStr] = useState("12:24");

  // Lightweight walkthrough tour state
  const [tourStep, setTourStep] = useState<number>(-1); // -1 = inactive, 0 to 7 = active step

  // Keep digital time updated representing system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hrs = now.getHours();
      let mins = now.getMinutes();
      const hrsStr = hrs < 10 ? `0${hrs}` : `${hrs}`;
      const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
      setTimeStr(`${hrsStr}:${minsStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset tour state if navigating away from registration screen
  useEffect(() => {
    if (currentScreen !== "register") {
      setTourStep(-1);
    }
  }, [currentScreen]);

  // Shared state values for Toast/Alert indicators
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Walkthrough Tour Action Handlers
  const handleNextTourStep = () => {
    if (tourStep >= 0 && tourStep < REG_TOUR_STEPS.length) {
      const step = REG_TOUR_STEPS[tourStep];
      // Auto-fill field if empty to keep the tour flowing seamlessly
      if (step.field) {
        if (step.field === "regBusinessName" && !regBusinessName) setRegBusinessName(step.autoFillVal);
        if (step.field === "regOwnerName" && !regOwnerName) setRegOwnerName(step.autoFillVal);
        if (step.field === "regPhoneNumber" && !regPhoneNumber) setRegPhoneNumber(step.autoFillVal);
        if (step.field === "regNin" && !regNin) {
          setRegNin(step.autoFillVal);
          setNinLookupStatus("verified");
          setNinVerifiedName("CHINEDU EZE");
        }
        if (step.field === "regEmail" && !regEmail) setRegEmail(step.autoFillVal);
        if (step.field === "regPassword" && !regPassword) {
          setRegPassword(step.autoFillVal);
          setRegConfirmPassword(step.autoFillVal);
        }
        if (step.field === "regGoodsType" && !regGoodsType) setRegGoodsType(step.autoFillVal);
      }
    }
    
    if (tourStep < REG_TOUR_STEPS.length - 1) {
      setTourStep(prev => prev + 1);
    } else {
      setTourStep(-1);
      showToast("Walkthrough finished! Tap 'Verify WhatsApp Number' to complete sign-up.", "success");
    }
  };

  const handleAutoFillAllTour = () => {
    setRegBusinessName("Alaba Electronics Store");
    setRegOwnerName("Chinedu Eze");
    setRegPhoneNumber("+234 803 123 4567");
    setRegNin("12345678901");
    setNinLookupStatus("verified");
    setNinVerifiedName("CHINEDU EZE");
    setRegEmail("chinedu.eze@alaba.com");
    setRegPassword("CornerStreams2026");
    setRegConfirmPassword("CornerStreams2026");
    setRegGoodsType("electronics");
    setTourStep(7); // Jump straight to the submit step
    showToast("⚡ All fields auto-filled with realistic tester credentials!", "success");
  };

  // ===================================================
  // STORE DATABASE ENGINE STATE (MOCKED)
  // ===================================================
  const [products, setProducts] = useState<Product[]>([
    { id: "prod1", productName: "Indomie Super Pack", costPrice: 5200, sellingPrice: 6000, currentStock: 18, category: "Snacks" },
    { id: "prod2", productName: "Golden Penny Pasta", costPrice: 4100, sellingPrice: 4800, currentStock: 4, category: "Snacks" }, // Low Stock!
    { id: "prod3", productName: "Peak Milk Refill 400g", costPrice: 2850, sellingPrice: 3200, currentStock: 3, category: "Beverages" }, // Low Stock!
    { id: "prod4", productName: "Gala Super Sausage", costPrice: 150, sellingPrice: 200, currentStock: 45, category: "Snacks" },
    { id: "prod5", productName: "Ankara Luxury Lace Fabric", costPrice: 14000, sellingPrice: 18000, currentStock: 12, category: "Fabrics" },
    { id: "prod6", productName: "Samsung Fast Charge Plug", costPrice: 3200, sellingPrice: 4800, currentStock: 9, category: "Electronics" },
  ]);

  // Active basket quantities mapping { [productId]: quantity }
  const [basketQuantities, setBasketQuantities] = useState<{ [key: string]: number }>({});
  const [selectedPayment, setSelectedPayment] = useState<"Cash" | "Bank Transfer" | "POS Card">("Cash");
  const [dashboardTab, setDashboardTab] = useState<"counter" | "add_product" | "low_stock" | "reports" | "owner_console" | "settings">("owner_console");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [lastTxnTotal, setLastTxnTotal] = useState(0);

  // New advanced features interactive state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userRole, setUserRole] = useState<"owner" | "staff">("owner");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [newProdCategory, setNewProdCategory] = useState("Snacks");

  // Manual Staff Accounts Registry (not self-registered by staff)
  const [staffAccounts, setStaffAccounts] = useState<Array<{username: string; password: string; dateAdded: string; salesToday?: number; ordersCount?: number; isOnline?: boolean; permissions?: string}>>([
    { username: "staff_chinelo", password: "password123", dateAdded: "2026-06-18", salesToday: 15400, ordersCount: 5, isOnline: true, permissions: "Counter Sales Only" },
    { username: "staff_obi", password: "safe_pass_44", dateAdded: "2026-06-19", salesToday: 24800, ordersCount: 9, isOnline: false, permissions: "Counter & Inventory" } 
  ]);
  const [showManageStaffOverlay, setShowManageStaffOverlay] = useState(false);
  const [newStaffUsername, setNewStaffUsername] = useState("");
  const [newStaffPassword, setNewStaffPassword] = useState("");
  const [newStaffPermissions, setNewStaffPermissions] = useState("Counter Sales Only");
  const [staffErrors, setStaffErrors] = useState<{username?: string; password?: string}>({});

  // Interactive Live Analytics & Subscriptions
  const [activeAnalyticsSubTab, setActiveAnalyticsSubTab] = useState<"analytics" | "archives" | "receipts">("analytics");
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [receiptSearchQuery, setReceiptSearchQuery] = useState("");
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [showSubscriptionDetailsSheet, setShowSubscriptionDetailsSheet] = useState(false);

  // NIMC NIN verification
  const [ninLookupStatus, setNinLookupStatus] = useState<"idle" | "searching" | "verified" | "error">("idle");
  const [ninVerifiedName, setNinVerifiedName] = useState("");

  // ===================================================
  // LOCALIZED NIGERIAN RETAIL ENHANCEMENTS STATES
  // ===================================================
  const [activeCurrency, setActiveCurrency] = useState<"NGN" | "USD" | "USDT">("NGN");
  const FX_RATES = { USD: 1550, USDT: 1560 };

  const [debtors, setDebtors] = useState<any[]>([]);
  const [showDebtorsOverlay, setShowDebtorsOverlay] = useState(false);
  const [newDebtorName, setNewDebtorName] = useState("");
  const [newDebtorPhone, setNewDebtorPhone] = useState("");
  const [newDebtorAmount, setNewDebtorAmount] = useState("");
  const [newDebtorDue, setNewDebtorDue] = useState("");

  const [branches, setBranches] = useState<any[]>([]);
  const [showBranchesOverlay, setShowBranchesOverlay] = useState(false);
  const [newBranchName, setNewBranchName] = useState("");
  const [newBranchLocation, setNewBranchLocation] = useState("");
  const [newBranchManager, setNewBranchManager] = useState("");

  const [shifts, setShifts] = useState<any[]>([]);
  const [showShiftOverlay, setShowShiftOverlay] = useState(false);
  const [shiftActualCash, setShiftActualCash] = useState("");
  const [shiftRemarks, setShiftRemarks] = useState("");

  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [offlineSalesQueue, setOfflineSalesQueue] = useState<any[]>([]);

  // ===================================================
  // ABSENTEE OWNER & LEAKAGE PREVENTION STATES
  // ===================================================
  const [showLeakageOverlay, setShowLeakageOverlay] = useState(false);
  const [allowManualDiscounts, setAllowManualDiscounts] = useState(false);
  const [allowStockEdits, setAllowStockEdits] = useState(false);
  const [allowRefunds, setAllowRefunds] = useState(false);
  const [terminalFrozen, setTerminalFrozen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([
    { id: "aud_1", timestamp: "09:41 AM", type: "Security", description: "Terminal passcode verification activated on Android node 1" },
    { id: "aud_2", timestamp: "09:12 AM", type: "Stock Control", description: "Stock level warning threshold set to 5 units by Principal Owner" },
    { id: "aud_3", timestamp: "08:33 AM", type: "Staff check-in", description: "staff_chinelo authenticated. Safe drawer verification logged at ₦35,000" }
  ]);

  // CBS v2.4 Brand New Features States
  const [isAutoRenewEnabled, setIsAutoRenewEnabled] = useState(true);
  const [showWhatsappOverlay, setShowWhatsappOverlay] = useState(false);
  const [isWhatsappSyncEnabled, setIsWhatsappSyncEnabled] = useState(true);
  const [whatsappTemplate, setWhatsappTemplate] = useState("Hi {name}, thank you for shopping at {business}! Here is your digital receipt for {amount}: {link} 🍏");
  const [isWhatsappConnecting, setIsWhatsappConnecting] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(true);
  const [isSyncingReceipts, setIsSyncingReceipts] = useState(false);
  const [reportStartDate, setReportStartDate] = useState("2026-06-25");
  const [reportEndDate, setReportEndDate] = useState("2026-07-02");
  const [auditLogsSearch, setAuditLogsSearch] = useState("");
  const [auditLogsFilter, setAuditLogsFilter] = useState("All");
  const [showAuditLogsOverlay, setShowAuditLogsOverlay] = useState(false);

  // Corner Streams Business v2.5 State Additions
  const [lowStockThreshold, setLowStockThreshold] = useState<number>(5);
  const [salesGoalDaily, setSalesGoalDaily] = useState<number>(150000);
  const [salesGoalMonthly, setSalesGoalMonthly] = useState<number>(2000000);
  const [pdfReportType, setPdfReportType] = useState<"daily" | "weekly" | "monthly" | "quarterly" | "yearly">("daily");

  // Forgot Password 2-Step Verification States
  const [forgotStep, setForgotStep] = useState<number>(1);
  const [forgotPhoneInput, setForgotPhoneInput] = useState<string>("");
  const [forgotOTPCode, setForgotOTPCode] = useState<string>("");
  const [forgotOTPEmulate, setForgotOTPEmulate] = useState<string>("");
  const [forgotNewPassword, setForgotNewPassword] = useState<string>("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState<string>("");
  const [forgotSelectedShopOwnerId, setForgotSelectedShopOwnerId] = useState<string | null>(null);

  // Settings password states
  const [settingsNewPassword, setSettingsNewPassword] = useState("");
  const [settingsConfirmPassword, setSettingsConfirmPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // QR Code Verification States
  const [qrNotifications, setQrNotifications] = useState<any[]>([
    {
      id: "qr_seed_1",
      type: "delivery",
      title: "Stock Delivery: Abuja Textile Hub",
      details: "Incoming delivery: 25x bundles of Luxury Ankara Print (₦220,000 value). Supplier: Alhaji Danladi Textiles. Cryptographically signed and verified.",
      staff: "staff_chinelo",
      timestamp: "10:34 AM",
      date: "2026-07-02",
      amount: "₦220,000",
      status: "verified"
    },
    {
      id: "qr_seed_2",
      type: "payment",
      title: "POS Checkout: Emeka N.",
      details: "Customer purchase: 4x units Lace Material (₦78,000 value). Authorized via terminal POS API-82.",
      staff: "staff_chinelo",
      timestamp: "02:15 PM",
      date: "2026-07-02",
      amount: "₦78,000",
      status: "verified"
    }
  ]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<"idle" | "scanning" | "result">("idle");
  const [scannedResult, setScannedResult] = useState<any>({
    id: "preset_del_1",
    type: "delivery",
    title: "BUA Flour (50 bags)",
    details: "Incoming delivery: 50x bags of BUA Premium Flour (Naira 450,000 value). Supplier: BUA Group. Confirmed by staff signature.",
    amount: "₦450,000",
    label: "📦 BUA Delivery"
  });

  // Format dynamic currency based on exchange rate
  const formatValue = (nairaAmt: number) => {
    if (activeCurrency === "USD") {
      return `$${(nairaAmt / FX_RATES.USD).toFixed(2)}`;
    }
    if (activeCurrency === "USDT") {
      return `${(nairaAmt / FX_RATES.USDT).toFixed(2)} USDT`;
    }
    return `₦${nairaAmt.toLocaleString()}`;
  };

  // Reusable receipts list module for both staff and admin
  const renderReceiptsListModule = () => {
    const activeShop = shopOwners.find((o) => o.id === activeShopId);
    const receipts = activeShop?.salesReceipts || [];
    
    const filteredReceipts = receipts.filter(rcpt => 
      rcpt.receiptNumber.toLowerCase().includes(receiptSearchQuery.toLowerCase()) ||
      rcpt.paymentMethod.toLowerCase().includes(receiptSearchQuery.toLowerCase()) ||
      rcpt.operator.toLowerCase().includes(receiptSearchQuery.toLowerCase())
    );

    return (
      <div className="space-y-3 flex-1 flex flex-col text-left">
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/65">
          <p className="text-[10px] text-[#0A2540] font-black uppercase tracking-wider flex items-center gap-1">
            <span>🛡️ ABSENTEE CONTROL AUDIT LOCK</span>
          </p>
          <p className="text-[8.5px] text-slate-500 mt-0.5 leading-relaxed">
            All cashier receipts sync to the owner's dashboard in real-time. Staff cannot delete, bypass, or alter transactions without flagging audit control triggers.
          </p>
        </div>

        {/* Search */}
        <div className="relative shrink-0">
          <input
            type="text"
            value={receiptSearchQuery}
            onChange={(e) => setReceiptSearchQuery(e.target.value)}
            placeholder="Search by receipt number, method, staff..."
            className="w-full bg-white text-[10.5px] text-[#0A2540] border border-slate-200 pl-8 pr-3 py-2 rounded-xl outline-none focus:border-[#0052CC]"
          />
          <span className="absolute left-2.5 top-2.5 text-slate-400 text-[11px]">🔍</span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[300px]">
          {filteredReceipts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-[10px] italic">
              No sales receipts found. Completed checkouts will record automatically.
            </div>
          ) : (
            filteredReceipts.map((rcpt) => (
              <div
                key={rcpt.id}
                onClick={() => setSelectedReceipt(rcpt)}
                className="bg-white border border-slate-150 rounded-xl p-3 hover:border-[#0052CC] cursor-pointer transition-all hover:shadow-xs active:scale-98 flex items-center justify-between gap-2 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black text-[#0A2540] font-mono leading-none">{rcpt.receiptNumber}</p>
                  <p className="text-[8px] text-slate-400 mt-1">
                    {rcpt.timestamp} • By <strong className="text-[#0A2540]">{rcpt.operator}</strong>
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[8.5px] text-slate-500 font-sans font-bold">
                      {rcpt.items?.length || 0} items
                    </span>
                    <span className="text-[8.5px] text-slate-400">•</span>
                    <span className="text-[8.5px] bg-[#0052CC]/10 text-[#0052CC] font-bold px-1.5 py-0.2 rounded uppercase font-mono">
                      {rcpt.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-[#00875A] font-mono">₦{rcpt.totalAmount.toLocaleString()}</p>
                  <span className="text-[8px] bg-[#00875A]/10 text-[#00875A] px-1 py-0.2 rounded font-black uppercase">
                    Verified
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Helper to sync local changes to master database
  const syncLocalChangesToMaster = (updates: any) => {
    if (activeShopId && setShopOwners) {
      setShopOwners((prev) =>
        prev.map((o) => {
          if (o.id === activeShopId) {
            return {
              ...o,
              ...updates,
            };
          }
          return o;
        })
      );
    }
  };

  // ===================================================
  // STATE & VALIDATION FOR REGISTRATION FORM
  // ===================================================
  const [regBusinessName, setRegBusinessName] = useState("");
  const [regOwnerName, setRegOwnerName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhoneNumber, setRegPhoneNumber] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regNin, setRegNin] = useState("");
  const [regGoodsType, setRegGoodsType] = useState("provisions");
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([
    "Golden Penny Pasta", "Peak Milk Refill 400g", "Milo Chocolate Tin", "Indomie Onion Flavor"
  ]);
  const [otherSuggestions, setOtherSuggestions] = useState<string[]>([]);
  const [otherSuggestionInput, setOtherSuggestionInput] = useState("");

  // Subscription parameters and gate simulator
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [subCardNumber, setSubCardNumber] = useState("");
  const [subExpiry, setSubExpiry] = useState("");
  const [subCvv, setSubCvv] = useState("");
  const [isActivatingSub, setIsActivatingSub] = useState(false);
  const [hasPaidSubscription, setHasPaidSubscription] = useState(false);
  const [subscriptionGraceDays, setSubscriptionGraceDays] = useState(7); // 1-week/7 days free trial
  const [activePlanType, setActivePlanType] = useState<"trial" | "monthly" | "quarterly" | "yearly">("trial");

  // Sync state with Admin Console (pull changes like suspension, product modifications, and staff updates)
  useEffect(() => {
    if (activeShopId && shopOwners && shopOwners.length > 0) {
      const activeOwner = shopOwners.find(o => o.id === activeShopId);
      if (activeOwner) {
        if (activeOwner.status === "suspended") {
          setCurrentScreen("login");
          setUserRole("owner");
          if (setActiveShopId) setActiveShopId(null);
          showToast("Access Denied: Your business account has been suspended by CSB Admin Support.", "error");
        } else {
          // Reactively transition screen if a session is active and not on dashboard
          if (currentScreen !== "dashboard") {
            setCurrentScreen("dashboard");
            setUserRole("owner");
            setDashboardTab("owner_console");
            showToast(`Session Synced: ${activeOwner.ownerName} Console 👑`, "success");
          }

          const isProdDiff = JSON.stringify(activeOwner.products) !== JSON.stringify(products);
          const isStaffDiff = JSON.stringify(activeOwner.staff) !== JSON.stringify(staffAccounts);
          
          if (isProdDiff) setProducts(activeOwner.products);
          if (isStaffDiff) setStaffAccounts(activeOwner.staff);

          // Localized extensions sync
          const isDebDiff = JSON.stringify(activeOwner.debtors || []) !== JSON.stringify(debtors);
          const isBrDiff = JSON.stringify(activeOwner.branches || []) !== JSON.stringify(branches);
          const isShDiff = JSON.stringify(activeOwner.shifts || []) !== JSON.stringify(shifts);
          const isOfflineDiff = JSON.stringify(activeOwner.offlineSalesQueue || []) !== JSON.stringify(offlineSalesQueue);

          if (isDebDiff) setDebtors(activeOwner.debtors || []);
          if (isBrDiff) setBranches(activeOwner.branches || []);
          if (isShDiff) setShifts(activeOwner.shifts || []);
          if (isOfflineDiff) setOfflineSalesQueue(activeOwner.offlineSalesQueue || []);
          
          if (activeOwner.activePlanType !== activePlanType) setActivePlanType(activeOwner.activePlanType);
          if (activeOwner.selectedPlan !== selectedPlan) setSelectedPlan(activeOwner.selectedPlan);
          if (activeOwner.cardNumber !== subCardNumber) setSubCardNumber(activeOwner.cardNumber);
        }
      }
    }
  }, [shopOwners, activeShopId]);

  // Sync selected suggestions when selected shop Goods Type moves
  useEffect(() => {
    const matched = GOODS_TYPES.find(gt => gt.id === regGoodsType);
    if (matched) {
      // Pre-check the standard suggestions for that category initially
      setSelectedSuggestions([...matched.suggestions]);
      setOtherSuggestions([]);
    }
  }, [regGoodsType]);

  // Automated NIMC NIN Database Security Lookup
  useEffect(() => {
    if (regNin.length === 11) {
      setNinLookupStatus("searching");
      const timer = setTimeout(() => {
        const nameToUse = regOwnerName ? regOwnerName.trim() : "Adewale Ibrahim";
        setNinVerifiedName(nameToUse);
        setNinLookupStatus("verified");
        showToast(`NIN Security Match: verified for ${nameToUse}!`, "success");
      }, 1400);
      return () => clearTimeout(timer);
    } else {
      setNinLookupStatus("idle");
      setNinVerifiedName("");
    }
  }, [regNin, regOwnerName]);

  // WhatsApp OTP Verification state
  const [whatsappCode, setWhatsappCode] = useState("");
  const [enteredCode, setEnteredCode] = useState(["", "", "", "", "", ""]);
  const [showNotification, setShowNotification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // ===================================================
  // STATE & VALIDATION FOR ADD NEW PRODUCT FORM
  // ===================================================
  const [newProdName, setNewProdName] = useState("");
  const [newCostPrice, setNewCostPrice] = useState("");
  const [newSellingPrice, setNewSellingPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newProdErrors, setNewProdErrors] = useState<{ [key: string]: string }>({});

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!regBusinessName.trim()) {
      errors.businessName = "Please enter business name";
    } else if (regBusinessName.trim().length < 3) {
      errors.businessName = "Should be at least 3 characters";
    }

    if (!regOwnerName.trim()) {
      errors.ownerName = "Please enter owner name";
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!regEmail.trim()) {
      errors.email = "Please enter email address";
    } else if (!emailRegex.test(regEmail.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!regPhoneNumber.trim()) {
      errors.phoneNumber = "Please enter WhatsApp phone number";
    } else if (regPhoneNumber.trim().length < 8) {
      errors.phoneNumber = "Please enter a valid phone number (at least 8 digits)";
    }

    if (!regPassword) {
      errors.password = "Please enter password";
    } else if (regPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!regConfirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!regNin.trim()) {
      errors.nin = "Please enter 11-digit NIN (National Identity Number)";
    } else if (!/^\d{11}$/.test(regNin.trim())) {
      errors.nin = "NIN must be exactly 11 numeric digits (e.g. 12345678901)";
    }

    setRegErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Generate secure mock 6-digit WhatsApp OTP validation code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setWhatsappCode(code);
      setEnteredCode(["", "", "", "", "", ""]);
      setShowNotification(false);

      showToast("Sending WhatsApp confirmation code...", "success");

      setTimeout(() => {
        setCurrentScreen("whatsapp_verification");
        setTimeout(() => {
          setShowNotification(true);
        }, 1200);
      }, 800);
    } else {
      showToast("Please correct the errors in the fields", "error");
    }
  };

  const handleVerifyCode = () => {
    const codeString = enteredCode.join("");
    if (codeString.length < 6) {
      showToast("Please enter the full 6-digit code", "error");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (codeString === whatsappCode) {
        setShowNotification(false);
        showToast("WhatsApp verification successful!", "success");
        setTimeout(() => {
          setCurrentScreen("terms");
        }, 800);
      } else {
        showToast("Invalid code. Check WhatsApp message and try again.", "error");
      }
    }, 1000);
  };

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleAcceptTerms = () => {
    if (!acceptedTerms) {
      showToast("Please accept the terms and conditions to proceed", "error");
      return;
    }
    showToast("Profile & Terms Certified. Opening Subscription Setup...", "info");
    setTimeout(() => {
      setCurrentScreen("subscription_gateway");
    }, 800);
  };

  const handleActivateSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanCard = subCardNumber.replace(/\s+/g, "");
    if (!cleanCard || cleanCard.length < 16 || isNaN(Number(cleanCard))) {
      showToast("Please enter a valid 16-digit card number", "error");
      return;
    }
    if (!subExpiry || !/^\d\d\/\d\d$/.test(subExpiry)) {
      showToast("Please enter card expiry in MM/YY format", "error");
      return;
    }
    if (!subCvv || !/^\d{3}$/.test(subCvv)) {
      showToast("Please enter a valid 3-digit CVV number", "error");
      return;
    }

    setIsActivatingSub(true);
    showToast("Securing pre-authorization with Flutterwave Gateway...", "info");

    setTimeout(() => {
      setIsActivatingSub(false);
      setHasPaidSubscription(true);
      setSubscriptionGraceDays(7); // 1-week free trial active
      setActivePlanType(selectedPlan); // plan active after trial is set
      
      // Dynamic Shop items initialization custom-tailored to their inputs
      const matchedCategoryObj = GOODS_TYPES.find(gt => gt.id === regGoodsType);
      const categoryName = matchedCategoryObj ? matchedCategoryObj.name : "Provisions";
      
      // Combine standard checks and custom additions
      const allChosenNames = [...selectedSuggestions, ...otherSuggestions];
      
      if (allChosenNames.length > 0) {
        const seeded: Product[] = allChosenNames.map((name, index) => {
          // Generous realistic prices in Naira
          const baseCost = Math.floor(Math.random() * 8 + 3) * 500 + 350; // ₦1850 - ₦5350
          const profitPercent = 0.15 + (Math.random() * 0.12); // 15% - 27%
          const baseSelling = Math.round((baseCost * (1 + profitPercent)) / 50) * 50;
          
          // Seed some low stock items (amount 2 or 3) for immediate dashboard alert demonstration
          const baseStock = index < 2 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 25) + 12;
          
          return {
            id: `prod_seed_${index}_${Date.now()}`,
            productName: name,
            costPrice: baseCost,
            sellingPrice: baseSelling,
            currentStock: baseStock,
            category: categoryName
          };
        });
        setProducts(seeded);

        // Append to the central shared shopOwners list
        if (setShopOwners) {
          const newOwnerId = `owner_${Date.now()}`;
          const newOwner: ShopOwner = {
            id: newOwnerId,
            businessName: regBusinessName.trim(),
            ownerName: regOwnerName.trim(),
            email: regEmail.trim(),
            phoneNumber: regPhoneNumber.trim(),
            password: regPassword,
            nin: regNin,
            ninVerifiedName: ninVerifiedName || regOwnerName.trim(),
            ninLookupStatus: ninLookupStatus,
            goodsType: regGoodsType,
            selectedPlan: selectedPlan,
            cardNumber: subCardNumber,
            expiry: subExpiry,
            cvv: subCvv,
            activePlanType: selectedPlan, // Activated plan
            dateRegistered: new Date().toISOString().split('T')[0],
            status: "active",
            cumulativeRevenue: 0,
            products: seeded,
            staff: [
              { username: `staff_${regOwnerName.trim().split(' ')[0].toLowerCase()}`, password: "1234", dateAdded: new Date().toISOString().split('T')[0], salesToday: 0, ordersCount: 0, isOnline: true, permissions: "Counter Sales Only" }
            ],
            activities: [
              { id: `act_${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: "Register", description: `Shop "${regBusinessName.trim()}" registered on CornerStreams Business with NIN verification.` }
            ]
          };
          setShopOwners(prev => [...prev, newOwner]);
        }
      }

      showToast("1-Week Free Trial Activated! Autopay scheduled successfully.", "success");
      setLogEmail(regEmail);
      
      setTimeout(() => {
        // Clear form states as setup is done
        setRegBusinessName("");
        setRegOwnerName("");
        setRegEmail("");
        setRegPhoneNumber("");
        setRegPassword("");
        setRegConfirmPassword("");
        setRegNin("");
        setWhatsappCode("");
        setEnteredCode(["", "", "", "", "", ""]);
        setAcceptedTerms(false);
        setSubCardNumber("");
        setSubExpiry("");
        setSubCvv("");
        setCurrentScreen("login");
      }, 1500);

    }, 2000);
  };

  // ===================================================
  // STATE & VALIDATION FOR LOGIN FORM
  // ===================================================
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [logErrors, setLogErrors] = useState<{ [key: string]: string }>({});
  const [showLogPassword, setShowLogPassword] = useState(false);
  const [loginRole, setLoginRole] = useState<"admin" | "staff">("admin");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    const usernameInput = logEmail.trim().toLowerCase();
    const matchedStaff = staffAccounts.find(s => s.username.toLowerCase() === usernameInput);

    if (loginRole === "staff") {
      if (!logEmail.trim()) {
        errors.email = "Please enter staff username";
      } else if (!matchedStaff) {
        errors.email = "Staff username not found in active registry";
      }
    } else {
      if (!logEmail.trim()) {
        errors.email = "Please enter email address";
      } else {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(logEmail.trim())) {
          errors.email = "Please enter a valid email address";
        }
      }
    }

    if (!logPassword) {
      errors.password = "Please enter your password";
    }

    setLogErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (loginRole === "staff" && matchedStaff) {
        if (matchedStaff.password === logPassword) {
          showToast(`Access Granted: Logged in as staff ${matchedStaff.username}!`, "success");
          setUserRole("staff");
          setDashboardTab("counter");
          setTimeout(() => {
            setCurrentScreen("dashboard");
          }, 1000);
        } else {
          showToast("Incorrect password for staff account", "error");
          setLogErrors({ password: "Password mismatch" });
        }
      } else {
        // Business Owner / Admin login
        const matchedOwner = shopOwners.find(o => o.email.toLowerCase() === usernameInput);
        if (matchedOwner) {
          if (matchedOwner.status === "suspended") {
            showToast("Access Denied: Account is suspended by CSB Super Admin.", "error");
            setLogErrors({ email: "Account suspended by Super Admin." });
            return;
          }
          if (matchedOwner.password === logPassword) {
            showToast(`Access Granted: Logged in as ${matchedOwner.ownerName} 👑`, "success");
            setUserRole("owner");
            setDashboardTab("owner_console");
            
            if (setActiveShopId) {
              setActiveShopId(matchedOwner.id);
            }
            
            // Seed simulator values with this owner's saved records
            setProducts(matchedOwner.products);
            setStaffAccounts(matchedOwner.staff);
            setActivePlanType(matchedOwner.activePlanType);
            setSelectedPlan(matchedOwner.selectedPlan);
            setSubCardNumber(matchedOwner.cardNumber);
            setSubExpiry(matchedOwner.expiry);
            setSubCvv(matchedOwner.cvv);

            setTimeout(() => {
              setCurrentScreen("dashboard");
            }, 1000);
          } else {
            showToast("Incorrect password for business owner", "error");
            setLogErrors({ password: "Password mismatch" });
          }
        } else {
          // Fallback if not found in custom list (allows default mock logins to function)
          showToast("Access Granted: Default Owner Console Authenticated 👑", "success");
          setUserRole("owner");
          setDashboardTab("owner_console");
          setTimeout(() => {
            setCurrentScreen("dashboard");
          }, 1000);
        }
      }
    } else {
      showToast("Please check mandatory login credentials", "error");
    }
  };

  // ===================================================
  // FORGOT PASSWORD DIALOG OVERLAY
  // ===================================================
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!forgotEmail.trim()) {
      setForgotError("Please enter email address");
    } else if (!emailRegex.test(forgotEmail.trim())) {
      setForgotError("Please enter a valid email address");
    } else {
      setShowForgotModal(false);
      showToast(`Password reset link sent to ${forgotEmail}`, "success");
    }
  };

  // ===================================================
  // SALES EXPORTER & TRACKER (CSV / DATA SPREADSHEETS)
  // ===================================================
  const handleExportCSV = (period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly") => {
    const headers = ["Transaction ID", "Date", "Items Sold", "Payment Method", "Revenue (Naira)", "Profit (Naira)", "Staff Operator"];
    
    let rows: string[][] = [];
    const todayStr = new Date().toISOString().split("T")[0];
    
    if (period === "daily") {
      rows = [
        ["TXN_88122", todayStr, "Indomie Super Pack (3), Peak Milk (1)", "Cash", "21200", "3100", "staff_chinelo"],
        ["TXN_88123", todayStr, "Golden Penny Pasta (2)", "Bank Transfer", "9600", "1400", "staff_chinelo"],
        ["TXN_88124", todayStr, "Gala Super Sausage (10)", "Cash", "2000", "500", "staff_obi"],
        ["TXN_88125", todayStr, "Samsung Fast Charge (1)", "POS Card", "4800", "1600", "staff_obi"]
      ];
    } else if (period === "weekly") {
      rows = [
        ["TXN_87901", "2026-06-28", "Ankara Fabrics (2)", "POS Card", "36000", "8000", "staff_obi"],
        ["TXN_87902", "2026-06-29", "Golden Penny Pasta (5)", "Cash", "24000", "3500", "staff_chinelo"],
        ["TXN_87903", "2026-06-30", "Milo Chocolate (3), Peak Milk (2)", "Bank Transfer", "16000", "2800", "staff_chinelo"],
        ["TXN_87904", "2026-07-01", "Samsung Fast Charge (2)", "POS Card", "9600", "3200", "staff_obi"],
        ["TXN_87905", "2026-07-02", "Gala Sausage (20), Indomie (6)", "Cash", "40000", "6800", "staff_chinelo"]
      ];
    } else if (period === "monthly") {
      rows = [
        ["TXN_M_01", "2026-06-05", "Ankara Fabrics (12)", "POS Card", "216000", "48000", "staff_obi"],
        ["TXN_M_02", "2026-06-12", "Provisions & Groceries bulk", "Cash", "145000", "22000", "staff_chinelo"],
        ["TXN_M_03", "2026-06-18", "Wines & Beverages batch", "Bank Transfer", "180000", "34000", "staff_chinelo"],
        ["TXN_M_04", "2026-06-25", "Electronics bulk restock", "POS Card", "95000", "24000", "staff_obi"]
      ];
    } else { // quarterly & yearly
      rows = [
        ["TXN_Q_01", "2026-01-15", "Q1 Apparel Trade", "POS Card", "1450000", "320000", "staff_obi"],
        ["TXN_Q_02", "2026-02-20", "Q1 Food Supplies", "Cash", "1120000", "180000", "staff_chinelo"],
        ["TXN_Q_03", "2026-04-10", "Q2 Wines Imports", "Bank Transfer", "1980000", "390000", "staff_chinelo"],
        ["TXN_Q_04", "2026-05-25", "Q2 Electronic Devices", "POS Card", "1650000", "420000", "staff_obi"]
      ];
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CBS_Sales_Tracker_${period.toUpperCase()}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`✓ CSV Export for ${period.toUpperCase()} sales downloaded successfully!`, "success");
  };

  // ===================================================
  // COUNTER BASKET ACTIVE OPERATIONS
  // ===================================================
  const getBasketTotal = () => {
    let sum = 0;
    products.forEach((p) => {
      const q = basketQuantities[p.id] || 0;
      sum += q * p.sellingPrice;
    });
    return sum;
  };

  const handleAdjustBasket = (id: string, dir: "inc" | "dec") => {
    const parentProd = products.find((p) => p.id === id);
    if (!parentProd) return;

    const currentQty = basketQuantities[id] || 0;

    if (dir === "inc") {
      if (currentQty >= parentProd.currentStock) {
        showToast(`Stock Limit Reached! Only ${parentProd.currentStock} units of ${parentProd.productName} in shop.`, "error");
        return;
      }
      setBasketQuantities((prev) => ({ ...prev, [id]: currentQty + 1 }));
    } else {
      if (currentQty > 0) {
        setBasketQuantities((prev) => ({ ...prev, [id]: currentQty - 1 }));
      }
    }
  };

  const handleClearBasket = () => {
    setBasketQuantities({});
    showToast("Current basket cleared!", "info");
  };

  const handleCompleteSale = () => {
    const total = getBasketTotal();
    if (total === 0) {
      showToast("Current basket is empty! Tap + to add items.", "error");
      return;
    }

    const nextProducts = products.map((p) => {
      const qtySold = basketQuantities[p.id] || 0;
      return {
        ...p,
        currentStock: Math.max(0, p.currentStock - qtySold),
      };
    });

    // Capture and apply decrement to mock stocks list
    setProducts(nextProducts);

    const itemsList: any[] = [];
    products.forEach((p) => {
      const q = basketQuantities[p.id] || 0;
      if (q > 0) {
        itemsList.push({
          productName: p.productName,
          price: p.sellingPrice,
          quantity: q,
          total: q * p.sellingPrice
        });
      }
    });

    const newReceipt = {
      id: "rcpt_" + Date.now(),
      receiptNumber: `CSB-TXN-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      operator: userRole === "staff" ? "staff_chinelo" : "Owner Principal",
      items: itemsList,
      totalAmount: total,
      paymentMethod: selectedPayment as any,
      status: "verified" as const
    };

    if (isOfflineMode) {
      const itemsCount = Object.values(basketQuantities).reduce((a: number, b: any) => a + (Number(b) || 0), 0);
      const newOfflineSale = {
        id: `offline_sale_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        amount: total,
        itemsCount: itemsCount
      };
      const nextOfflineQueue = [...offlineSalesQueue, newOfflineSale];
      setOfflineSalesQueue(nextOfflineQueue);

      // Log action locally and sync with master so super admin is aware
      if (activeShopId && setShopOwners) {
        setShopOwners((prev) =>
          prev.map((o) => {
            if (o.id === activeShopId) {
              const newActivity: ActivityLog = {
                id: `act_offline_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Sale",
                description: `Offline sale completed for ₦${total.toLocaleString()} (Queued on-device).`
              };
              const existingReceipts = o.salesReceipts || [];
              return {
                ...o,
                products: nextProducts,
                offlineSalesQueue: nextOfflineQueue,
                salesReceipts: [newReceipt, ...existingReceipts],
                activities: [newActivity, ...o.activities]
              };
            }
            return o;
          })
        );
      }
      showToast(`⚡ Offline checkout queued! Total: ₦${total.toLocaleString()}`, "info");
    } else {
      // Sync checkout back to the central master shopOwners database
      if (activeShopId && setShopOwners) {
        setShopOwners((prev) =>
          prev.map((o) => {
            if (o.id === activeShopId) {
              const itemsCount = Object.values(basketQuantities).reduce((a: number, b: any) => a + (Number(b) || 0), 0);
              const newActivity: ActivityLog = {
                id: `act_sale_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Sale",
                description: `Checkout completed for ₦${total.toLocaleString()} (${itemsCount} items sold).`
              };
              const existingReceipts = o.salesReceipts || [];
              return {
                ...o,
                cumulativeRevenue: o.cumulativeRevenue + total,
                products: nextProducts,
                salesReceipts: [newReceipt, ...existingReceipts],
                activities: [newActivity, ...o.activities]
              };
            }
            return o;
          })
        );
      }
    }

    setLastTxnTotal(total);
    setBasketQuantities({});
    setShowInvoiceModal(true);
  };

  // ===================================================
  // SAVE PRODUCT INTERACTIVITY
  // ===================================================
  const handleScanBarcode = () => {
    showToast("📷 Simulating Barcode Hardware Scan...", "success");
    setNewProdName("Super Golden Premium Flour");
    setNewCostPrice("8200");
    setNewSellingPrice("9600");
    setNewStock("15");
  };

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!newProdName.trim()) {
      errors.name = "Product name is required *";
    }
    if (!newCostPrice.trim() || isNaN(Number(newCostPrice))) {
      errors.cost = "Valid cost is required";
    }
    if (!newSellingPrice.trim() || isNaN(Number(newSellingPrice))) {
      errors.selling = "Valid selling price is required";
    }
    if (!newStock.trim() || isNaN(Number(newStock)) || Number(newStock) < 1) {
      errors.stock = "Initial stock is required";
    }

    setNewProdErrors(errors);

    if (Object.keys(errors).length === 0) {
      const added: Product = {
        id: "prod_" + Date.now(),
        productName: newProdName.trim(),
        costPrice: Number(newCostPrice),
        sellingPrice: Number(newSellingPrice),
        currentStock: Number(newStock),
        category: newProdCategory,
        imageUrl: selectedImage || undefined,
      };

      const updatedProds = [added, ...products];
      setProducts(updatedProds);

      // Sync new product back to master shop list
      if (activeShopId && setShopOwners) {
        setShopOwners((prev) =>
          prev.map((o) => {
            if (o.id === activeShopId) {
              const newActivity: ActivityLog = {
                id: `act_prod_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Inventory",
                description: `Added "${added.productName}" to inventory (Qty: ${added.currentStock}).`
              };
              return {
                ...o,
                products: updatedProds,
                activities: [newActivity, ...o.activities]
              };
            }
            return o;
          })
        );
      }

      showToast(`✓ "${newProdName}" added to shop inventory!`, "success");

      // Reset
      setNewProdName("");
      setNewCostPrice("");
      setNewSellingPrice("");
      setNewStock("");
      setSelectedImage(null);
      setNewProdCategory("Snacks");
    } else {
      showToast("Please fill in all mandatory product specifications", "error");
    }
  };

  const lowStockCount = products.filter((p) => p.currentStock <= lowStockThreshold).length;

  return (
    <div className="relative w-[340px] h-[670px] bg-slate-900 rounded-[48px] p-4.5 shadow-2xl border-4 border-slate-700/80 flex flex-col justify-between overflow-hidden shrink-0 select-none">
      {/* Phone Camera Notch Pillar */}
      <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-50 flex items-center justify-between px-3.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
        <div className="w-14 h-1 rounded-full bg-slate-700"></div>
        <div className="w-3.5 h-2 my-auto bg-[#0052CC]/40 rounded-full"></div>
      </div>

      {/* Simulated Phone Content Body Wrapper */}
      <div className="relative flex-1 bg-white rounded-[32px] overflow-hidden flex flex-col pt-6 pb-2">
        
        {/* UPPER STATUS BAR (E.g. Clock, Signal, Wifi, Battery) */}
        <div className="h-6 flex items-center justify-between px-5 text-slate-700 text-[10px] font-bold z-40 bg-white select-none">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{timeStr}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4 text-slate-800" />
          </div>
        </div>

        {/* INTERACTIVE COMPONENT WORKSPACE WITH CROSSING TRANSITIONS */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* SCREEN 1: WELCOME ONBOARDING */}
            {currentScreen === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col justify-between px-5 py-5 text-slate-800"
              >
                {/* Background image showing satisfied business owner in a store with three-color layout overlay tint */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900 pointer-events-none select-none">
                  <img
                    src={ownerMonitoringSales}
                    alt="Satisfied Owner Monitoring Sales"
                    className="w-full h-full object-cover scale-105 filter saturate-[1.1]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Layer 1: Semi-transparent multiply tint using the three colors of the logo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2540]/88 via-[#0052CC]/78 to-[#00875A]/75 mix-blend-multiply" />
                  {/* Layer 2: Black dark overlay to ensure maximum readability of light text & controls */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/55 via-transparent to-[#0A2540]/90" />
                </div>

                <div className="flex-1 flex flex-col justify-between z-10 pt-2 pb-1 relative">
                  {/* Top Branding Section on top */}
                  <div className="flex flex-col items-center text-center space-y-2.5 mt-2 select-none">
                    <div className="w-20 h-20 bg-white border-2 border-white/30 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 hover:rotate-1 transition-all duration-300">
                      <Logo size="sm" className="scale-[1.4]" showText={false} />
                    </div>

                    <div className="space-y-1">
                      <h2 className="font-display font-black text-white text-base md:text-lg tracking-tight leading-tight drop-shadow-md">
                        Corner <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent font-extrabold">Streams</span>
                      </h2>
                      <div className="text-[9px] font-extrabold tracking-[0.16em] text-[#4CBB17] bg-[#4CBB17]/15 border border-[#4CBB17]/25 px-3 py-0.5 rounded-full inline-block uppercase shadow-xs">
                        Business
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphism Key Value Card on top */}
                  <div className="space-y-3 px-1 my-auto max-w-[280px] mx-auto text-center select-none">
                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-xl space-y-2.5 transform hover:scale-[1.01] transition-transform duration-200">
                      <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#4CBB17] bg-[#4CBB17]/15 border border-[#4CBB17]/25 px-2.5 py-0.5 rounded-md inline-block">
                        👑 Remote Command
                      </span>
                      <h3 className="text-white font-sans font-black text-[11px] leading-snug uppercase tracking-wider">
                        "Monitor your shop, staffs anywhere you are"
                      </h3>
                      <p className="text-slate-100/90 text-[10px] font-medium leading-relaxed">
                        Track live cashflow streams, check inventory counts, and sync staff operations anywhere in the world.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Button Group on top */}
                  <div className="space-y-2.5 pb-2">
                    {/* Primary Sign Up with beautiful Logo Colors Gradient */}
                    <button
                      onClick={() => setCurrentScreen("register")}
                      className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white font-sans font-bold text-xs py-3 rounded-xl transition-all duration-155 shadow-md shadow-black/35"
                    >
                      Create Free Account
                    </button>
                    <button
                      onClick={() => setCurrentScreen("login")}
                      className="w-full bg-white/10 backdrop-blur-xs border border-white/20 hover:bg-white/20 hover:scale-[1.02] hover:-translate-y-0.5 hover:border-white/30 active:scale-[0.98] text-white font-sans font-bold text-xs py-2.5 rounded-xl transition-all duration-155"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: REGISTRATION FORM */}
            {currentScreen === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col z-10 bg-white"
              >
                {/* Store texture watermark background */}
                <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
                  <img
                    src={registerBg}
                    alt="Register Watermark background"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Header Navigation */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 text-[#0A2540] shrink-0 bg-white/90 backdrop-blur-sm z-20">
                  <button
                    onClick={() => setCurrentScreen("welcome")}
                    className="p-1 px-2 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-colors duration-150 flex items-center gap-1 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <span className="font-display font-bold text-[#0A2540] text-sm">
                    Create Free Account
                  </span>
                  <div className="w-14"></div>
                </div>

                {/* Form fields */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 z-10 pb-20">
                  <div className="text-left space-y-1">
                    <h3 className="font-display font-bold text-[#0A2540] text-base leading-tight">
                      Join Corner Streams
                    </h3>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      Set up your shop metadata to begin tracking sales streams in real time.
                    </p>
                  </div>

                  {/* Onboarding Walkthrough Banner */}
                  {tourStep === -1 && (
                    <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/45 to-emerald-50/70 border-l-4 border-[#0052CC] p-3 rounded-r-2xl space-y-2.5 mt-2 shadow-xs border border-slate-100 text-left">
                      <div className="flex items-start gap-2">
                        <span className="text-sm shrink-0">🎓</span>
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-black text-[#0A2540] uppercase tracking-wider">Onboarding Walkthrough</p>
                          <p className="text-[9px] text-slate-500 leading-normal font-semibold">
                            First-time tester? Take a step-by-step interactive tour to learn how NIMC ID matching and presets operate!
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => setTourStep(0)}
                          className="bg-gradient-to-r from-[#0A2540] to-[#0052CC] text-white text-[9px] font-black px-3 py-1.5 rounded-xl active:scale-95 transition-all shadow-xs uppercase tracking-wider"
                        >
                          🚀 Start Tour
                        </button>
                        <button
                          type="button"
                          onClick={handleAutoFillAllTour}
                          className="bg-[#4CBB17] hover:bg-[#4CBB17]/90 text-white text-[9px] font-black px-2.5 py-1.5 rounded-xl active:scale-95 transition-all shadow-xs uppercase tracking-wider"
                        >
                          ⚡ Auto-Fill All
                        </button>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleRegisterSubmit} className="space-y-3 pb-4">
                    {/* Business Name */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={regBusinessName}
                        onChange={(e) => setRegBusinessName(e.target.value)}
                        placeholder="e.g. Alaba Electronics Store"
                        className={`w-full bg-white text-xs text-[#0A2540] border outline-none px-3.5 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 ${
                          regErrors.businessName ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                        }`}
                      />
                      {regErrors.businessName && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.businessName}</p>
                      )}
                    </div>

                    {/* Owner Name */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        value={regOwnerName}
                        onChange={(e) => setRegOwnerName(e.target.value)}
                        placeholder="e.g. Chinedu Eze"
                        className={`w-full bg-white text-xs text-[#0A2540] border outline-none px-3.5 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 ${
                          regErrors.ownerName ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                        }`}
                      />
                      {regErrors.ownerName && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.ownerName}</p>
                      )}
                    </div>

                    {/* WhatsApp Number */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={regPhoneNumber}
                        onChange={(e) => setRegPhoneNumber(e.target.value)}
                        placeholder="e.g. +234 803 123 4567"
                        className={`w-full bg-white text-xs text-[#0A2540] border outline-none px-3.5 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 ${
                          regErrors.phoneNumber ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                        }`}
                      />
                      {regErrors.phoneNumber && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.phoneNumber}</p>
                      )}
                    </div>

                    {/* National Identity Number (NIN) */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block flex items-center justify-between">
                        <span>🇳🇬 National Identity Number (NIN)</span>
                        <span className="text-[8px] bg-slate-100 text-[#0052CC] font-bold px-1.5 py-0.5 rounded">11 Digits Security Lookup</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={11}
                          value={regNin}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setRegNin(val);
                          }}
                          placeholder="e.g. 12345678901"
                          className={`w-full bg-white text-xs text-[#0A2540] border outline-none px-3.5 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 font-mono tracking-wider pr-10 ${
                            regErrors.nin ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                          }`}
                        />
                        {ninLookupStatus === "searching" && (
                          <span className="absolute right-3.5 top-3 flex items-center">
                            <span className="animate-spin h-3.5 w-3.5 border-2 border-[#0052CC] border-t-transparent rounded-full"></span>
                          </span>
                        )}
                        {ninLookupStatus === "verified" && (
                          <span className="absolute right-3.5 top-2.5 text-[#4CBB17] font-black text-sm" title="Verified Name Match">
                            ✓
                          </span>
                        )}
                      </div>
                      {ninLookupStatus === "searching" && (
                        <p className="text-[8.5px] font-bold text-[#0052CC] animate-pulse flex items-center gap-1 mt-0.5">
                          <span>🔍 Verifying with National Identity Database (NIMC)...</span>
                        </p>
                      )}
                      {ninLookupStatus === "verified" && (
                        <div className="bg-[#4CBB17]/5 border border-[#4CBB17]/20 p-2 rounded-xl flex items-center justify-between mt-1">
                          <div>
                            <p className="text-[8.5px] font-bold text-[#4CBB17]">✓ NIMC Security Match</p>
                            <p className="text-[8px] text-slate-400 font-sans mt-0.5">Linked: {ninVerifiedName}</p>
                          </div>
                          <span className="text-[7.5px] bg-[#4CBB17] text-white px-1.5 py-0.5 rounded-md font-black tracking-wider uppercase scale-90 shrink-0">VERIFIED</span>
                        </div>
                      )}
                      {regErrors.nin && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.nin}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. info@shop.com"
                        className={`w-full bg-white text-xs text-[#0A2540] border outline-none px-3.5 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 ${
                          regErrors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                        }`}
                      />
                      {regErrors.email && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? "text" : "password"}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full bg-white text-xs text-[#0A2540] border outline-none pl-3.5 pr-10 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 ${
                            regErrors.password ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-navy transition-colors duration-150"
                        >
                          {showRegPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      {regErrors.password && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showRegConfirmPassword ? "text" : "password"}
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className={`w-full bg-white text-xs text-[#0A2540] border outline-none pl-3.5 pr-10 py-2.5 rounded-xl placeholder:text-slate-300 transition-all duration-150 ${
                            regErrors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-navy transition-colors duration-150"
                        >
                          {showRegConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      {regErrors.confirmPassword && (
                        <p className="text-[9px] font-semibold text-red-500 pt-0.5">{regErrors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Custom Type of Goods & Suggestions */}
                    <div className="space-y-3.5 border-t border-slate-100 pt-4.5 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">
                          Type of Goods in Shop
                        </label>
                        <p className="text-[9px] text-[#0052CC] font-bold">
                          Pick standard presets below, or key in your own tailored suggestions.
                        </p>
                      </div>

                      {/* Grid representation of retail Goods Types */}
                      <div className="grid grid-cols-2 gap-2">
                        {GOODS_TYPES.map((gt) => (
                          <button
                            key={gt.id}
                            type="button"
                            onClick={() => {
                              setRegGoodsType(gt.id);
                              showToast(`Switched shop template to ${gt.name}!`, "info");
                            }}
                            className={`p-2.5 rounded-xl border text-[10px] font-semibold flex items-center gap-1.5 transition-all text-left shadow-2xs active:scale-95 ${
                              regGoodsType === gt.id
                                ? "bg-gradient-to-br from-[#0A2540] via-[#0052CC] to-[#4CBB17] text-white border-transparent"
                                : "bg-white border-slate-200 hover:bg-slate-50 text-[#0A2540]/90"
                            }`}
                          >
                            <span className="text-xs">{gt.icon}</span>
                            <span className="truncate">{gt.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Interactive checkboxes of recommendations */}
                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-2.5 shadow-inner">
                        <p className="text-[9px] font-bold text-[#0A2540] uppercase tracking-widest flex items-center justify-between">
                          <span>📦 Standard Recommendations to load</span>
                          <span className="text-[8px] bg-[#0052CC]/10 text-[#0052CC] font-bold px-1.5 py-0.5 rounded-full">
                            {selectedSuggestions.length} Checked
                          </span>
                        </p>
                        
                        <div className="grid grid-cols-2 gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                          {GOODS_TYPES.find(gt => gt.id === regGoodsType)?.suggestions.map((sug) => {
                            const isChecked = selectedSuggestions.includes(sug);
                            return (
                              <label
                                key={sug}
                                className={`flex items-center gap-2 p-1.5 px-2 rounded-xl border select-none cursor-pointer text-[9px] transition-all bg-white hover:bg-slate-100/50 ${
                                  isChecked ? "border-[#0052CC]/40 text-[#0A2540] font-black" : "border-slate-100 text-slate-400"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setSelectedSuggestions(selectedSuggestions.filter(s => s !== sug));
                                    } else {
                                      setSelectedSuggestions([...selectedSuggestions, sug]);
                                    }
                                  }}
                                  className="accent-[#0052CC] h-3 w-3"
                                />
                                <span className="truncate leading-none">{sug}</span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Other custom additions for brand discrepancy handling */}
                        <div className="space-y-1.5 border-t border-slate-200/60 pt-2.5">
                          <p className="text-[9px] font-bold text-[#0A2540] flex items-center gap-1">
                            <span>✨ Brand mismatch? Add custom alternatives:</span>
                          </p>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={otherSuggestionInput}
                              onChange={(e) => setOtherSuggestionInput(e.target.value)}
                              placeholder="e.g. Three Crowns tin, Peak sachet"
                              className="flex-1 bg-white border border-slate-200 outline-none text-[10px] px-3 py-2 rounded-xl text-[#0A2540] placeholder:text-slate-350 focus:border-[#0A2540] font-sans"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  if (otherSuggestionInput.trim()) {
                                    setOtherSuggestions([...otherSuggestions, otherSuggestionInput.trim()]);
                                    setOtherSuggestionInput("");
                                    showToast(`Added Custom Brand: ${otherSuggestionInput.trim()}`, "success");
                                  }
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (otherSuggestionInput.trim()) {
                                  setOtherSuggestions([...otherSuggestions, otherSuggestionInput.trim()]);
                                  setOtherSuggestionInput("");
                                  showToast(`Added Custom Brand: ${otherSuggestionInput.trim()}`, "success");
                                }
                              }}
                              className="px-3 bg-gradient-to-r from-[#0A2540] to-[#0052CC] text-white rounded-xl text-[9px] font-black tracking-wider transition-all active:scale-95 shadow-sm"
                            >
                              ADD
                            </button>
                          </div>

                          {/* Render custom input tags list with close button */}
                          {otherSuggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto pt-1">
                              {otherSuggestions.map((item) => (
                                <span
                                  key={item}
                                  className="bg-white border border-[#4CBB17]/30 text-[#0052CC] text-[8px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs"
                                >
                                  <span>{item}</span>
                                  <button
                                    type="button"
                                    onClick={() => setOtherSuggestions(otherSuggestions.filter(x => x !== item))}
                                    className="text-red-500 hover:text-red-700 font-extrabold text-[9px]"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      type="submit"
                      className={`w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white font-sans font-bold text-sm py-3 rounded-xl transition-all duration-155 mt-4 shadow-sm ${
                        tourStep === 7 ? "ring-4 ring-[#4CBB17] ring-offset-2 animate-pulse scale-[1.01]" : ""
                      }`}
                    >
                      {tourStep === 7 ? "🚀 Complete Registration Walkthrough!" : "Verify WhatsApp Number"}
                    </button>
                  </form>
                </div>

                {/* Floating Walkthrough Tooltip Overlay */}
                {tourStep >= 0 && (
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0A2540] text-white p-3.5 rounded-2xl shadow-2xl border border-white/10 z-[100] space-y-2.5 transform transition-all select-none animate-bounce-subtle text-left">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <p className="text-[7.5px] font-black text-blue-400 uppercase tracking-widest leading-none">
                          Interactive Walkthrough
                        </p>
                        <h4 className="text-[10.5px] font-extrabold leading-tight text-white flex items-center gap-1">
                          {REG_TOUR_STEPS[tourStep].title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTourStep(-1);
                          showToast("Walkthrough closed. Feel free to fill in manually!", "info");
                        }}
                        className="text-slate-400 hover:text-white p-0.5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="text-[9.5px] text-slate-300 leading-normal font-medium text-left">
                      {REG_TOUR_STEPS[tourStep].desc}
                    </p>

                    <div className="flex items-center justify-between pt-1.5 border-t border-white/10 gap-1.5">
                      <div className="flex gap-1">
                        {/* Auto-fill step button */}
                        {REG_TOUR_STEPS[tourStep].field && (
                          <button
                            type="button"
                            onClick={() => {
                              const step = REG_TOUR_STEPS[tourStep];
                              if (step.field === "regBusinessName") setRegBusinessName(step.autoFillVal);
                              if (step.field === "regOwnerName") setRegOwnerName(step.autoFillVal);
                              if (step.field === "regPhoneNumber") setRegPhoneNumber(step.autoFillVal);
                              if (step.field === "regNin") {
                                setRegNin(step.autoFillVal);
                                setNinLookupStatus("verified");
                                setNinVerifiedName("CHINEDU EZE");
                              }
                              if (step.field === "regEmail") setRegEmail(step.autoFillVal);
                              if (step.field === "regPassword") {
                                setRegPassword(step.autoFillVal);
                                setRegConfirmPassword(step.autoFillVal);
                              }
                              if (step.field === "regGoodsType") setRegGoodsType(step.autoFillVal);
                              
                              showToast(`✓ Filled: ${step.autoFillVal}`, "success");
                            }}
                            className="bg-blue-500/25 hover:bg-blue-500/40 text-blue-300 text-[8px] font-extrabold px-2 py-1 rounded-lg transition-colors border border-blue-400/20 shadow-xs"
                          >
                            ✨ Auto-fill
                          </button>
                        )}
                        {tourStep < 7 && (
                          <button
                            type="button"
                            onClick={handleAutoFillAllTour}
                            className="bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-400 text-[8px] font-extrabold px-1.5 py-1 rounded-lg transition-colors border border-emerald-400/20 shadow-xs"
                          >
                            ⚡ Auto-Fill All
                          </button>
                        )}
                      </div>

                      <div className="flex gap-1 shrink-0">
                        {tourStep > 0 && (
                          <button
                            type="button"
                            onClick={() => setTourStep(prev => prev - 1)}
                            className="bg-white/10 hover:bg-white/20 text-white text-[8px] font-extrabold px-2 py-1 rounded-lg active:scale-95 transition-all border border-white/5"
                          >
                            Prev
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleNextTourStep}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[8.5px] font-black px-2.5 py-1 rounded-lg active:scale-95 transition-all shadow-xs flex items-center gap-1 uppercase tracking-wider"
                        >
                          <span>{tourStep === REG_TOUR_STEPS.length - 1 ? "Finish" : "Next"}</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* SCREEN 3: WHATSAPP OTP VERIFICATION */}
            {currentScreen === "whatsapp_verification" && (
              <motion.div
                key="whatsapp_verification"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col z-10 bg-white"
              >
                {/* Header Navigation */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 text-[#0A2540] shrink-0 bg-white z-20">
                  <button
                    onClick={() => setCurrentScreen("register")}
                    className="p-1 px-2 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-colors duration-150 flex items-center gap-1 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <span className="font-display font-bold text-[#0A2540] text-sm">
                    OTP Verification
                  </span>
                  <div className="w-14"></div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 flex flex-col justify-between">
                  <div className="space-y-5 text-left">
                    <div className="h-12 w-12 bg-[#00875A]/10 rounded-2xl flex items-center justify-center text-[#00875A]">
                      <Phone className="h-6 w-6" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-[#0A2540] text-base leading-tight">
                        Confirm WhatsApp Code
                      </h3>
                      <p className="text-slate-500 font-sans text-xs leading-relaxed">
                        We have dispatched a 6-digit validation OTP to your registered phone number. Enter the digits below:
                      </p>
                    </div>

                    {/* OTP Inputs Series */}
                    <div className="flex items-center justify-between gap-1.5 pt-2">
                      {enteredCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const updated = [...enteredCode];
                            updated[idx] = val;
                            setEnteredCode(updated);

                            // Auto focus next field
                            if (val && idx < 5) {
                              const next = document.getElementById(`otp-input-${idx + 1}`);
                              if (next) (next as HTMLInputElement).focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !enteredCode[idx] && idx > 0) {
                              const prev = document.getElementById(`otp-input-${idx - 1}`);
                              if (prev) {
                                (prev as HTMLInputElement).focus();
                                const updated = [...enteredCode];
                                updated[idx - 1] = "";
                                setEnteredCode(updated);
                              }
                            }
                          }}
                          className="w-10 h-12 border border-slate-200 outline-none text-[#0A2540] text-center font-bold text-lg rounded-xl focus:border-[#0A2540] transition-colors bg-white font-mono"
                        />
                      ))}
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={() => {
                          const code = Math.floor(100000 + Math.random() * 900000).toString();
                          setWhatsappCode(code);
                          setEnteredCode(["", "", "", "", "", ""]);
                          setShowNotification(true);
                          showToast("New OTP dispatched to WhatsApp!", "info");
                        }}
                        className="text-[11px] font-bold text-[#00875A] hover:text-[#00875A]/90 hover:underline transition-colors flex items-center gap-1 mx-auto"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Resend verification code</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3.5 pb-2">
                    <button
                      onClick={handleVerifyCode}
                      disabled={isVerifying}
                      className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white font-sans font-bold text-sm py-3 rounded-xl transition-all duration-155 flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {isVerifying ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <span>Verify & Proceed</span>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: TERMS & CONDITIONS */}
            {currentScreen === "terms" && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col z-10 bg-white"
              >
                {/* Header Navigation */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 text-[#0A2540] shrink-0 bg-white z-20">
                  <button
                    onClick={() => {
                      setAcceptedTerms(false);
                      setCurrentScreen("register");
                    }}
                    className="p-1 px-2 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-colors duration-150 flex items-center gap-1 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <span className="font-display font-bold text-[#0A2540] text-sm">
                    Terms of Service
                  </span>
                  <div className="w-14"></div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-[#0A2540] text-sm leading-tight text-left">
                      Terms & Conditions
                    </h3>
                    <p className="text-[10px] text-slate-400 font-sans">
                      Last updated: June 17, 2026
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-3 max-h-[190px] overflow-y-auto text-[11px] text-slate-600 font-sans leading-relaxed">
                    <p className="font-bold text-[#0A2540]">Welcome to Corner Streams!</p>
                    <p>
                      Please read these Terms and Conditions carefully before activating your account. By registering an account with Corner Streams, you agree to be bound by these Terms.
                    </p>
                    <p className="font-bold text-[#0A2540]">1. Core Purpose</p>
                    <p>
                      Corner Streams provides digital sales monitoring and stream transaction services for retail and wholesale shop owners to track sales metrics as they travel or transition.
                    </p>
                    <p className="font-bold text-[#0A2540]">2. Data & Privacy</p>
                    <p>
                      All sales figures, items list, customer data, and store revenues are localized securely. We employ end-to-end cloud protection techniques to present you with secure live feeds of your stores remotely.
                    </p>
                    <p className="font-bold text-[#0A2540]">3. Account Integrity</p>
                    <p>
                      You are solely responsible for matching credentials and maintaining password confidentiality. You agree to notify us immediately of any foreign or unauthorized use of your registration account.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC] h-4 w-4 shrink-0 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 font-semibold leading-tight">
                        I explicitly consent and agree to Corner Streams' Terms of Service and Privacy Policy.
                      </span>
                    </label>

                    <div className="space-y-2 pt-1">
                      <button
                        onClick={handleAcceptTerms}
                        className={`w-full font-sans font-bold text-xs py-3 rounded-xl transition-all duration-155 flex items-center justify-center gap-1.5 shadow-sm ${
                          acceptedTerms 
                            ? "bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white" 
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Accept & Create Account
                      </button>
                      <button
                        onClick={() => {
                          setAcceptedTerms(false);
                          setCurrentScreen("register");
                        }}
                        className="w-full border border-slate-200 hover:bg-slate-50 hover:text-[#0A2540] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-slate-500 font-sans font-bold text-[11px] py-2 rounded-xl transition-all duration-155"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN: PREMIUM SUBSCRIPTION GATEWAY */}
            {currentScreen === "subscription_gateway" && (
              <motion.div
                key="subscription_gateway"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col z-10 bg-white"
              >
                {/* Header Navigation */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 text-[#0A2540] shrink-0 bg-white z-20">
                  <button
                    onClick={() => setCurrentScreen("terms")}
                    className="p-1 px-2 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-colors duration-150 flex items-center gap-1 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <span className="font-display font-bold text-[#0A2540] text-sm">
                    Activate Subscription
                  </span>
                  <div className="w-14"></div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-left">
                  {/* Explainer / Header */}
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 bg-emerald-100 text-[#4CBB17] text-[9px] font-black px-2 py-0.5 rounded-full select-none">
                      <span>🎁 1-WEEK TRIAL FIRSTLY ON THE PLATFORM</span>
                    </div>
                    <h3 className="font-display font-extrabold text-[#0A2540] text-[13px] leading-tight text-left">
                      Platform Subscription Autopay Onboarding
                    </h3>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                      To authenticate your terminal, select your plan. Autopay initiates only after your 7-day trial terminates on June 26, 2026. Cancel anytime in 1-tap.
                    </p>
                  </div>

                  <form onSubmit={handleActivateSubscription} className="space-y-3.5 pb-4">
                    {/* Choose Plan Schedule */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-[#0A2540] uppercase tracking-wider block">
                        Select Billing Tier (7-Day Trial First)
                      </label>
                      <div className="space-y-1.5">
                        {[
                          { id: "monthly", name: "Monthly Ledger", price: "₦5,000", tag: "Standard Setup" },
                          { id: "quarterly", name: "Quarterly Saver", price: "₦12,550", tag: "Save 15% (₦4,183/mo)" },
                          { id: "yearly", name: "Yearly Unlimited", price: "₦42,000", tag: "Save 30% (₦3,500/mo) - Best Choice" }
                        ].map((plan) => {
                          const isSel = selectedPlan === plan.id;
                          return (
                            <button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedPlan(plan.id as "monthly" | "quarterly" | "yearly")}
                              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                                isSel
                                  ? "border-[#0052CC] bg-[#0052CC]/5"
                                  : "border-slate-200 bg-white hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSel ? "border-[#0052CC] text-[#0052CC]" : "border-slate-350"
                                }`}>
                                  {isSel && <span className="h-2 w-2 rounded-full bg-[#0052CC]" />}
                                </span>
                                <div>
                                  <p className="text-[10px] font-black text-[#0A2540]">{plan.name}</p>
                                  <p className="text-[8px] text-slate-400">{plan.tag}</p>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-[#0052CC] bg-[#0052CC]/10 px-2 py-0.5 rounded-lg shrink-0">
                                {plan.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Paystack / Flutterwave Gateway Logo decoration */}
                    <div className="border border-slate-100 rounded-2xl p-3 bg-slate-50 space-y-2.5 relative overflow-hidden shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-extrabold text-[#0A2540] uppercase tracking-wider block">
                          🔒 Secure Onboarding Card Vault
                        </span>
                        <div className="flex gap-1">
                          <span className="text-[7px] text-slate-400 border border-slate-200 bg-white px-1 py-0.5 rounded uppercase font-black tracking-wide">Paystack</span>
                          <span className="text-[7px] text-[#0052CC] border border-blue-100 bg-white px-1 py-0.5 rounded uppercase font-black tracking-wide">Flutterwave</span>
                        </div>
                      </div>

                      <p className="text-[9px] text-[#0052CC] font-bold bg-[#0052CC]/5 p-2 rounded-lg">
                        💳 You are pre-authorizing your card. <strong>₦0.00</strong> will be charged today for verification. Standard auto-renew of {
                          selectedPlan === "monthly" ? "₦5,000 monthly" : selectedPlan === "quarterly" ? "₦12,550 quarterly" : "₦42,000 yearly"
                        } streams automatically after the trial on June 26, 2026. Cancel anytime.
                      </p>

                      {/* Card input field */}
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          value={subCardNumber}
                          placeholder="4321 0987 6543 2109"
                          onChange={(e) => {
                            // Automatically insert spaces every 4 characters
                            const cleanStr = e.target.value.replace(/\D/g, "");
                            const matched = cleanStr.match(/.{1,4}/g);
                            setSubCardNumber(matched ? matched.join(" ") : cleanStr);
                          }}
                          className="w-full bg-white text-xs border border-slate-200 outline-none px-3 py-2 rounded-xl text-[#0A2540] font-mono tracking-widest placeholder:text-slate-250 focus:border-[#0A2540]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Expiry date */}
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="12/28"
                            value={subExpiry}
                            onChange={(e) => {
                              const cleanStr = e.target.value.replace(/\D/g, "");
                              if (cleanStr.length > 2) {
                                setSubExpiry(cleanStr.slice(0, 2) + "/" + cleanStr.slice(2, 4));
                              } else {
                                setSubExpiry(cleanStr);
                              }
                            }}
                            className="w-full bg-white text-xs border border-slate-200 outline-none px-3 py-2 rounded-xl text-[#0A2540] font-mono tracking-wider text-center placeholder:text-slate-250 focus:border-[#0A2540]"
                          />
                        </div>

                        {/* CVV */}
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                            CVV Code
                          </label>
                          <input
                            type="password"
                            maxLength={3}
                            placeholder="***"
                            value={subCvv}
                            onChange={(e) => setSubCvv(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-white text-xs border border-slate-200 outline-none px-3 py-2 rounded-xl text-[#0A2540] font-mono tracking-wider text-center placeholder:text-slate-250 focus:border-[#0A2540]"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isActivatingSub}
                      className="w-full bg-gradient-to-r from-[#0052CC] to-[#4CBB17] hover:brightness-110 active:scale-98 text-white font-sans font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      {isActivatingSub ? (
                        <>
                          <span className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></span>
                          <span>Pre-authorising Secure Card...</span>
                        </>
                      ) : (
                        <span>Activate 1-Week Trial & Autopay</span>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: LOGIN SCREEN */}
            {currentScreen === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col z-10"
              >
                {/* Stylized physical retail shop front background with white overlay tint */}
                <RetailShopFrontBackground />

                {/* Header Navigation */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 text-[#0A2540] shrink-0 bg-white/94 backdrop-blur-xs z-20">
                  <button
                    onClick={() => setCurrentScreen("welcome")}
                    className="p-1 px-2 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-colors duration-150 flex items-center gap-1 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <span className="font-display font-bold text-[#0A2540] text-sm">
                    Log In
                  </span>
                  <div className="w-14"></div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 flex flex-col justify-between relative z-10">
                  <div className="space-y-5">
                    <div className="flex justify-center">
                      <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-1.5 shadow-sm">
                        <Logo size="sm" showText={false} />
                      </div>
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="font-display font-bold text-[#0A2540] text-base">
                        Log In to Shop
                      </h3>
                      <p className="text-slate-400 font-sans text-[11px] leading-relaxed max-w-[210px] mx-auto">
                        Access your sales, streams, inventory logs, and shop metrics from everywhere.
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-left">
                      {/* Role Selection Tabs */}
                      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl select-none mb-2">
                        <button
                          type="button"
                          onClick={() => {
                            setLoginRole("admin");
                            setLogErrors({});
                          }}
                          className={`py-2 text-[10px] font-sans font-bold rounded-lg transition-all duration-155 flex items-center justify-center gap-1 active:scale-95 ${
                            loginRole === "admin"
                              ? "bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] text-white shadow-sm"
                              : "text-[#0A2540]/70 hover:bg-slate-200/50 hover:text-[#0A2540]"
                          }`}
                        >
                          <span>👑 Admin Login</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLoginRole("staff");
                            setLogErrors({});
                          }}
                          className={`py-2 text-[10px] font-sans font-bold rounded-lg transition-all duration-155 flex items-center justify-center gap-1 active:scale-95 ${
                            loginRole === "staff"
                              ? "bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] text-white shadow-sm"
                              : "text-[#0A2540]/70 hover:bg-slate-200/50 hover:text-[#0A2540]"
                          }`}
                        >
                          <span>👥 Staff Login</span>
                        </button>
                      </div>

                      {/* Login ID Row (Email for Admin, Username for Staff) */}
                      <div className="space-y-0.5">
                        <label className="text-[9px] font-bold text-[#0A2540] uppercase tracking-wider block font-sans">
                          {loginRole === "admin" ? "Admin Email Address" : "Staff Username (Not Email)"}
                        </label>
                        <input
                          type={loginRole === "admin" ? "email" : "text"}
                          value={logEmail}
                          onChange={(e) => setLogEmail(e.target.value)}
                          placeholder={loginRole === "admin" ? "e.g. info@shop.com" : "e.g. staff_chinelo"}
                          className={`w-full bg-white text-xs text-[#0A2540] border outline-none px-3.5 py-2.5 rounded-xl transition-all duration-150 placeholder:text-slate-200 ${
                            logErrors.email ? "border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                          }`}
                        />
                        {logErrors.email && <p className="text-[9px] font-semibold text-red-500">{logErrors.email}</p>}
                      </div>

                      {/* Password Row */}
                      <div className="space-y-0.5">
                        <label className="text-[9px] font-bold text-[#0A2540] uppercase tracking-wider block">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showLogPassword ? "text" : "password"}
                            value={logPassword}
                            onChange={(e) => setLogPassword(e.target.value)}
                            placeholder="••••••••"
                            className={`w-full bg-white text-xs text-[#0A2540] border outline-none pl-3.5 pr-10 py-2.5 rounded-xl transition-all duration-150 ${
                              logErrors.password ? "border-red-500" : "border-slate-200 focus:border-[#0A2540]"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowLogPassword(!showLogPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-navy transition-colors duration-150"
                          >
                            {showLogPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                        {logErrors.password && <p className="text-[9px] font-semibold text-red-500">{logErrors.password}</p>}
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setForgotEmail(logEmail);
                            setForgotError("");
                            setShowForgotModal(true);
                          }}
                          className="text-[#0A2540] hover:underline font-bold text-[10px]"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white font-sans font-bold text-xs py-3.5 rounded-xl transition-all duration-155 mt-3 shadow-sm"
                      >
                        Log In
                      </button>
                    </form>
                  </div>

                  {/* Interactive Quick Test accounts helper to facilitate seamless model testing */}
                  <div className="bg-slate-50 border border-slate-150 p-2.5 rounded-xl space-y-2 mt-1">
                    <p className="text-[8px] font-black text-[#0A2540] uppercase tracking-wider flex items-center justify-between">
                      <span>✨ Quick Test Credentials</span>
                      <span className="text-[7px] text-[#0052CC] font-mono">1-Click Autofill</span>
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setLoginRole("admin");
                          setLogEmail("adewale@mart.ng");
                          setLogPassword("password123");
                          showToast("Autofilled Admin Adewale credentials!", "success");
                        }}
                        className="bg-white border border-slate-200 hover:border-blue-300 p-1.5 rounded-lg text-left transition-all active:scale-95 flex flex-col gap-0.5"
                      >
                        <span className="text-[8px] font-bold text-slate-800 truncate">👑 Adewale Admin</span>
                        <span className="text-[7px] text-slate-400 truncate">adewale@mart.ng</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginRole("staff");
                          setLogEmail("staff_chinelo");
                          setLogPassword("password123");
                          showToast("Autofilled Staff Chinelo credentials!", "success");
                        }}
                        className="bg-white border border-slate-200 hover:border-blue-300 p-1.5 rounded-lg text-left transition-all active:scale-95 flex flex-col gap-0.5"
                      >
                        <span className="text-[8px] font-bold text-slate-800 truncate">👥 Chinelo Staff</span>
                        <span className="text-[7px] text-slate-400 truncate">staff_chinelo</span>
                      </button>
                    </div>
                    <p className="text-[7.5px] text-slate-400 font-sans leading-tight text-center">
                      To test as <strong>Super Admin</strong>, use the toggle header tab labeled "👑 CSB Super Admin Panel".
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[11px] font-medium pt-2 border-t border-slate-50">
                    <span className="text-slate-400">Don't have an account?</span>
                    <button type="button" onClick={() => setCurrentScreen("register")} className="text-[#0052CC] font-bold hover:underline">
                      Sign Up Free
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 6: DYNAMIC COGNITIVE INTERACTIVE APPLICATION DASHBOARD */}
            {currentScreen === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col z-10 bg-white"
              >
                {/* INTERACTIVE APPBARS M3 ALIGNED BY SECTOR */}
                {dashboardTab === "owner_console" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs">
                        Owner Console
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                          if (nextRole === "staff") {
                            setDashboardTab("counter");
                          }
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 flex-row-reverse">
                      <button
                        onClick={() => setShowNotifications(true)}
                        className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                        title="Notifications"
                      >
                        <Bell className="h-4.5 w-4.5" />
                        <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                      </button>
                      {userRole === "owner" && (
                        <button
                          onClick={() => {
                            setDashboardTab("qr_monitor");
                            showToast("Opening QR Verification Monitor", "success");
                          }}
                          className="p-1 text-slate-500 hover:text-[#00875A] relative active:scale-95 transition-all"
                          title="QR Scans Monitor"
                        >
                          <QrCode className="h-4.5 w-4.5" />
                          {qrNotifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#00875A] text-white text-[7px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white scale-90">
                              {qrNotifications.length}
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {dashboardTab === "counter" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs">
                        Current Basket
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleClearBasket}
                        className="p-1 px-2 text-[11px] text-[#0A2540] hover:bg-slate-100 rounded-lg font-bold transition-all mr-1"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setShowNotifications(true)}
                        className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                      >
                        <Bell className="h-4.5 w-4.5" />
                        <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                      </button>
                    </div>
                  </div>
                )}

                {dashboardTab === "add_product" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs">
                        Add Product
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <button
                      onClick={() => setShowNotifications(true)}
                      className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                    >
                      <Bell className="h-4.5 w-4.5" />
                      <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                    </button>
                  </div>
                )}

                {dashboardTab === "low_stock" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-[#0052CC] shrink-0" />
                        <span>Low Stock</span>
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-slate-105 bg-[#0A2540] text-white font-bold px-2 py-0.5 rounded-full text-[8px] mr-1">
                        {lowStockCount} Critical
                      </span>
                      <button
                        onClick={() => setShowNotifications(true)}
                        className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                      >
                        <Bell className="h-4.5 w-4.5" />
                        <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                      </button>
                    </div>
                  </div>
                )}

                {dashboardTab === "settings" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs flex items-center gap-1">
                        <Settings className="h-4 w-4 text-[#0052CC] shrink-0" />
                        <span>Settings</span>
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <button
                      onClick={() => setShowNotifications(true)}
                      className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                    >
                      <Bell className="h-4.5 w-4.5" />
                      <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                    </button>
                  </div>
                )}

                {dashboardTab === "reports" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs flex items-center gap-1">
                        <FileText className="h-4 w-4 text-[#0052CC] shrink-0" />
                        <span>PDF Reports</span>
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setShowNotifications(true)}
                        className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                      >
                        <Bell className="h-4.5 w-4.5" />
                        <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                      </button>
                    </div>
                  </div>
                )}

                {dashboardTab === "qr_scanner" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs flex items-center gap-1">
                        <QrCode className="h-4 w-4 text-[#0052CC] shrink-0" />
                        <span>QR Receipt Scanner</span>
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <button
                      onClick={() => setShowNotifications(true)}
                      className="p-1 text-slate-500 hover:text-[#0052CC] relative active:scale-95 transition-all"
                    >
                      <Bell className="h-4.5 w-4.5" />
                      <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-pulse"></span>
                    </button>
                  </div>
                )}

                {dashboardTab === "qr_monitor" && (
                  <div className="h-14 border-b border-slate-200/80 flex items-center justify-between px-3 text-[#0A2540] shrink-0 bg-white z-20">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-[#0A2540] transition-all active:scale-95 shrink-0"
                        title="Open Menu"
                      >
                        <Menu className="h-4.5 w-4.5" />
                      </button>
                      <span className="font-display font-extrabold text-[#0A2540] text-xs flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4 text-[#00875A] shrink-0" />
                        <span>QR Scans Monitor</span>
                      </span>
                      <button
                        onClick={() => {
                          const nextRole = userRole === "owner" ? "staff" : "owner";
                          setUserRole(nextRole);
                          showToast(`Role switched to ${nextRole.toUpperCase()}`, "info");
                        }}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          userRole === "owner" ? "bg-[#00875A]/10 text-[#00875A]" : "bg-[#0A2540]/10 text-[#0A2540]"
                        }`}
                      >
                        {userRole === "owner" ? "Owner 👑" : "Staff 👤"}
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setQrNotifications(prev => prev.map(n => ({ ...n, status: "verified" })));
                        showToast("All verified QR receipts acknowledged", "success");
                      }}
                      className="text-[8.5px] font-black bg-[#00875A]/10 text-[#00875A] px-2 py-1 rounded hover:bg-[#00875A]/20 transition-all active:scale-95 shrink-0"
                    >
                      Acknowledge
                    </button>
                  </div>
                )}

                {/* AREA TABS CORRESPONDING CODE */}
                <div className="flex-1 overflow-y-auto bg-white flex flex-col">

                  {/* TAB: OWNER CONSOLE */}
                  {dashboardTab === "owner_console" && (
                    userRole === "staff" ? (
                      <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-4 bg-white">
                        <div className="p-4 bg-[#0A2540]/10 text-[#0A2540] rounded-full animate-bounce">
                          <ShieldAlert className="h-8 w-8" />
                        </div>
                        <div className="space-y-2 max-w-[220px]">
                          <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                            Owner Access Only
                          </h4>
                          <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                            This workspace is restricted. Elevate your role to <span className="text-[#00875A] font-bold">'owner'</span> to review shop performance indices.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setUserRole("owner");
                            showToast("👑 Authenticated as Owner Mode", "success");
                            setDashboardTab("owner_console");
                          }}
                          className="w-full bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-bold text-[10px] py-2.5 rounded-xl transition-all"
                        >
                          Elevate to Owner Role (Demo)
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 bg-slate-50 p-4 space-y-4 overflow-y-auto text-left">
                        {/* Welcome Card banner styled with three-color corporate gradient! */}
                        <div className="bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] text-white p-3.5 rounded-2xl space-y-1 relative overflow-hidden shadow-md shadow-blue-950/15">
                          <div className="absolute right-0 bottom-0 opacity-15 translate-x-3 translate-y-3">
                            <Crown className="w-24 h-24 text-white" />
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-[#4CBB17] font-extrabold pb-0.5">Shop Command</p>
                          <h3 className="font-display font-black text-sm">CornerStreams Console</h3>
                          <p className="text-[10px] text-white/90 leading-normal font-sans">
                            Manage live transactions, staff, and overall performance.
                          </p>
                        </div>

                        {/* Currency & Network Mode Control Panel */}
                        <div className="bg-white border border-slate-100 p-3 rounded-2xl flex items-center justify-between shadow-xs gap-3">
                          <div className="space-y-0.5">
                            <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Display Currency</span>
                            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                              {(["NGN", "USD", "USDT"] as const).map((curr) => (
                                <button
                                  key={curr}
                                  onClick={() => {
                                    setActiveCurrency(curr);
                                    showToast(`Switched terminal view to ${curr}`, "success");
                                  }}
                                  className={`px-1.5 py-0.5 text-[8.5px] font-bold rounded-md transition-all ${
                                    activeCurrency === curr
                                      ? "bg-slate-900 text-white"
                                      : "text-slate-600 hover:text-slate-900"
                                  }`}
                                >
                                  {curr === "NGN" ? "₦ NGN" : curr === "USD" ? "$ USD" : "₮ USDT"}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="text-right space-y-1">
                            <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 block">POS Network Mode</span>
                            <button
                              onClick={() => {
                                const nextMode = !isOfflineMode;
                                setIsOfflineMode(nextMode);
                                if (!nextMode && offlineSalesQueue.length > 0) {
                                  // Auto sync queue!
                                  const queuedSum = offlineSalesQueue.reduce((a, b) => a + b.amount, 0);
                                  showToast(`🔄 Online restablished! Auto-syncing ${offlineSalesQueue.length} sales (Total: ₦${queuedSum.toLocaleString()}) to database...`, "success");
                                  
                                  // Update revenue in master
                                  if (activeShopId && setShopOwners) {
                                    setShopOwners((prev) =>
                                      prev.map((o) => {
                                        if (o.id === activeShopId) {
                                          const syncActivity = {
                                            id: `act_sync_${Date.now()}`,
                                            timestamp: new Date().toLocaleTimeString(),
                                            type: "Admin",
                                            description: `Successfully synchronized ${offlineSalesQueue.length} offline checkout items (₦${queuedSum.toLocaleString()} injected).`
                                          };
                                          return {
                                            ...o,
                                            cumulativeRevenue: o.cumulativeRevenue + queuedSum,
                                            offlineSalesQueue: [],
                                            activities: [syncActivity, ...o.activities]
                                          };
                                        }
                                        return o;
                                      })
                                    );
                                  }
                                  setOfflineSalesQueue([]);
                                } else {
                                  showToast(nextMode ? "🔌 Switched terminal to Offline Mode" : "📶 Terminals are online", "info");
                                }
                              }}
                              className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-lg shadow-xs transition-all ${
                                isOfflineMode
                                  ? "bg-yellow-500 text-slate-900 border border-yellow-400 animate-pulse"
                                  : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              }`}
                            >
                              {isOfflineMode ? (
                                <>
                                  <Wifi className="h-3 w-3 animate-bounce" />
                                  <span>Offline Mode ({offlineSalesQueue.length})</span>
                                </>
                              ) : (
                                <>
                                  <Activity className="h-3 w-3" />
                                  <span>Online POS</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Subscription Status Panel */}
                        <div className="bg-white border border-slate-100 p-3.5 rounded-2xl space-y-2 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540] flex items-center gap-1">
                              <span>💳 Subscription & Auto-Pay Status</span>
                            </span>
                            <span className="text-[7.5px] bg-[#0052CC]/15 text-[#0052CC] font-bold px-1.5 py-0.5 rounded uppercase">
                              {activePlanType === "trial" ? "1-Week Trial Active" : `${activePlanType.toUpperCase()} Tier Active`}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-1">
                            <div className="space-y-0.5">
                              <p className="text-[10.5px] font-bold text-[#0A2540]">
                                {activePlanType === "trial" ? (
                                  <>🎁 Free Trial: <span className="text-[#4CBB17] font-black">6 days left</span></>
                                ) : (
                                  <>⚡ Autopay Level: <span className="text-[#0052CC] font-black">Subscribed</span></>
                                )}
                              </p>
                              <p className="text-[8.5px] text-slate-400 font-sans leading-none mt-0.5">
                                Automatic subscription of {selectedPlan === "yearly" ? "₦42,000 yearly" : selectedPlan === "quarterly" ? "₦12,550 quarterly" : "₦5,000 monthly"} initiates June 26, 2026.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowSubscriptionDetailsSheet(true);
                                showToast("Opening Billing & Subscription Desk", "info");
                              }}
                              className="text-[8.5px] font-black text-[#0052CC] border border-blue-100 bg-[#0052CC]/5 px-2 py-1 rounded-lg hover:bg-[#0052CC] hover:text-white transition-all active:scale-95 shrink-0"
                            >
                              Manage Auto-Pay
                            </button>
                          </div>
                        </div>

                        {/* Responsive 2-column GRID view for Metrics and Operational Sections */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540] block">
                            Shop Indicators & Roles
                          </span>
                          <div className="grid grid-cols-2 gap-3">
                            {/* Metric 1 */}
                            <div className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col justify-between shadow-xs">
                              <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider">Today's Sales</span>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-sm font-black text-[#0A2540] font-mono">₦24,800</span>
                                <span className="text-[8.5px] font-bold text-[#00875A] flex items-center">↑ 12%</span>
                              </div>
                            </div>

                            {/* Metric 2 */}
                            <div className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col justify-between shadow-xs">
                              <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider">Net Profit</span>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-sm font-black text-[#00875A] font-mono">₦3,800</span>
                                <span className="text-[8.5px] font-bold text-[#00875A] flex items-center">↑ 8%</span>
                              </div>
                            </div>

                            {/* Metric 3 */}
                            <div className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col justify-between shadow-xs">
                              <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
                              <div className="mt-1 flex items-center gap-1.5">
                                <span className="text-sm font-black text-black font-mono">{lowStockCount} Items</span>
                                {lowStockCount > 0 && <span className="h-1.5 w-1.5 bg-[#0052CC] rounded-full animate-ping"></span>}
                              </div>
                            </div>

                            {/* Metric 4 */}
                            <div className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col justify-between shadow-xs">
                              <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider font-sans">Active Channels</span>
                              <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-sm font-black text-[#0052CC] font-mono">4 Streams</span>
                                <span className="text-[8.5px] font-bold text-[#0052CC]">Live</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Operations Center Grid */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540] block">
                            Operations Center
                          </span>
                          <div className="grid grid-cols-2 gap-3">
                            {/* Prominent Grid Card for "Manage Staff" */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowManageStaffOverlay(true);
                                showToast("Opening Staff Registry Desk", "info");
                              }}
                              className="bg-white border border-[#0052CC]/20 hover:border-[#0052CC] p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 p-1 text-[#0052CC]/10 group-hover:text-[#0052CC]/20 transition-colors">
                                <Users className="w-12 h-12 -mr-2 -mt-2" />
                              </div>
                              <span className="text-lg mb-1.5">👥</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight">Manage Staff</h4>
                              <p className="text-[9px] text-[#0052CC] font-bold mt-1">
                                {staffAccounts.length} Staff Logins
                              </p>
                            </button>

                            {/* Operational Card 2: Restock Quick Link */}
                            <button
                              type="button"
                              onClick={() => {
                                setDashboardTab("low_stock");
                                showToast("Navigating to Stock alerts", "info");
                              }}
                              className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95"
                            >
                              <span className="text-lg mb-1.5">📦</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight font-sans">Stock Alerts</h4>
                              <p className="text-[9px] text-slate-400 mt-1">Low-stock Warnings</p>
                            </button>

                            {/* Operational Card 3: Debtors Ledger Book */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowDebtorsOverlay(true);
                                showToast("Opening Customer Credit Book", "info");
                              }}
                              className="bg-white border border-rose-100 hover:border-rose-300 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <span className="text-lg mb-1.5">📕</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight">Ogbese Debt Book</h4>
                              <p className="text-[9px] text-rose-600 font-bold mt-1">
                                {debtors.length} Debtors Pending
                              </p>
                            </button>

                            {/* Operational Card 4: Multi-Branch & Warehouses */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowBranchesOverlay(true);
                                showToast("Loading Multi-Branch Registry", "info");
                              }}
                              className="bg-white border border-teal-100 hover:border-teal-300 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <span className="text-lg mb-1.5">📍</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight">Branch Registry</h4>
                              <p className="text-[9px] text-teal-600 font-bold mt-1">
                                {branches.length} Active Outlets
                              </p>
                            </button>

                            {/* Operational Card 5: Shift Auditing & Handovers */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowShiftOverlay(true);
                                showToast("Initiating Shift Balance Reconciliation", "info");
                              }}
                              className="bg-white border border-amber-100 hover:border-amber-300 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <span className="text-lg mb-1.5">⏱️</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight">Shift Handovers</h4>
                              <p className="text-[9px] text-amber-600 font-bold mt-1">
                                {shifts.length} Reconciliations
                              </p>
                            </button>

                            {/* Operational Card 6: Historical reports Vault */}
                            <button
                              type="button"
                              onClick={() => {
                                setDashboardTab("reports");
                                showToast("Entering PDF Ledger", "info");
                              }}
                              className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95"
                            >
                              <span className="text-lg mb-1.5">🧾</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight font-sans">PDF Archives</h4>
                              <p className="text-[9px] text-slate-400 mt-1">Download Ledger</p>
                            </button>

                            {/* Operational Card 7: Absentee Owner & Anti-Leakage Monitor */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowLeakageOverlay(true);
                                showToast("Opening Anti-Leakage Auditing Hub", "info");
                              }}
                              className="bg-white border border-rose-100 hover:border-rose-300 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <span className="text-lg mb-1.5">🛡️</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight font-sans">Anti-Leakage Control</h4>
                              <p className="text-[9px] text-rose-600 font-bold mt-1">
                                {terminalFrozen ? "🔒 POS Frozen" : "🛡️ Audit Shields Active"}
                              </p>
                            </button>

                            {/* Operational Card 8: WhatsApp Integration Hub */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowWhatsappOverlay(true);
                                showToast("Opening WhatsApp Integration Setup", "info");
                              }}
                              className="bg-white border border-emerald-100 hover:border-emerald-300 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <span className="text-lg mb-1.5">💬</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight">WhatsApp Sync</h4>
                              <p className="text-[9px] text-emerald-600 font-bold mt-1">
                                {isWhatsappSyncEnabled ? "✓ Connected" : "⏸ Offline"}
                              </p>
                            </button>

                            {/* Operational Card 9: Comprehensive Audit Logging UI */}
                            <button
                              type="button"
                              onClick={() => {
                                setShowAuditLogsOverlay(true);
                                showToast("Opening Forensic Audit logs", "info");
                              }}
                              className="bg-white border border-blue-100 hover:border-blue-300 p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <span className="text-lg mb-1.5">📋</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight font-sans">Audit Logs</h4>
                              <p className="text-[9px] text-blue-600 font-bold mt-1">
                                {auditLogs.length} Records
                              </p>
                            </button>

                            {/* Operational Card 10: QR Code Verification Monitor */}
                            <button
                              type="button"
                              onClick={() => {
                                setDashboardTab("qr_monitor");
                                showToast("Opening QR Verification Desk", "info");
                              }}
                              className="bg-white border border-[#00875A]/20 hover:border-[#00875A] p-3 rounded-xl flex flex-col text-left transition-all hover:shadow-xs active:scale-95 group relative overflow-hidden"
                            >
                              <div className="absolute top-0 right-0 p-1 text-[#00875A]/10 group-hover:text-[#00875A]/20 transition-colors">
                                <QrCode className="w-12 h-12 -mr-2 -mt-2" />
                              </div>
                              <span className="text-lg mb-1.5">🛡️</span>
                              <h4 className="font-bold text-xs text-[#0A2540] leading-tight font-sans">QR Monitor</h4>
                              <p className="text-[9px] text-[#00875A] font-bold mt-1 font-mono">
                                {qrNotifications.length} Verified Scans
                              </p>
                            </button>
                          </div>
                        </div>

                        {/* Info tip section */}
                        <div className="border border-slate-200/60 bg-white rounded-xl p-3 text-[10px] text-slate-500 text-left leading-normal space-y-1">
                          <strong className="text-[#0A2540] font-bold">Admin Stream Monitor</strong>
                          <p>As the business owner, you hold full root permissions. This terminal coordinates database writes from both your ledger and any registered staff member instances.</p>
                        </div>
                      </div>
                    )
                  )}

                  {/* TAB 0: COUNTER CURRENT BASKET */}
                  {dashboardTab === "counter" && (
                    terminalFrozen && userRole === "staff" ? (
                      <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-4 bg-rose-50/50">
                        <div className="p-4 bg-rose-100 text-rose-600 rounded-full animate-pulse border border-rose-200">
                          <Lock className="h-8 w-8" />
                        </div>
                        <div className="space-y-2 max-w-[220px]">
                          <h4 className="text-xs font-black text-rose-800 uppercase tracking-wider">
                            Terminal Remote-Locked
                          </h4>
                          <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                            This register has been remotely frozen by the primary shop administrator. Checkout transactions are suspended until unlocked.
                          </p>
                        </div>
                        <p className="text-[8px] font-mono font-black text-rose-600 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          🛡️ Leakage Guard Active
                        </p>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-between">
                      {/* CATEGORIES GRID FOR QUICK BROWSE */}
                      <div className="px-4 pt-3.5 pb-2 border-b border-slate-100 bg-[#FAFBFD]/70 shrink-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-black text-[#0A2540] uppercase tracking-wider block">
                            Browse Departments
                          </span>
                          <span className="text-[8px] bg-[#0052CC]/10 text-[#0052CC] font-bold px-1.5 py-0.5 rounded-full">
                            GridView.count
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { name: "All", label: "All Logs", color: "#0052CC", icon: "📦" },
                            { name: "Fabrics", label: "Fabrics", color: "#8B5CF6", icon: "🧵" },
                            { name: "Snacks", label: "Snacks", color: "#F59E0B", icon: "🍪" },
                            { name: "Electronics", label: "Devices", color: "#3B82F6", icon: "🔌" },
                          ].map((cat) => {
                            const isAct = selectedCategory === cat.name;
                            return (
                              <button
                                key={cat.name}
                                type="button"
                                onClick={() => {
                                  setSelectedCategory(cat.name);
                                  showToast(`Browsing ${cat.name} inventory...`, "info");
                                }}
                                className={`p-1.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                                  isAct
                                    ? "bg-white border-2 scale-[1.03] shadow-xs"
                                    : "bg-slate-50 border-slate-200/60"
                                }`}
                                style={{ borderColor: isAct ? cat.color : undefined }}
                              >
                                <span className="text-sm">{cat.icon}</span>
                                <span
                                  className="text-[8px] mt-0.5 font-bold truncate max-w-full"
                                  style={{ color: isAct ? cat.color : "#64748B" }}
                                >
                                  {cat.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Interactive scrollable list represent item row */}
                      <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-slate-100">
                        {products.filter((item) => selectedCategory === "All" || item.category === selectedCategory).length === 0 ? (
                          <div className="py-12 text-center space-y-2">
                            <span className="text-2xl">🔍</span>
                            <p className="text-[10px] text-slate-400 font-bold">No active items in {selectedCategory}</p>
                            <button
                              onClick={() => setDashboardTab("add_product")}
                              className="text-[9px] bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-150 text-white px-3 py-1.5 rounded-lg font-bold shadow-xs"
                            >
                              Add {selectedCategory} Item
                            </button>
                          </div>
                        ) : (
                          products
                            .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
                            .map((item) => {
                              const qty = basketQuantities[item.id] || 0;
                              return (
                                <div key={item.id} className="py-2.5 flex items-center justify-between gap-2 text-left">
                                  <div className="flex-1 min-w-0 flex items-center gap-2">
                                    {/* Small image avatar mock representing product image preview */}
                                    <div className="h-8 w-8 rounded-lg bg-slate-100 border border-slate-200/50 shrink-0 flex items-center justify-center overflow-hidden">
                                      {item.imageUrl ? (
                                        <img src={item.imageUrl} alt="preview" className="h-full w-full object-cover" />
                                      ) : (
                                        <span className="text-xs">
                                          {item.category === "Fabrics" ? "🧵" : item.category === "Electronics" ? "🔌" : "📦"}
                                        </span>
                                      )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-bold text-[#0A2540] truncate">
                                        {item.productName}
                                      </p>
                                      <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-[11px] font-bold text-[#0052CC]">
                                          ₦{item.sellingPrice.toLocaleString()}
                                        </span>
                                        <span className="text-[9px] text-[#0A2540]/30">•</span>
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                          item.currentStock <= 5 ? "bg-red-50 text-red-600" : "bg-[#0052CC]/10 text-[#0052CC]"
                                        }`}>
                                          Stock: {item.currentStock}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Quantitative counter stepper (+ / - controls) */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => handleAdjustBasket(item.id, "dec")}
                                      className="p-1 hover:bg-slate-50 text-[#0A2540] active:scale-90"
                                    >
                                      <MinusCircle className="h-4.5 w-4.5 rounded-full" />
                                    </button>
                                    <span className="w-6 text-center text-xs font-bold text-[#0A2540] font-mono">
                                      {qty}
                                    </span>
                                    <button
                                      onClick={() => handleAdjustBasket(item.id, "inc")}
                                      className="p-1 hover:bg-slate-50 text-[#0A2540] active:scale-90"
                                    >
                                      <PlusCircle className="h-4.5 w-4.5 rounded-full" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                        )}
                      </div>

                      {/* Summary Blocks bottom structure */}
                      <div className="bg-[#FAF9FB] border-t border-slate-200/80 p-4 space-y-3.5">
                        {/* Choice Chips for payment selections */}
                        <div className="flex items-center gap-1 text-[10px] text-[#0A2540] font-bold">
                          <span>Pay Type:</span>
                          <div className="flex gap-1.5 flex-1 justify-between pl-1">
                            {(["Cash", "Bank Transfer", "POS Card"] as const).map((method) => {
                              const isSel = selectedPayment === method;
                              return (
                                <button
                                  key={method}
                                  type="button"
                                  onClick={() => setSelectedPayment(method)}
                                  className={`px-2 py-1 rounded-full text-[9px] font-bold border transition-all truncate ${
                                    isSel
                                      ? "bg-[#0A2540] text-white border-[#0A2540]"
                                      : "bg-white text-slate-500 border-slate-200"
                                  }`}
                                >
                                  {method}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Large Tally Summary layout formatted to large Bold price */}
                        <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                          <span className="text-xs font-bold text-[#0A2540]">Total Sum:</span>
                          <span className="text-lg font-black text-[#0A2540] font-mono">
                            ₦{getBasketTotal().toLocaleString()}.00
                          </span>
                        </div>

                        {/* Royal Blue Solid Button */}
                        <button
                          onClick={handleCompleteSale}
                          className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white font-sans font-bold text-xs py-3.5 rounded-xl transition-all duration-155 flex items-center justify-center gap-1.5 shadow"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Complete Sale</span>
                        </button>
                      </div>
                    </div>
                    )
                  )}

                  {/* TAB 1: ADD NEW PRODUCT SCREEN */}
                  {dashboardTab === "add_product" && (
                    <form onSubmit={handleAddNewProductSubmit} className="flex-1 p-4 space-y-4 text-left overflow-y-auto">
                      
                      {/* Product Image Placement Selection Layout */}
                      <div className="space-y-1.5 text-center">
                        <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block text-left">
                          Product Image Selection
                        </label>
                        <div
                          onClick={() => setShowImagePicker(true)}
                          className="w-full aspect-square max-h-[120px] mx-auto border-2 border-dashed border-slate-200 hover:border-[#0052CC]/50 bg-slate-50 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer group transition-all"
                        >
                          {selectedImage ? (
                            <div className="relative h-full w-full rounded-lg overflow-hidden flex items-center justify-center">
                              <img src={selectedImage} alt="selected" className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] text-white font-bold bg-[#0A2540]/80 px-2 py-1 rounded">Change Photo</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-1">
                              <div className="p-2 bg-white inline-block shadow-sm rounded-full group-hover:scale-105 transition-all text-slate-400 group-hover:text-[#0052CC] mx-auto mb-1">
                                <Camera className="h-4 w-4" />
                              </div>
                              <span className="text-[9px] text-[#0A2540] font-bold block leading-none">pickProductImage()</span>
                              <span className="text-[8px] text-slate-405 text-slate-400 font-sans block mt-0.5">Camera snap or Upload gallery file</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tap to Scan Barcode mimicking card */}
                      <div
                        onClick={handleScanBarcode}
                        className="bg-[#0052CC]/10 border border-[#0052CC]/20 p-3.5 rounded-xl text-[#0052CC] text-center cursor-pointer transition-all duration-150 active:scale-[0.98] space-y-1"
                      >
                        <QrCode className="h-5 w-5 mx-auto text-[#0052CC]" />
                        <h4 className="font-bold text-[11px]">Tap to Scan Barcode</h4>
                        <p className="text-[9px] text-slate-500">Auto-fills metadata instantly</p>
                      </div>

                      {/* Fields with light gray borders & floating labels */}
                      <div className="space-y-3.5 pt-1">
                        {/* Name */}
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">Product Name</label>
                          <input
                            type="text"
                            value={newProdName}
                            onChange={(e) => setNewProdName(e.target.value)}
                            placeholder="e.g. Indomie Super Pack"
                            className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-[#0A2540]"
                          />
                          {newProdErrors.name && <p className="text-[9px] font-semibold text-red-500">{newProdErrors.name}</p>}
                        </div>

                        {/* Category selection */}
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">Product Category</label>
                          <div className="relative">
                            <select
                              value={newProdCategory}
                              onChange={(e) => setNewProdCategory(e.target.value)}
                              className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-[#0A2540] appearance-none cursor-pointer font-medium"
                            >
                              <option value="Snacks">🍪 Snacks & Drinks</option>
                              <option value="Fabrics">🧵 Fabrics & Textiles</option>
                              <option value="Electronics">🔌 Electronics & Devices</option>
                              <option value="Beverages">🥛 Beverages & Dairy</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">
                              ▼
                            </div>
                          </div>
                        </div>

                        {/* Prices Side by Side */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-0.5">
                            <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">Cost Price (₦)</label>
                            <input
                              type="number"
                              value={newCostPrice}
                              onChange={(e) => setNewCostPrice(e.target.value)}
                              placeholder="e.g. 5200"
                              className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-[#0A2540]"
                            />
                            {newProdErrors.cost && <p className="text-[9px] font-semibold text-red-500">{newProdErrors.cost}</p>}
                          </div>
                          <div className="space-y-0.5">
                            <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">Selling Price (₦)</label>
                            <input
                              type="number"
                              value={newSellingPrice}
                              onChange={(e) => setNewSellingPrice(e.target.value)}
                              placeholder="e.g. 6000"
                              className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-[#0A2540]"
                            />
                            {newProdErrors.selling && <p className="text-[9px] font-semibold text-red-500">{newProdErrors.selling}</p>}
                          </div>
                        </div>

                        {/* Stock */}
                        <div className="space-y-0.5">
                          <label className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider block">Initial Stock Quantity</label>
                          <input
                            type="number"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            placeholder="e.g. 50"
                            className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-[#0A2540]"
                          />
                          {newProdErrors.stock && <p className="text-[9px] font-semibold text-red-500">{newProdErrors.stock}</p>}
                        </div>
                      </div>

                      {/* Kelly Green Save Button */}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-white font-sans font-bold text-xs py-3.5 rounded-xl transition-all duration-155 mt-4"
                      >
                        Save Product to Inventory
                      </button>
                    </form>
                  )}

                  {/* TAB 2: LOW STOCK ALERTS STREAM LOGS */}
                  {dashboardTab === "low_stock" && (
                    <div className="flex-1 p-4 space-y-3 font-sans">
                      {products.filter((p) => p.currentStock <= lowStockThreshold).length === 0 ? (
                        <div className="flex-1 flex flex-col justify-center items-center text-center py-12 space-y-3">
                          <CheckCircle className="h-12 w-12 text-[#00875A]" />
                          <h4 className="text-xs font-bold text-[#0A2540]">All Stock Levels Healthy!</h4>
                          <p className="text-[11px] text-slate-400 max-w-[200px]">No products are currently critical or at &lt;= {lowStockThreshold} stock counts.</p>
                        </div>
                      ) : (
                        products.filter((p) => p.currentStock <= lowStockThreshold).map((prod) => (
                          <div key={prod.id} className="bg-red-50/70 border border-red-100 rounded-xl p-3 flex items-center justify-between gap-3 text-left">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-red-950 truncate">{prod.productName}</p>
                              <p className="text-[10px] text-red-400 mt-0.5">₦{prod.sellingPrice.toLocaleString()} • Fast Track Alert</p>
                            </div>
                            <span className="bg-red-500 text-white font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0">
                              {prod.currentStock} units
                            </span>
                          </div>
                        ))
                      )}

                      {/* Visual instructions details block */}
                      <div className="border border-slate-100 bg-slate-50 rounded-xl p-3 text-[10px] text-slate-400 text-left leading-normal space-y-1 mt-6">
                        <strong className="text-[#0A2540]">Low Stock Stream Active</strong>
                        <p>This panel listens live to database triggers. If stock values decrement below the configured threshold of <span className="font-bold text-[#0A2540]">{lowStockThreshold} units</span>, items are instantly visible here for quick restock actions.</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: SCHEDULED PDF REPORTS PANEL */}
                  {dashboardTab === "reports" && (
                    userRole === "staff" ? (
                      <div className="flex-1 p-4 space-y-4 text-left overflow-y-auto flex flex-col bg-white">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div>
                            <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                              🧾 Cashier Sales & Shift Audit Feed
                            </h4>
                            <p className="text-[8.5px] text-slate-400 mt-0.5">Logged in as {userRole.toUpperCase()}</p>
                          </div>
                          <span className="text-[8px] bg-amber-500/10 text-amber-500 font-bold px-1.5 py-0.5 rounded font-mono uppercase tracking-wider animate-pulse">Audit Active</span>
                        </div>

                        {/* Staff Sub Tabs */}
                        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveAnalyticsSubTab("receipts")}
                            className={`flex-1 text-[10.5px] font-bold py-1.5 rounded-lg text-center transition-all ${
                              activeAnalyticsSubTab === "receipts" || activeAnalyticsSubTab === "analytics"
                                ? "bg-white text-[#0052CC] shadow-xs"
                                : "text-slate-500 hover:text-[#0A2540]"
                            }`}
                          >
                            🧾 Sales Receipts
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveAnalyticsSubTab("archives")}
                            className={`flex-1 text-[10.5px] font-bold py-1.5 rounded-lg text-center transition-all ${
                              activeAnalyticsSubTab === "archives"
                                ? "bg-white text-[#0052CC] shadow-xs"
                                : "text-slate-500 hover:text-[#0A2540]"
                            }`}
                          >
                            ⚡ Activity Feed
                          </button>
                        </div>

                        {activeAnalyticsSubTab === "archives" ? (
                          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                              <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider block">Terminal Operational Audits</span>
                              <p className="text-[8.5px] text-slate-500 leading-normal mt-1">
                                Every action (opening drawer, stock addition, void transaction) is digitally fingerprinted to prevent retail leakage.
                              </p>
                            </div>

                            <div className="space-y-2">
                              {/* Show the active shop's real-time activities */}
                              {(shopOwners.find((o) => o.id === activeShopId)?.activities || []).map((act, i) => (
                                <div key={i} className="text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                                  <div className="flex justify-between items-center text-[8px] font-mono text-slate-400">
                                    <span>{act.timestamp}</span>
                                    <span className="bg-slate-200 text-slate-600 px-1 rounded uppercase font-bold text-[7.5px]">{act.type}</span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed font-sans">{act.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* Render interactive receipts list */
                          renderReceiptsListModule()
                        )}
                      </div>
                    ) : (
                      <div className="flex-1 p-4 space-y-4 text-left overflow-y-auto flex flex-col">
                        
                        {/* Sub-Tab Navigation Bar */}
                        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveAnalyticsSubTab("analytics")}
                            className={`flex-1 text-[10.5px] font-bold py-1.5 rounded-lg text-center transition-all ${
                              activeAnalyticsSubTab === "analytics"
                                ? "bg-white text-[#0052CC] shadow-xs"
                                : "text-slate-500 hover:text-[#0A2540]"
                            }`}
                          >
                            📈 Analytics
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveAnalyticsSubTab("archives")}
                            className={`flex-1 text-[10.5px] font-bold py-1.5 rounded-lg text-center transition-all ${
                              activeAnalyticsSubTab === "archives"
                                ? "bg-white text-[#0052CC] shadow-xs"
                                : "text-slate-500 hover:text-[#0A2540]"
                            }`}
                          >
                            📄 Archives
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveAnalyticsSubTab("receipts")}
                            className={`flex-1 text-[10.5px] font-bold py-1.5 rounded-lg text-center transition-all ${
                              activeAnalyticsSubTab === "receipts"
                                ? "bg-white text-[#0052CC] shadow-xs"
                                : "text-slate-500 hover:text-[#0A2540]"
                            }`}
                          >
                            🧾 Receipts
                          </button>
                        </div>

                        {activeAnalyticsSubTab === "analytics" ? (
                          <div className="space-y-4 flex-1">
                            {(() => {
                              // Dynamically calculate based on start and end dates
                              const start = new Date(reportStartDate);
                              const end = new Date(reportEndDate);
                              const diffTime = Math.abs(end.getTime() - start.getTime());
                              const diffDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1);
                              
                              // Create structured metrics
                              const simulatedRevenue = diffDays * 26500;
                              const simulatedProfit = diffDays * 6800;
                              const simulatedLosses = diffDays * 310;
                              
                              return (
                                <div className="space-y-4">
                                  {/* Unified Receipt Sync Banner */}
                                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">🔄</span>
                                      <div>
                                        <p className="text-[9.5px] font-black text-[#0A2540]">Unified Receipt Sync</p>
                                        <p className="text-[7.5px] text-slate-400 font-sans">
                                          {isSyncingReceipts ? "Synchronizing offline queue with server..." : "✓ All terminals fully synced"}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (isSyncingReceipts) return;
                                        setIsSyncingReceipts(true);
                                        // add an audit log
                                        const newLog = {
                                          id: `aud_sync_${Date.now()}`,
                                          timestamp: new Date().toLocaleTimeString().slice(0, 5) + " " + new Date().toLocaleTimeString().slice(-2),
                                          type: "Stock Control",
                                          description: "Force Unified Receipt Sync triggered. Flushed 0 offline items. Handshake verified."
                                        };
                                        setAuditLogs(prev => [newLog, ...prev]);
                                        setTimeout(() => {
                                          setIsSyncingReceipts(false);
                                          showToast("Receipt Sync Complete! Terminals: 100%", "success");
                                        }, 1200);
                                      }}
                                      className="text-[8px] bg-white border border-slate-200 hover:border-[#0052CC] hover:text-[#0052CC] font-bold px-2 py-1 rounded-lg transition-all shadow-3xs"
                                    >
                                      {isSyncingReceipts ? "Syncing..." : "Sync Now"}
                                    </button>
                                  </div>

                                  {/* Date Selector Range Panel */}
                                  <div className="bg-white border border-slate-200/80 p-3 rounded-2xl space-y-2.5 shadow-3xs">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540] flex items-center gap-1">
                                        <span>📅 Report Period Selection</span>
                                      </span>
                                      <span className="text-[8px] font-bold text-[#0052CC] font-mono">
                                        Spans: {diffDays} {diffDays === 1 ? "day" : "days"}
                                      </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="space-y-1 text-left">
                                        <label className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest block">Start Date</label>
                                        <input
                                          type="date"
                                          value={reportStartDate}
                                          onChange={(e) => setReportStartDate(e.target.value)}
                                          className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-[9px] outline-none font-mono focus:border-[#0052CC] text-slate-700"
                                        />
                                      </div>
                                      <div className="space-y-1 text-left">
                                        <label className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest block">End Date</label>
                                        <input
                                          type="date"
                                          value={reportEndDate}
                                          onChange={(e) => setReportEndDate(e.target.value)}
                                          className="w-full bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-[9px] outline-none font-mono focus:border-[#0052CC] text-slate-700"
                                        />
                                      </div>
                                    </div>

                                    {/* Fast selector preset buttons */}
                                    <div className="flex gap-1.5 justify-end">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setReportStartDate("2026-07-02");
                                          setReportEndDate("2026-07-02");
                                          showToast("Filter: Today selected", "info");
                                        }}
                                        className="text-[7.5px] font-bold bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600 transition-colors"
                                      >
                                        Today
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setReportStartDate("2026-06-25");
                                          setReportEndDate("2026-07-02");
                                          showToast("Filter: Last 7 Days selected", "info");
                                        }}
                                        className="text-[7.5px] font-bold bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600 transition-colors"
                                      >
                                        Last 7 Days
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setReportStartDate("2026-06-01");
                                          setReportEndDate("2026-07-02");
                                          showToast("Filter: Last 30 Days selected", "info");
                                        }}
                                        className="text-[7.5px] font-bold bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded text-slate-600 transition-colors"
                                      >
                                        Month to Date
                                      </button>
                                    </div>
                                  </div>

                                  {/* Dynamic Live Metrics Row */}
                                  <div className="grid grid-cols-3 gap-1.5">
                                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-left">
                                      <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider">Revenue</span>
                                      <span className="text-[11.5px] font-black text-[#0A2540] font-mono block mt-0.5">₦{simulatedRevenue.toLocaleString()}</span>
                                      <span className="text-[7.5px] text-[#4CBB17] font-bold block mt-0.5 font-sans">↑ Dynamic Flow</span>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-left">
                                      <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider">Net Profit</span>
                                      <span className="text-[11.5px] font-black text-[#00875A] font-mono block mt-0.5">₦{simulatedProfit.toLocaleString()}</span>
                                      <span className="text-[7.5px] bg-[#00875A]/10 text-[#00875A] px-1 py-0.2 rounded font-black block mt-0.5 w-max">25.6% Margin</span>
                                    </div>
                                    <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-left">
                                      <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider font-sans">Net Losses</span>
                                      <span className="text-[11.5px] font-black text-rose-600 font-mono block mt-0.5">₦{simulatedLosses.toLocaleString()}</span>
                                      <span className="text-[7.5px] text-slate-400 font-sans block mt-0.5">Leakage Guarded</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Weekly Interactive Line Chart (Polished Custom SVG) */}
                            <div className="border border-slate-200 bg-white p-3 rounded-2xl space-y-2.5 shadow-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540]">
                                  📊 Weekly Sales Velocity Trend
                                </span>
                                <span className="text-[8px] text-slate-400 font-sans font-medium">Jun 15 - Jun 21, 2026</span>
                              </div>

                              {/* Interactive Tooltip readout */}
                              <div className="bg-[#0052CC]/5 border border-blue-100 p-1.5 rounded-lg text-center">
                                {hoveredDay ? (
                                  <p className="text-[9px] font-bold text-[#0052CC] font-sans">
                                    📅 {hoveredDay} Sales: <strong className="font-mono text-xs">₦{hoveredValue?.toLocaleString()}</strong>
                                  </p>
                                ) : (
                                  <p className="text-[8.5px] text-slate-400 font-sans flex items-center justify-center gap-1">
                                    <span>💡 Tap any node on the line to see exact value</span>
                                  </p>
                                )}
                              </div>

                              {/* SVG Canvas Area */}
                              <div className="w-full flex justify-center items-center">
                                <svg width="240" height="96" className="overflow-visible select-none">
                                  {/* Gridlines */}
                                  <line x1="0" y1="20" x2="240" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                                  <line x1="0" y1="50" x2="240" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                                  <line x1="0" y1="80" x2="240" y2="80" stroke="#e2e8f0" strokeWidth="1" />

                                  {/* Shaded Area Under Curve */}
                                  <path
                                    d="M 0 80 L 0 65.4 Q 20 62, 40 58.7 Q 60 55, 80 51 Q 100 56.7, 120 62.5 Q 140 46.7, 160 31 Q 180 23.8, 200 16.7 Q 220 37.3, 240 58 L 240 80 Z"
                                    fill="url(#gradient-chart)"
                                    opacity="0.12"
                                  />

                                  {/* Line Stroke */}
                                  <path
                                    d="M 0 65.4 Q 20 62, 40 58.7 Q 60 55, 80 51 Q 100 56.7, 120 62.5 Q 140 46.7, 160 31 Q 180 23.8, 200 16.7 Q 220 37.3, 240 58"
                                    fill="none"
                                    stroke="#0052CC"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                  />

                                  {/* Clickable circular nodes */}
                                  {[
                                    { d: "Monday", x: 0, y: 65.4, v: 12500 },
                                    { d: "Tuesday", x: 40, y: 58.7, v: 18200 },
                                    { d: "Wednesday", x: 80, y: 51, v: 24800 },
                                    { d: "Thursday", x: 120, y: 62.5, v: 15000 },
                                    { d: "Friday", x: 160, y: 31, v: 42000 },
                                    { d: "Saturday", x: 200, y: 16.7, v: 54200 },
                                    { d: "Sunday", x: 240, y: 58, v: 18800 }
                                  ].map((pt, i) => (
                                    <circle
                                      key={i}
                                      cx={pt.x}
                                      cy={pt.y}
                                      r={hoveredDay === pt.d ? "5" : "3.5"}
                                      fill={hoveredDay === pt.d ? "#4CBB17" : "#0052CC"}
                                      stroke="white"
                                      strokeWidth="1.5"
                                      className="cursor-pointer transition-all hover:scale-130"
                                      onMouseEnter={() => {
                                        setHoveredDay(pt.d);
                                        setHoveredValue(pt.v);
                                      }}
                                      onMouseLeave={() => {
                                        setHoveredDay(null);
                                        setHoveredValue(null);
                                      }}
                                      onClick={() => {
                                        setHoveredDay(pt.d);
                                        setHoveredValue(pt.v);
                                        showToast(`${pt.d}: ₦${pt.v.toLocaleString()} recorded!`, "info");
                                      }}
                                    />
                                  ))}

                                  {/* Gradient definitions */}
                                  <defs>
                                    <linearGradient id="gradient-chart" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor="#0052CC" />
                                      <stop offset="100%" stopColor="#ffffff" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>

                              {/* Chart labels row */}
                              <div className="flex justify-between px-1 text-[8.5px] font-bold text-slate-400 select-none">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                              </div>
                            </div>

                            {/* Product Popularity Breakdown */}
                            <div className="border border-slate-205 bg-white p-3.5 rounded-2xl space-y-2.5 shadow-xs text-left">
                              <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540] block">
                                👜 Product Categories Stream Share
                              </span>
                              
                              <div className="space-y-2">
                                {[
                                  { label: "Fabrics & Textiles", value: "₦92,000", pct: 50, color: "bg-[#0052CC]" },
                                  { label: "Provisions & Foods", value: "₦55,500", pct: 30, color: "bg-[#4CBB17]" },
                                  { label: "Beverages & Drinks", value: "₦38,000", pct: 20, color: "bg-purple-500" }
                                ].map((cat, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <div className="flex justify-between items-center text-[9.5px]">
                                      <span className="font-bold text-[#0A2540]">{cat.label}</span>
                                      <span className="font-mono text-slate-500 font-bold">{cat.value} ({cat.pct}%)</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Active Staff Sales Contributions & Performance */}
                            <div className="border border-slate-205 bg-white p-3.5 rounded-2xl space-y-2 shadow-xs text-left">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-black uppercase tracking-wider text-[#0A2540] block">
                                  👥 Live Staff Registry Performance
                                </span>
                                <span className="text-[8px] text-[#0052CC] font-bold">Today</span>
                              </div>

                              <div className="space-y-1.5">
                                {staffAccounts.map((st, i) => {
                                  const todaySales = st.salesToday || 0;
                                  const orders = st.ordersCount || 0;
                                  return (
                                    <div key={i} className="flex justify-between items-center p-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px]">
                                      <div className="flex items-center gap-1.5">
                                        <span className={`h-1.5 w-1.5 rounded-full ${st.isOnline ? "bg-[#4CBB17]" : "bg-slate-300"}`}></span>
                                        <div>
                                          <p className="font-black text-[#0A2540]">{st.username}</p>
                                          <p className="text-[8px] text-slate-400">{st.permissions || "Cashier Access"}</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-black text-[#00875A] font-mono">₦{todaySales.toLocaleString()}</p>
                                        <p className="text-[8px] text-slate-400 font-mono">{orders} Sales Made</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Channel Payment Distribution Breakdown */}
                            <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-150 grid grid-cols-3 gap-1 text-center">
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase font-black block">POS Streams</span>
                                <span className="text-[11px] font-bold text-[#0A2540] font-mono">66.8%</span>
                              </div>
                              <div className="border-x border-slate-200">
                                <span className="text-[8px] text-slate-400 uppercase font-black block">Cash Drawer</span>
                                <span className="text-[11px] font-bold text-[#0A2540] font-mono">23.5%</span>
                              </div>
                              <div>
                                <span className="text-[8px] text-slate-400 uppercase font-black block">Transfers</span>
                                <span className="text-[11px] font-bold text-[#0A2540] font-mono">9.7%</span>
                              </div>
                            </div>
                          </div>
                        ) : activeAnalyticsSubTab === "archives" ? (
                          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                            <div className="bg-[#0052CC]/5 border border-[#0052CC]/10 rounded-xl p-3.5 space-y-1 text-left">
                              <div className="flex items-center gap-1.5 text-[#0052CC]">
                                <Sparkles className="h-4 w-4 animate-pulse shrink-0" />
                                <h4 className="font-bold text-xs">Automated ERP Intelligence</h4>
                              </div>
                              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                                Instantly generate professional PDF ledgers outlining product/brand velocities, or download full-fidelity CSV spreadsheets for custom audits.
                              </p>
                            </div>

                            {/* Reports List */}
                            {[
                              { key: "daily", name: "Daily Register Audit", rev: "₦24,800", prof: "₦3,800", date: "Today", desc: "Daily transactional speed & shifts" },
                              { key: "weekly", name: "Weekly Performance Ledger", rev: "₦173,700", prof: "₦44,400", date: "Jun 15 - Jun 21", desc: "Weekly brand dynamics & staff index" },
                              { key: "monthly", name: "Monthly Cashflow Summary", rev: "₦637,000", prof: "₦128,000", date: "Current Month", desc: "Monthly ledger & inventory margin" },
                              { key: "quarterly", name: "Quarterly Strategic Review", rev: "₦6,200,000", prof: "₦1,320,000", date: "Current Quarter", desc: "Quarterly asset ledger & wholesale share" },
                              { key: "yearly", name: "Annual General Ledger", rev: "₦24,800,000", prof: "₦5,120,000", date: "Fiscal Year 2026", desc: "Tax audit & yearly corporate results" }
                            ].map((rep) => (
                              <div key={rep.key} className="border border-slate-200 bg-white shadow-3xs p-3 rounded-xl space-y-2.5 text-left transition-all hover:border-[#0052CC]/40">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2">
                                    <div className="p-2 bg-[#0052CC]/5 text-[#0052CC] rounded-lg mt-0.5">
                                      <FileText className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-[11px] text-[#0A2540]">{rep.name}</h4>
                                      <p className="text-[8.5px] text-slate-400 font-sans leading-normal">{rep.desc}</p>
                                      <span className="text-[7.5px] font-mono text-slate-400 bg-slate-100 px-1 rounded block w-max mt-0.5">{rep.date}</span>
                                    </div>
                                  </div>

                                  <div className="flex flex-col gap-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setPdfReportType(rep.key as any);
                                        setShowPdfModal(true);
                                        showToast(`Opening ${rep.name} PDF Preview...`, "success");
                                      }}
                                      className="p-1 px-2 bg-[#0052CC] text-white text-[8px] font-bold rounded-md flex items-center gap-0.5 transition-all hover:bg-[#0052CC]/90"
                                    >
                                      <FileText className="h-2.5 w-2.5" />
                                      <span>PDF</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleExportCSV(rep.key as any)}
                                      className="p-1 px-2 bg-[#4CBB17] text-white text-[8px] font-bold rounded-md flex items-center gap-0.5 transition-all hover:bg-[#4CBB17]/90"
                                    >
                                      <Download className="h-2.5 w-2.5" />
                                      <span>CSV</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="h-px bg-slate-100"></div>

                                <div className="grid grid-cols-3 gap-1 text-[8.5px] font-semibold text-slate-400">
                                  <div>
                                    <span className="block text-[7px] text-slate-400 uppercase font-bold tracking-wider">Revenue</span>
                                    <span className="font-mono font-bold text-slate-800">{rep.rev}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[7px] text-slate-400 uppercase font-bold tracking-wider">Profit</span>
                                    <span className="font-mono font-bold text-[#00875A]">{rep.prof}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[7px] text-slate-400 uppercase font-bold tracking-wider">Status</span>
                                    <span className="font-sans font-bold text-[#4CBB17] flex items-center gap-0.5">
                                      <span>●</span> Verified
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          renderReceiptsListModule()
                        )}

                      </div>
                    )
                  )}

                  {dashboardTab === "settings" && (
                    <div className="flex-1 p-4 space-y-4 font-sans text-left overflow-y-auto max-h-[500px]">
                      {/* Section 1: Dynamic Sales Tracker Goal Progress */}
                      <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl space-y-2.5">
                        <div className="flex items-center gap-1.5 text-[#0A2540]">
                          <Target className="h-4 w-4 text-[#0052CC]" />
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest">
                            Live Goal Tracker Status
                          </h4>
                        </div>
                        {/* Compute progress */}
                        {(() => {
                          const activeOwner = shopOwners.find((o) => o.id === activeShopId);
                          const totalRevenue = activeOwner?.cumulativeRevenue || 0;
                          const progressPct = Math.min(
                            100,
                            Math.round((totalRevenue / salesGoalDaily) * 100) || 0
                          );
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-bold text-slate-500">
                                <span>Today's Tracked: {formatValue(totalRevenue)}</span>
                                <span>Goal: {progressPct}%</span>
                              </div>
                              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  style={{ width: `${progressPct}%` }}
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    progressPct >= 100
                                      ? "bg-gradient-to-r from-[#00875A] to-[#4CBB17]"
                                      : "bg-[#0052CC]"
                                  }`}
                                ></div>
                              </div>
                              <p className="text-[8.5px] text-slate-400 leading-normal">
                                {progressPct >= 100
                                  ? "🎉 Amazing! You have shattered your daily sales target!"
                                  : `Keep pushing! You need ${formatValue(Math.max(0, salesGoalDaily - totalRevenue))} more to meet your daily target.`}
                              </p>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Section 2: Security & Password Update */}
                      <div className="bg-white border border-slate-150 p-3.5 rounded-2xl space-y-3 shadow-xs">
                        <div className="flex items-center gap-1.5 text-[#0A2540]">
                          <Lock className="h-4 w-4 text-[#0052CC]" />
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest">
                            Admin Passwords & Security
                          </h4>
                        </div>
                        <p className="text-[9px] text-slate-400 leading-normal">
                          Create a new strong login credential or update your current password. Changing passwords will update your active database records immediately.
                        </p>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              New Secure Password
                            </label>
                            <input
                              type="password"
                              value={settingsNewPassword}
                              onChange={(e) => setSettingsNewPassword(e.target.value)}
                              placeholder="At least 6 characters"
                              className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-[#0052CC]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={settingsConfirmPassword}
                              onChange={(e) => setSettingsConfirmPassword(e.target.value)}
                              placeholder="Re-enter password"
                              className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-[#0052CC]"
                            />
                          </div>

                          <div className="flex gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                // Random strong password generator
                                const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
                                let randPass = "";
                                for (let i = 0; i < 10; i++) {
                                  randPass += chars.charAt(Math.floor(Math.random() * chars.length));
                                }
                                setSettingsNewPassword(randPass);
                                setSettingsConfirmPassword(randPass);
                                showToast("Generated secure random password!", "info");
                              }}
                              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-[9px] py-2 rounded-lg transition-all text-center active:scale-95"
                            >
                              🔑 Generate Secure
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (!settingsNewPassword) {
                                  showToast("Please enter a new password", "error");
                                  return;
                                }
                                if (settingsNewPassword.length < 6) {
                                  showToast("Password must be at least 6 characters", "error");
                                  return;
                                }
                                if (settingsNewPassword !== settingsConfirmPassword) {
                                  showToast("Passwords do not match", "error");
                                  return;
                                }

                                // Update master password
                                if (activeShopId && setShopOwners) {
                                  setShopOwners((prev) =>
                                    prev.map((o) => {
                                      if (o.id === activeShopId) {
                                        const newActivity: ActivityLog = {
                                          id: `act_pass_${Date.now()}`,
                                          timestamp: new Date().toLocaleTimeString(),
                                          type: "Admin",
                                          description: "Shop Admin password updated from device settings."
                                        };
                                        return {
                                          ...o,
                                          password: settingsNewPassword,
                                          activities: [newActivity, ...o.activities]
                                        };
                                      }
                                      return o;
                                    })
                                  );
                                }
                                showToast("✓ Password updated successfully!", "success");
                                setSettingsNewPassword("");
                                setSettingsConfirmPassword("");
                              }}
                              className="flex-1 bg-[#00875A] hover:bg-[#00875A]/90 text-white font-sans font-bold text-[9px] py-2 rounded-lg transition-all text-center active:scale-95 shadow-sm"
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: App Configuration (Low Stock & Sales Goals) */}
                      <div className="bg-white border border-slate-150 p-3.5 rounded-2xl space-y-3.5 shadow-xs">
                        <div className="flex items-center gap-1.5 text-[#0A2540]">
                          <Sliders className="h-4 w-4 text-[#0052CC]" />
                          <h4 className="text-[10px] font-extrabold uppercase tracking-widest">
                            Shop Control Thresholds
                          </h4>
                        </div>

                        {/* Low Stock Threshold */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                            <span>Low Stock Alert Qty</span>
                            <span className="text-[#0052CC] font-mono bg-[#0052CC]/10 px-1.5 py-0.2 rounded">
                              {lowStockThreshold} units
                            </span>
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="30"
                            step="1"
                            value={lowStockThreshold}
                            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                            className="w-full accent-[#0052CC] h-1.5 bg-slate-150 rounded-lg cursor-pointer"
                          />
                          <p className="text-[8px] text-slate-400 font-sans leading-relaxed">
                            Currently, <span className="font-bold text-[#0A2540]">{lowStockCount} items</span> are flagged as low stock under this threshold.
                          </p>
                        </div>

                        {/* Daily Sales Tracker Goal */}
                        <div className="space-y-1 pt-1.5 border-t border-slate-100">
                          <label className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Daily Sales Goal (₦)
                          </label>
                          <input
                            type="number"
                            value={salesGoalDaily}
                            onChange={(e) => setSalesGoalDaily(Math.max(0, Number(e.target.value)))}
                            placeholder="e.g. 150000"
                            className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-[#0052CC]"
                          />
                        </div>

                        {/* Monthly Sales Tracker Goal */}
                        <div className="space-y-1 pt-1">
                          <label className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Monthly Sales Goal (₦)
                          </label>
                          <input
                            type="number"
                            value={salesGoalMonthly}
                            onChange={(e) => setSalesGoalMonthly(Math.max(0, Number(e.target.value)))}
                            placeholder="e.g. 2000000"
                            className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 px-3 py-2 rounded-xl outline-none focus:border-[#0052CC]"
                          />
                        </div>
                      </div>

                      {/* Section 4: General Info */}
                      <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl text-[9px] text-slate-500 space-y-1.5">
                        <strong className="text-[#0A2540] uppercase tracking-wider text-[8px] block">
                          Business Profile Metadata
                        </strong>
                        {(() => {
                          const activeOwner = shopOwners.find((o) => o.id === activeShopId);
                          return (
                            <div className="space-y-1 text-[8.5px] font-medium leading-relaxed">
                              <p>🏢 <span className="font-bold">Business Name:</span> {activeOwner?.businessName}</p>
                              <p>👑 <span className="font-bold">Admin/Owner:</span> {activeOwner?.ownerName}</p>
                              <p>🛡️ <span className="font-bold">Verified NIN:</span> {activeOwner?.ninVerifiedName || "Verified (NIMC)"} ({activeOwner?.nin})</p>
                              <p>📞 <span className="font-bold">WhatsApp Sync:</span> Connected ({activeOwner?.phoneNumber})</p>
                              <p>📦 <span className="font-bold">Plan Details:</span> {activeOwner?.activePlanType?.toUpperCase()} Unlimited</p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {dashboardTab === "qr_scanner" && (
                    <div className="flex-1 p-4 space-y-4 font-sans text-left overflow-y-auto max-h-[500px]">
                      {/* Interactive Header description */}
                      <div className="bg-indigo-50 border border-indigo-100/80 rounded-2xl p-3.5 space-y-1">
                        <h4 className="text-[11px] font-black text-[#0A2540] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="text-sm">📸</span> Real-time Verification Node
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Scan stock supplier delivery invoices or customer checkout payments to cryptographically authorize the inventory ledger.
                        </p>
                      </div>

                      {/* Select who is scanning */}
                      <div className="bg-white border border-slate-150 p-3 rounded-xl space-y-1.5 shadow-xs">
                        <label className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest block">Operator Signature</label>
                        <select
                          value={userRole === "owner" ? "Owner/Admin" : "staff_chinelo"}
                          disabled
                          className="w-full bg-slate-50 text-xs text-[#0A2540] border border-slate-200 px-3 py-2 rounded-xl outline-none"
                        >
                          <option value="Owner/Admin">👑 Owner/Admin (Primary)</option>
                          <option value="staff_chinelo">👤 staff_chinelo (Cashier Signature)</option>
                        </select>
                      </div>

                      {/* Camera Viewfinder simulator */}
                      <div className="relative aspect-square w-full max-w-[240px] mx-auto bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between p-4">
                        {/* Corner brackets */}
                        <div className="absolute top-4 left-4 h-5 w-5 border-t-2 border-l-2 border-indigo-500" />
                        <div className="absolute top-4 right-4 h-5 w-5 border-t-2 border-r-2 border-indigo-500" />
                        <div className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-indigo-500" />
                        <div className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-indigo-500" />

                        {/* Scanner Laser beam animation */}
                        {isScanning && (
                          <motion.div
                            initial={{ y: "0%" }}
                            animate={{ y: "100%" }}
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "linear",
                            }}
                            className="absolute left-4 right-4 h-0.5 bg-rose-500 shadow-[0_0_8px_#ef4444] z-10"
                          />
                        )}

                        {/* Inner status or scanned card */}
                        <div className="flex-1 flex flex-col justify-center items-center text-center p-3 z-10">
                          {scanStep === "idle" ? (
                            <div className="space-y-2">
                              <QrCode className="h-10 w-10 text-slate-400 mx-auto animate-pulse" />
                              <p className="text-[10px] font-bold text-slate-400">Ready to Scan Invoice</p>
                              <p className="text-[8px] text-slate-500 max-w-[180px] mx-auto">Select a preset simulation below and trigger the scan cycle.</p>
                            </div>
                          ) : scanStep === "scanning" ? (
                            <div className="space-y-2">
                              <RefreshCw className="h-8 w-8 text-indigo-400 mx-auto animate-spin" />
                              <p className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest animate-pulse">Scanning QR stream...</p>
                              <p className="text-[8px] text-slate-500 font-mono">HASH: 0x98f3b23e...</p>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="space-y-2 bg-slate-900/95 border border-[#00875A]/40 p-2.5 rounded-xl text-center"
                            >
                              <span className="text-lg">🟢</span>
                              <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">Verification Approved</h5>
                              <p className="text-[9px] text-slate-200 font-bold leading-normal truncate max-w-[160px]">{scannedResult?.title}</p>
                              <p className="text-[8px] text-emerald-400 font-mono font-black bg-[#00875A]/20 py-0.5 rounded px-1.5 inline-block">{scannedResult?.amount}</p>
                            </motion.div>
                          )}
                        </div>

                        {/* Helper overlay */}
                        <div className="text-center z-10 shrink-0">
                          <p className="text-[7.5px] font-mono text-slate-500 uppercase tracking-wider">
                            {isScanning ? "[CAMERA FEED LIVE]" : "[STANDBY NODE READY]"}
                          </p>
                        </div>
                      </div>

                      {/* Simulation Selectors */}
                      <div className="bg-white border border-slate-150 p-3.5 rounded-2xl space-y-3 shadow-xs">
                        <label className="text-[8.5px] font-extrabold text-slate-500 uppercase tracking-widest block">Simulation Presets</label>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            {
                              id: "preset_del_1",
                              type: "delivery",
                              title: "BUA Flour (50 bags)",
                              details: "Incoming delivery: 50x bags of BUA Premium Flour (Naira 450,000 value). Supplier: BUA Group. Confirmed by staff signature.",
                              amount: "₦450,000",
                              label: "📦 BUA Delivery"
                            },
                            {
                              id: "preset_pay_1",
                              type: "payment",
                              title: "POS Payment: Kolawole A.",
                              details: "Customer payment: Naira 62,500. POS Card transaction ref: TXN-POS-10928 verified. Customer: Kolawole Adebayo.",
                              amount: "₦62,500",
                              label: "💳 POS Payment"
                            },
                            {
                              id: "preset_del_2",
                              type: "delivery",
                              title: "Chi Foods Restock",
                              details: "Incoming delivery: 15x cartons of Chi Exotic juice packs (Naira 98,000 value). Supplier: Chi Limited. Inspected & approved.",
                              amount: "₦98,000",
                              label: "📦 Chi Restock"
                            },
                            {
                              id: "preset_pay_2",
                              type: "payment",
                              title: "Transfer: Ngozi N.",
                              details: "Customer payment: Naira 8,400. Direct Bank Transfer verified against bank API log. Customer: Ngozi Nkem.",
                              amount: "₦8,400",
                              label: "💳 Transfer Pay"
                            }
                          ].map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                if (isScanning) return;
                                setScannedResult(preset);
                                setScanStep("idle");
                                showToast(`Loaded preset: ${preset.title}`, "info");
                              }}
                              className={`p-2 rounded-xl text-left text-[9.5px] border transition-all ${
                                scannedResult?.id === preset.id
                                  ? "border-indigo-600 bg-indigo-50/40 text-[#0A2540] font-black"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50 bg-white"
                              }`}
                            >
                              <p className="truncate font-bold">{preset.label}</p>
                              <p className="text-[7.5px] text-slate-400 font-mono mt-0.5">{preset.amount}</p>
                            </button>
                          ))}
                        </div>

                        {/* Trigger button */}
                        <button
                          type="button"
                          onClick={() => {
                            if (!scannedResult) {
                              showToast("Please choose a preset above to simulate scanning", "error");
                              return;
                            }
                            if (isScanning) return;

                            setIsScanning(true);
                            setScanStep("scanning");

                            setTimeout(() => {
                              setIsScanning(false);
                              setScanStep("result");

                              // Create a new verified notification
                              const scanBy = userRole === "owner" ? "Owner/Admin" : "staff_chinelo";
                              const rightNow = new Date();
                              const timestamp = rightNow.toLocaleTimeString().slice(0, 5) + " " + rightNow.toLocaleTimeString().slice(-2);
                              const date = rightNow.toISOString().split("T")[0];

                              const newNotif = {
                                id: `qr_${Date.now()}`,
                                type: scannedResult.type,
                                title: scannedResult.type === "delivery" ? "Stock Delivery Scanned" : "Customer Payment Scanned",
                                details: scannedResult.details,
                                staff: scanBy,
                                timestamp: timestamp,
                                date: date,
                                amount: scannedResult.amount,
                                status: "verified"
                              };

                              setQrNotifications(prev => [newNotif, ...prev]);

                              // Add a forensic audit log
                              const newLog = {
                                id: `aud_qr_${Date.now()}`,
                                timestamp: timestamp,
                                type: "Stock Control",
                                description: `✓ QR SCAN VERIFIED: [${scannedResult.type.toUpperCase()}] ${scannedResult.title} parsed at register by ${scanBy}.`
                              };
                              setAuditLogs(prev => [newLog, ...prev]);

                              showToast("✓ QR Receipt Authenticated!", "success");
                            }, 1800);
                          }}
                          disabled={isScanning}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-center text-[10.5px] transition-all active:scale-95 disabled:opacity-50 shadow-md flex items-center justify-center gap-1.5"
                        >
                          <QrCode className="h-4 w-4" />
                          <span>{isScanning ? "Processing Cryptography..." : "📷 Simulate QR Scanner Click"}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {dashboardTab === "qr_monitor" && (
                    <div className="flex-1 p-4 space-y-4 font-sans text-left overflow-y-auto max-h-[500px]">
                      {/* Interactive Header description */}
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 space-y-1">
                        <h4 className="text-[11px] font-black text-[#0A2540] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="text-sm">🛡️</span> Principal QR Scans Ledger
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Monitor receipts cryptographically scanned by staff at checkout or inventory receiving bay. Backed by NIMC verification logic.
                        </p>
                      </div>

                      {/* Scans Timeline Feed list */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[8.5px] font-extrabold text-slate-500 uppercase tracking-wider">
                          <span>Live Verified Receipts Feed ({qrNotifications.length})</span>
                          <button
                            onClick={() => {
                              setQrNotifications([]);
                              showToast("QR Receipts ledger cleared", "info");
                            }}
                            className="text-red-500 hover:underline hover:text-red-600 font-black normal-case"
                          >
                            Clear Feed
                          </button>
                        </div>

                        {qrNotifications.length === 0 ? (
                          <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-2xl text-[10px] text-slate-400 italic">
                            No QR receipts scanned yet. 
                            <p className="text-[8px] font-sans text-slate-400 mt-1 not-italic">Go to 'Scan QR Receipt' in the menu to simulate a staff barcode audit!</p>
                          </div>
                        ) : (
                          <div className="space-y-2.5">
                            {qrNotifications.map((notif) => (
                              <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-slate-150 rounded-2xl p-3.5 space-y-3 shadow-xs relative overflow-hidden"
                              >
                                {/* Top colored ribbon bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 ${
                                  notif.type === "delivery" ? "bg-[#0052CC]" : "bg-[#4CBB17]"
                                }`} />

                                <div className="flex justify-between items-start pt-1">
                                  <div className="space-y-0.5 min-w-0 flex-1">
                                    <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${
                                      notif.type === "delivery" ? "bg-blue-50 text-[#0052CC]" : "bg-emerald-50 text-[#00875A]"
                                    }`}>
                                      {notif.type === "delivery" ? "📦 INVENTORY DELIVERY" : "💳 CUSTOMER CHECKOUT"}
                                    </span>
                                    <h5 className="font-extrabold text-[#0A2540] text-xs pt-1 truncate">{notif.title}</h5>
                                  </div>
                                  <span className="font-mono font-black text-[#0A2540] text-xs shrink-0 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-lg ml-2">
                                    {notif.amount}
                                  </span>
                                </div>

                                <p className="text-[10px] text-slate-500 leading-relaxed bg-slate-50/50 p-2 rounded-xl border border-slate-100 italic">
                                  "{notif.details}"
                                </p>

                                {/* Track-record footer details */}
                                <div className="grid grid-cols-2 gap-y-1.5 pt-2 border-t border-dashed border-slate-100 text-[8.5px] text-slate-500">
                                  <div>
                                    <span className="block text-slate-400 text-[7px] uppercase font-bold">Operator Signature</span>
                                    <strong className="text-slate-700 flex items-center gap-0.5 font-bold">
                                      👤 {notif.staff}
                                    </strong>
                                  </div>
                                  <div className="text-right">
                                    <span className="block text-slate-400 text-[7px] uppercase font-bold">Audit Stamp Date</span>
                                    <strong className="text-slate-600 font-mono">{notif.date} @ {notif.timestamp}</strong>
                                  </div>
                                </div>

                                {/* Cryptographic Badge */}
                                <div className="flex items-center justify-between bg-emerald-50/50 border border-emerald-100 p-2 rounded-xl mt-1.5">
                                  <span className="text-[8px] font-black text-emerald-700 uppercase tracking-wider flex items-center gap-0.5">
                                    ✓ SECURE BLOCK VERIFIED
                                  </span>
                                  <span className="text-[7.5px] text-slate-400 font-mono">MD5_HASH_OK</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* SIDEBAR NAVIGATION DRAWER */}
                <AnimatePresence>
                  {sidebarOpen && (
                    <>
                      {/* Dark Overlay Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="absolute inset-0 bg-slate-950/70 z-[80] cursor-pointer"
                      />

                      {/* Sliding Drawer Sidebar */}
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 220 }}
                        className="absolute top-0 bottom-0 left-0 w-52 bg-slate-900 text-white z-[90] flex flex-col shadow-2xl border-r border-slate-800"
                      >
                        {/* Drawer Header */}
                        <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 bg-gradient-to-r from-[#0052CC] to-[#4CBB17] rounded-lg flex items-center justify-center font-bold text-[10px] text-white">
                              CSB
                            </div>
                            <div>
                              <h3 className="font-display font-extrabold text-white text-[10px] leading-none">CORNER STREAMS</h3>
                              <p className="text-[7px] font-bold text-emerald-400 mt-0.5 tracking-wider uppercase">ERP LEDGER</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-all active:scale-90"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Drawer Body - Navigation Links */}
                        <div className="flex-1 overflow-y-auto p-2.5 space-y-1 text-left">
                          <p className="text-[7.5px] font-black text-slate-500 uppercase tracking-widest px-2 py-1 select-none">
                            Shop Sectors
                          </p>

                          {userRole === "owner" && (
                            <button
                              onClick={() => {
                                setDashboardTab("owner_console");
                                setSidebarOpen(false);
                                showToast("Opened Owner Console", "success");
                              }}
                              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                                dashboardTab === "owner_console"
                                  ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500"
                                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                              }`}
                            >
                              <Crown className="h-4 w-4 text-emerald-400 shrink-0" />
                              <span>Owner Console</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setDashboardTab("counter");
                              setSidebarOpen(false);
                              showToast("Opened Sales Counter Basket", "success");
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                              dashboardTab === "counter"
                                ? "bg-blue-500/10 text-blue-400 border-l-4 border-[#0052CC]"
                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                            }`}
                          >
                            <ShoppingCart className="h-4 w-4 text-blue-400 shrink-0" />
                            <span>Sales Counter</span>
                          </button>

                          <button
                            onClick={() => {
                              setDashboardTab("add_product");
                              setSidebarOpen(false);
                              showToast("Opened Add Product Form", "success");
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                              dashboardTab === "add_product"
                                ? "bg-blue-500/10 text-blue-400 border-l-4 border-[#0052CC]"
                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                            }`}
                          >
                            <PlusCircle className="h-4 w-4 text-blue-400 shrink-0" />
                            <span>Add Product</span>
                          </button>

                          <button
                            onClick={() => {
                              setDashboardTab("low_stock");
                              setSidebarOpen(false);
                              showToast("Opened Low Stock Warnings", "success");
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                              dashboardTab === "low_stock"
                                ? "bg-blue-500/10 text-blue-400 border-l-4 border-[#0052CC]"
                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                              <span className="truncate">Low Stock</span>
                            </div>
                            {lowStockCount > 0 && (
                              <span className="bg-amber-500/20 text-amber-400 font-mono text-[8px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                                {lowStockCount}
                              </span>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setDashboardTab("reports");
                              setSidebarOpen(false);
                              showToast("Opened Sales Ledger reports", "success");
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                              dashboardTab === "reports"
                                ? "bg-blue-500/10 text-blue-400 border-l-4 border-[#0052CC]"
                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                            }`}
                          >
                            <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                            <span>Ledger Reports</span>
                          </button>

                          {userRole === "owner" && (
                            <button
                              onClick={() => {
                                setDashboardTab("settings");
                                setSidebarOpen(false);
                                showToast("Opened Shop Settings screen", "success");
                              }}
                              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                                dashboardTab === "settings"
                                  ? "bg-blue-500/10 text-blue-400 border-l-4 border-[#0052CC]"
                                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                              }`}
                            >
                              <Settings className="h-4 w-4 text-slate-400 shrink-0" />
                              <span>Shop Settings</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setDashboardTab("qr_scanner");
                              setSidebarOpen(false);
                              showToast("Opened QR Receipt Scanner", "success");
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                              dashboardTab === "qr_scanner"
                                ? "bg-blue-500/10 text-blue-400 border-l-4 border-[#0052CC]"
                                : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                            }`}
                          >
                            <QrCode className="h-4 w-4 text-indigo-400 shrink-0" />
                            <span>Scan QR Receipt</span>
                          </button>

                          {userRole === "owner" && (
                            <button
                              onClick={() => {
                                setDashboardTab("qr_monitor");
                                setSidebarOpen(false);
                                showToast("Opened QR Scans Monitor", "success");
                              }}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all text-[11px] font-bold ${
                                dashboardTab === "qr_monitor"
                                  ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500"
                                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span className="truncate">QR Monitor</span>
                              </div>
                              {qrNotifications.length > 0 && (
                                <span className="bg-emerald-50/20 text-[#00875A] font-mono text-[8px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                                  {qrNotifications.length}
                                </span>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-3 bg-slate-950 border-t border-slate-850 space-y-2 text-left shrink-0">
                          <div className="flex items-center gap-1.5 px-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <div className="min-w-0">
                              <p className="text-[8.5px] font-black text-white truncate uppercase">
                                {userRole === "owner" ? "Owner 👑" : "Cashier 👤"}
                              </p>
                              <p className="text-[7.5px] text-slate-500 truncate">
                                {userRole === "owner" ? "adewale@mart.ng" : "staff_chinelo"}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => {
                              setSidebarOpen(false);
                              setCurrentScreen("login");
                              showToast("Logged out successfully", "info");
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all text-[10px] font-bold text-rose-400 hover:bg-rose-500/10"
                          >
                            <LogOut className="h-3.5 w-3.5 shrink-0" />
                            <span>Logout System</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* FLOATING SIDEBAR TOGGLE GRABBER BAR */}
                {!sidebarOpen && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSidebarOpen(true)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0A2540] text-white p-1 rounded-r-lg shadow-lg z-30 flex flex-col items-center gap-1 cursor-pointer py-3.5 hover:bg-[#0052CC] active:scale-95 transition-all"
                  >
                    <Menu className="h-3 w-3" />
                    <span className="text-[6.5px] font-black tracking-widest writing-mode-vertical [writing-mode:vertical-lr] select-none text-slate-300">
                      NAV
                    </span>
                  </motion.button>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM HOME BAR */}
        <div className="h-4 flex items-center justify-center pb-1 pointer-events-none select-none shrink-0 z-30">
          <div className="w-24 h-1 bg-slate-300 rounded-full"></div>
        </div>

      </div>

      {/* WHATSAPP OVERHEAD FLOATING NOTIFICATION BANNER SLIDE DOWN */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            className="absolute top-9 left-4 right-4 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-3 border border-[#00875A]/20 flex items-start gap-2.5 z-[100] cursor-pointer"
            onClick={() => {
              if (currentScreen === "login" && forgotOTPEmulate) {
                setForgotOTPCode(forgotOTPEmulate);
                showToast("Recovery OTP auto-filled into verification box!", "success");
                setShowNotification(false);
              } else if (whatsappCode) {
                const parts = whatsappCode.split("");
                setEnteredCode(parts);
                showToast("Verification code pasted from WhatsApp notification buffer!", "success");
                setShowNotification(false);
              }
            }}
          >
            <div className="h-8 w-8 bg-[#00875A] rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5">
              <Phone className="h-4.5 w-4.5 fill-white" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#00875A] font-sans">WhatsApp Business</span>
                <span className="text-[9px] text-[#0A2540]/40 font-semibold">Just now</span>
              </div>
              {forgotOTPEmulate ? (
                <>
                  <p className="text-[10px] font-black text-[#0A2540] truncate mt-0.5">Password Recovery OTP Request</p>
                  <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">
                    Your CBS Account Recovery Code is: <strong className="text-[#0052CC] font-mono text-[11px] tracking-wide">{forgotOTPEmulate}</strong>. Use to verify registered ownership.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-black text-[#0A2540] truncate mt-0.5">OTP verification requested!</p>
                  <p className="text-[10px] text-slate-500 font-sans leading-relaxed mt-0.5">
                    Corner Streams Code: <strong className="text-[#0052CC] font-mono text-[11px] tracking-wide">{whatsappCode}</strong>. Use to complete register sequence.
                  </p>
                </>
              )}
              <span className="text-[8px] font-semibold text-[#0052CC] block mt-1 hover:underline">⚡ Tap to auto-paste code</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING SUCCESS INVOICE MODAL BACKDROP (Checkout dialog) */}
      <AnimatePresence>
        {showInvoiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-5 shadow-xl w-full max-w-[270px] space-y-4 text-left border border-slate-100"
            >
              <div className="text-center space-y-1">
                <div className="h-10 w-10 bg-[#00875A]/10 rounded-2xl flex items-center justify-center text-[#00875A] mx-auto">
                  <Check className="h-5 w-5 stroke-[3]" />
                </div>
                <h4 className="font-display font-black text-[#0A2540] text-sm">Sale Logged Securely!</h4>
                <p className="text-[10px] text-slate-400 font-sans">Stream logged via Firebase Transaction</p>
              </div>

              <div className="border border-slate-100 bg-slate-55 rounded-xl p-3 space-y-2 text-[11px] text-slate-600 font-sans">
                <div className="flex justify-between items-center text-[9px] font-semibold font-mono pb-1.5 border-b border-dashed border-slate-200">
                  <span>TXN: FX-8A92B3</span>
                  <span>UTC NOW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pay Mode:</span>
                  <strong className="text-slate-800">{selectedPayment}</strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Receipt Total:</span>
                  <strong className="text-[#00875A] text-xs">₦{lastTxnTotal.toLocaleString()}.00</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-white font-sans font-bold text-xs py-2.5 rounded-xl transition-all duration-155 shadow-xs"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-5 shadow-xl w-full max-w-[270px] space-y-4 text-left border border-slate-100"
            >
              <div className="space-y-1">
                <h4 className="font-display font-bold text-[#0A2540] text-sm">
                  Forgot Password Recovery
                </h4>
                <p className="text-[10px] text-slate-500 font-sans leading-normal">
                  {forgotStep === 1 && "Select your shop account and input your registered WhatsApp phone number."}
                  {forgotStep === 2 && "A 6-digit recovery OTP has been sent via WhatsApp secure gateway."}
                  {forgotStep === 3 && "Verification complete! Create and confirm your new admin password."}
                </p>
              </div>

              {forgotStep === 1 && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      Select Shop Owner Account
                    </label>
                    <select
                      value={forgotSelectedShopOwnerId || ""}
                      onChange={(e) => {
                        setForgotSelectedShopOwnerId(e.target.value);
                        setForgotError("");
                      }}
                      className="w-full bg-slate-50 text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-2 rounded-xl font-sans"
                    >
                      <option value="">-- Choose Account --</option>
                      {shopOwners.map((owner) => (
                        <option key={owner.id} value={owner.id}>
                          👑 {owner.ownerName} ({owner.businessName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      Registered Phone Number
                    </label>
                    <input
                      type="text"
                      value={forgotPhoneInput}
                      onChange={(e) => {
                        setForgotPhoneInput(e.target.value.replace(/\D/g, ""));
                        setForgotError("");
                      }}
                      placeholder="e.g. 08123456789"
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-2.5 rounded-xl font-mono"
                    />
                    {forgotSelectedShopOwnerId && (
                      <p className="text-[8px] text-slate-400">
                        Hint: Previously registered phone is{" "}
                        <span className="font-bold text-[#0052CC]">
                          {shopOwners.find((o) => o.id === forgotSelectedShopOwnerId)?.phoneNumber || "N/A"}
                        </span>
                      </p>
                    )}
                  </div>

                  {forgotError && (
                    <p className="text-[9px] font-semibold text-red-500">{forgotError}</p>
                  )}

                  <div className="flex justify-end gap-1.5 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotModal(false);
                        setForgotStep(1);
                      }}
                      className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!forgotSelectedShopOwnerId) {
                          setForgotError("Please select your account");
                          return;
                        }
                        const targetOwner = shopOwners.find((o) => o.id === forgotSelectedShopOwnerId);
                        if (!targetOwner) return;

                        if (!forgotPhoneInput.trim()) {
                          setForgotError("Please input your registered phone number");
                          return;
                        }

                        if (forgotPhoneInput.trim() !== targetOwner.phoneNumber.trim()) {
                          setForgotError("Entered phone number does not match registered WhatsApp number.");
                          return;
                        }

                        // Generate OTP
                        const recoveryOtp = Math.floor(100000 + Math.random() * 900000).toString();
                        setForgotOTPEmulate(recoveryOtp);
                        setForgotOTPCode("");
                        setForgotError("");
                        setForgotStep(2);
                        
                        // Show WhatsApp Notification
                        setTimeout(() => {
                          setShowNotification(true);
                        }, 500);

                        showToast("Securing terminal recovery OTP...", "success");
                      }}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 text-white rounded-lg font-bold transition-all"
                    >
                      Verify Number
                    </button>
                  </div>
                </div>
              )}

              {forgotStep === 2 && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={forgotOTPCode}
                      onChange={(e) => {
                        setForgotOTPCode(e.target.value.replace(/\D/g, ""));
                        setForgotError("");
                      }}
                      placeholder="Enter 6-digit code"
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-2.5 rounded-xl font-mono text-center tracking-widest text-sm"
                    />
                    <p className="text-[8px] text-slate-400 text-center">
                      Tap the WhatsApp slide banner notification above to autofill.
                    </p>
                  </div>

                  {forgotError && (
                    <p className="text-[9px] font-semibold text-red-500 text-center">{forgotError}</p>
                  )}

                  <div className="flex justify-end gap-1.5 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 rounded-lg font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (forgotOTPCode !== forgotOTPEmulate) {
                          setForgotError("Incorrect code. Please verify.");
                          return;
                        }
                        setForgotError("");
                        setForgotStep(3);
                        setForgotNewPassword("");
                        setForgotConfirmPassword("");
                        showToast("OTP code verified! Reset authorized.", "success");
                      }}
                      className="px-3.5 py-1.5 bg-[#00875A] text-white rounded-lg font-bold transition-all"
                    >
                      Verify Code
                    </button>
                  </div>
                </div>
              )}

              {forgotStep === 3 && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={forgotNewPassword}
                      onChange={(e) => {
                        setForgotNewPassword(e.target.value);
                        setForgotError("");
                      }}
                      placeholder="At least 6 characters"
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-2 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={forgotConfirmPassword}
                      onChange={(e) => {
                        setForgotConfirmPassword(e.target.value);
                        setForgotError("");
                      }}
                      placeholder="Repeat password"
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-2 rounded-xl"
                    />
                  </div>

                  {forgotError && (
                    <p className="text-[9px] font-semibold text-red-500">{forgotError}</p>
                  )}

                  <div className="flex justify-end gap-1.5 pt-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setForgotStep(2)}
                      className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 rounded-lg font-bold"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!forgotNewPassword) {
                          setForgotError("Please enter a new password");
                          return;
                        }
                        if (forgotNewPassword.length < 6) {
                          setForgotError("Password must be at least 6 characters");
                          return;
                        }
                        if (forgotNewPassword !== forgotConfirmPassword) {
                          setForgotError("Passwords do not match");
                          return;
                        }

                        // Execute real password update in database array
                        if (forgotSelectedShopOwnerId && setShopOwners) {
                          setShopOwners((prev) =>
                            prev.map((o) => {
                              if (o.id === forgotSelectedShopOwnerId) {
                                const log: ActivityLog = {
                                  id: `act_rec_${Date.now()}`,
                                  timestamp: new Date().toLocaleTimeString(),
                                  type: "Admin",
                                  description: "Password reset completed via WhatsApp 2-Step recovery."
                                };
                                return {
                                  ...o,
                                  password: forgotNewPassword,
                                  activities: [log, ...o.activities]
                                };
                              }
                              return o;
                            })
                          );

                          // Instantly log them in!
                          setActiveShopId(forgotSelectedShopOwnerId);
                          setUserRole("owner");
                          setDashboardTab("owner_console");
                          
                          showToast("Password reset successfully!", "success");
                          setShowForgotModal(false);
                          setForgotStep(1);
                          setForgotOTPEmulate("");
                          setForgotOTPCode("");

                          setTimeout(() => {
                            setCurrentScreen("dashboard");
                          }, 1000);
                        }
                      }}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#0052CC] to-[#4CBB17] text-white rounded-lg font-bold transition-all"
                    >
                      Save & Login
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING HIGH FIDELITY SIMULATED PDF REPORT MOCK */}
      <AnimatePresence>
        {showPdfModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/65 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-[290px] h-[480px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs relative select-text shadow-2xl"
            >
              {(() => {
                // Determine report specific text elements dynamically
                const type = pdfReportType || "weekly";
                let title = "Weekly Business Intelligence Ledger";
                let periodRange = "Jun 15 - Jun 21, 2026";
                let badge = "WEEKLY PDF";
                let revenueStr = "₦173,700.00";
                let profitStr = "₦44,400.00";
                let totalItems = "311 sold";
                
                let highPerformers = [
                  { brand: "Indomie Noodles", desc: "FMCG Champion, 210 packs sold. High turnover.", growth: "+24% velocity" },
                  { brand: "Peak Milk Powder", desc: "Premium household staple, 85 tins sold. Strong margins.", growth: "+12% growth" }
                ];

                let lowPerformers = [
                  { brand: "Golden Penny Pasta", desc: "Low turnover speed. 14 bags sold. Stagnant inventory.", impact: "-5% margin" },
                  { brand: "Ankara Fabrics (Bulk)", desc: "High investment capital but slow sales. 2 rolls sold.", impact: "-18% flow" }
                ];

                if (type === "daily") {
                  title = "Daily Register Performance Audit";
                  periodRange = new Date().toISOString().split('T')[0];
                  badge = "DAILY PDF";
                  revenueStr = "₦24,800.00";
                  profitStr = "₦3,800.00";
                  totalItems = "5 items";
                  highPerformers = [
                    { brand: "Indomie Super Pack", desc: "Fast afternoon snack demand, 3 packs sold.", growth: "Hot Item" }
                  ];
                  lowPerformers = [
                    { brand: "Peak Milk Refill", desc: "Slower morning staple today, 1 pack sold.", impact: "Low Stock" }
                  ];
                } else if (type === "monthly") {
                  title = "Monthly Cashflow & Asset Summary";
                  periodRange = "June 1 - June 30, 2026";
                  badge = "MONTHLY PDF";
                  revenueStr = "₦637,000.00";
                  profitStr = "₦128,000.00";
                  totalItems = "1,142 units";
                  highPerformers = [
                    { brand: "Indomie Instant Noodles", desc: "Massive consumer pack demand. 850 packs distributed.", growth: "+38% volume" },
                    { brand: "Milo Cocoa Tins", desc: "Back-to-school wholesale. 340 tins cleared.", growth: "+15% profit" }
                  ];
                  lowPerformers = [
                    { brand: "Peak Creamer Powder", desc: "Supply bottlenecks delayed restocks. 42 packs sold.", impact: "Stockout losses" },
                    { brand: "Gala Sausage", desc: "Short shelf-life waste. 50 units discarded due to damage.", impact: "₦10,000 lost" }
                  ];
                } else if (type === "quarterly") {
                  title = "Quarterly Strategic Performance Review";
                  periodRange = "Q2 2026 (April - June)";
                  badge = "QUARTERLY PDF";
                  revenueStr = "₦6,200,000.00";
                  profitStr = "₦1,320,000.00";
                  totalItems = "11,850 units";
                  highPerformers = [
                    { brand: "Ankara Wax Fabrics", desc: "Wedding and festival season rush. 450 yards sold.", growth: "₦650k cash inflow" },
                    { brand: "Indomie Noodles", desc: "Consistent fast-moving consumer staple across branches.", growth: "Stable 32% share" }
                  ];
                  lowPerformers = [
                    { brand: "Samsung Power Adapters", desc: "High rate of consumer returns (12 items). Quality concerns.", impact: "₦24k refunded" },
                    { brand: "Milo Chocolates", desc: "Slowing wholesale distribution channels this quarter.", impact: "-11% drop" }
                  ];
                } else if (type === "yearly") {
                  title = "Annual Board of Directors Sales Ledger";
                  periodRange = "Fiscal Year 2026";
                  badge = "ANNUAL PDF";
                  revenueStr = "₦24,800,000.00";
                  profitStr = "₦5,120,000.00";
                  totalItems = "48,500 units";
                  highPerformers = [
                    { brand: "Indomie Noodles (Multi)", desc: "Undisputed FMCG champion. 18,200 cartons sold.", growth: "Best Seller" },
                    { brand: "Ankara Cotton Weaves", desc: "Top textile brand. 3,200 yards distributed.", growth: "Highest Margin" },
                    { brand: "Peak Milk (Staple)", desc: "Consistent household grocery volume throughout 2026.", growth: "Stable Demand" }
                  ];
                  lowPerformers = [
                    { brand: "Gala Premium Sausage", desc: "Extremely thin margins. Only 12% yield net.", impact: "Low Yield" },
                    { brand: "Samsung Charging Accessories", desc: "Import customs delayed key shipments, causing empty shelves.", impact: "Stockout Penalty" }
                  ];
                }

                return (
                  <>
                    {/* PDF Header Block */}
                    <div className="bg-[#0A2540] p-4 text-white shrink-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-mono text-sm font-extrabold tracking-wider text-white">CORNER STREAMS</h3>
                          <p className="text-[7.5px] font-bold text-[#4CBB17] uppercase tracking-widest mt-0.5">SECURE COMPLIANCE LEDGER</p>
                        </div>
                        <span className="bg-[#0052CC] text-white font-mono text-[7px] font-black px-1.5 py-0.5 rounded">
                          {badge}
                        </span>
                      </div>
                      <div className="mt-2.5 text-[8px] text-slate-350 leading-relaxed text-slate-300">
                        <p className="font-semibold text-white">{title}</p>
                        <div className="flex justify-between items-center text-[7.5px] mt-1 text-slate-400 font-mono">
                          <span>Period: {periodRange}</span>
                          <span>TS: 2026-07-03</span>
                        </div>
                      </div>
                    </div>

                    {/* PDF Content Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40 font-sans">
                      {/* Financial Metrics Cards */}
                      <div>
                        <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Consolidated Cash flow</h4>
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="bg-white border border-slate-100 rounded-lg p-2 shadow-3xs">
                            <span className="text-[7px] font-bold text-slate-400 block uppercase">Revenue</span>
                            <span className="text-[10px] font-black text-[#0A2540] font-mono mt-0.5 block">{revenueStr}</span>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-lg p-2 shadow-3xs">
                            <span className="text-[7px] font-bold text-slate-400 block uppercase">Net Profit</span>
                            <span className="text-[10px] font-black text-[#00875A] font-mono mt-0.5 block">{profitStr}</span>
                          </div>
                          <div className="bg-white border border-slate-100 rounded-lg p-2 shadow-3xs">
                            <span className="text-[7px] font-bold text-slate-400 block uppercase">Volume</span>
                            <span className="text-[10px] font-black text-[#0052CC] font-mono mt-0.5 block">{totalItems}</span>
                          </div>
                        </div>
                      </div>

                      {/* Brand Performance Analysis (STARS) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <span className="text-emerald-600">📈</span>
                          <h4 className="text-[8.5px] font-black text-[#00875A] uppercase tracking-wider">Top Performing Goods & Brands</h4>
                        </div>
                        <div className="space-y-1">
                          {highPerformers.map((hp, idx) => (
                            <div key={idx} className="bg-emerald-50/50 border border-emerald-100/60 rounded-lg p-2 flex justify-between items-start text-[8.5px]">
                              <div>
                                <span className="font-extrabold text-[#0A2540] block">{hp.brand}</span>
                                <span className="text-[7.5px] text-slate-500 block leading-tight mt-0.5">{hp.desc}</span>
                              </div>
                              <span className="text-[7.5px] font-black bg-emerald-100 text-emerald-800 px-1 rounded-sm uppercase shrink-0 font-mono">
                                {hp.growth}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Brand Performance Analysis (UNDERPERFORMERS) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                          <span className="text-rose-600">📉</span>
                          <h4 className="text-[8.5px] font-black text-rose-700 uppercase tracking-wider">Underperforming Brands & Friction points</h4>
                        </div>
                        <div className="space-y-1">
                          {lowPerformers.map((lp, idx) => (
                            <div key={idx} className="bg-rose-50/50 border border-rose-100/60 rounded-lg p-2 flex justify-between items-start text-[8.5px]">
                              <div>
                                <span className="font-extrabold text-[#0A2540] block">{lp.brand}</span>
                                <span className="text-[7.5px] text-slate-500 block leading-tight mt-0.5">{lp.desc}</span>
                              </div>
                              <span className="text-[7.5px] font-black bg-rose-100 text-rose-800 px-1 rounded-sm uppercase shrink-0 font-mono">
                                {lp.impact}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-dashed border-slate-200 pt-2 text-center">
                        <span className="text-[7px] text-slate-400 font-mono italic">
                          Corner Streams ERP Secure Ledger Encryption key: SHA256-CBS-2026 • Page 1 of 1
                        </span>
                      </div>
                    </div>

                    {/* PDF Footer Dismiss button */}
                    <div className="p-3 border-t border-slate-100 bg-white shrink-0 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowPdfModal(false);
                          showToast(`✓ Generated & downloaded PDF ledger: CBS_Intelligence_${type.toUpperCase()}_2026.pdf`, "success");
                        }}
                        className="flex-1 bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-white font-bold py-2 rounded-xl text-center transition-all text-[11px]"
                      >
                        Download PDF File
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPdfModal(false)}
                        className="px-3 border border-slate-200 text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-[#0A2540] font-bold py-2 rounded-xl text-center active:scale-95 transition-all text-[11px]"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Staff Overlay Modal */}
      <AnimatePresence>
        {showManageStaffOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-5 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4.5 shadow-xl w-full max-w-[280px] flex flex-col max-h-[92%] text-left border border-slate-100 relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-1.5 text-[#0A2540]">
                  <Users className="h-4.5 w-4.5 text-[#0052CC]" />
                  <h4 className="font-display font-black text-xs uppercase tracking-wide">
                    Manage Staff
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowManageStaffOverlay(false);
                    setNewStaffUsername("");
                    setNewStaffPassword("");
                    setStaffErrors({});
                  }}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3.5 py-2.5">
                <div className="bg-[#00875A]/5 border border-[#00875A]/10 p-2 text-[9px] text-slate-600 leading-normal rounded-lg">
                  <span className="font-bold text-[#00875A]">Manual Registration Panel</span>
                  <p className="mt-0.5">As the system owner, you manually create unique logins for each counter staff member. They do not register themselves.</p>
                </div>

                {/* Manual Add Form */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider">
                    Add New Staff Account
                  </h5>

                  <div className="space-y-0.5">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      Username / ID
                    </label>
                    <input
                      type="text"
                      value={newStaffUsername}
                      onChange={(e) => {
                        setNewStaffUsername(e.target.value.toLowerCase().replace(/\s/g, ""));
                        if (staffErrors.username) setStaffErrors({ ...staffErrors, username: undefined });
                      }}
                      placeholder="e.g. staff_obi"
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-1.5 rounded-lg focus:border-[#00875A] font-sans"
                    />
                    {staffErrors.username && (
                      <p className="text-[8px] font-semibold text-red-500">{staffErrors.username}</p>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      Secure Password / PIN
                    </label>
                    <input
                      type="password"
                      value={newStaffPassword}
                      onChange={(e) => {
                        setNewStaffPassword(e.target.value);
                        if (staffErrors.password) setStaffErrors({ ...staffErrors, password: undefined });
                      }}
                      placeholder="••••"
                      maxLength={8}
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none px-3 py-1.5 rounded-lg focus:border-[#00875A] font-sans"
                    />
                    {staffErrors.password && (
                      <p className="text-[8px] font-semibold text-red-500">{staffErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
                      Role / Permissions Level
                    </label>
                    <select
                      value={newStaffPermissions}
                      onChange={(e) => setNewStaffPermissions(e.target.value)}
                      className="w-full bg-white text-xs text-[#0A2540] border border-slate-200 outline-none p-1.5 rounded-lg focus:border-[#00875A] font-sans"
                    >
                      <option value="Counter Sales Only">Counter Sales Only</option>
                      <option value="Inventory & Sales Manager">Inventory & Sales Manager</option>
                      <option value="Auditor & Analytics Full">Auditor & Analytics Full</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const u = newStaffUsername.trim();
                      const p = newStaffPassword;
                      const errs: {username?: string; password?: string} = {};
                      if (!u) {
                        errs.username = "Username is mandatory";
                      } else if (staffAccounts.some(acc => acc.username.toLowerCase() === u.toLowerCase())) {
                        errs.username = "This username is already taken";
                      }
                      if (!p) {
                        errs.password = "Password is mandatory";
                      } else if (p.length < 4) {
                        errs.password = "Password must be at least 4 characters";
                      }

                      if (Object.keys(errs).length > 0) {
                        setStaffErrors(errs);
                        showToast("Please check fields requirements", "error");
                        return;
                      }

                      const newAcc = {
                        username: u,
                        password: p,
                        dateAdded: new Date().toISOString().split('T')[0],
                        salesToday: 0,
                        ordersCount: 0,
                        isOnline: true,
                        permissions: newStaffPermissions
                      };
                      const nextStaff = [newAcc, ...staffAccounts];
                      setStaffAccounts(nextStaff);

                      if (activeShopId && setShopOwners) {
                        setShopOwners(prev => prev.map(o => {
                          if (o.id === activeShopId) {
                            return {
                              ...o,
                              staff: nextStaff,
                              activities: [
                                { id: `act_staff_${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: "Staff", description: `Created staff login account: "${newAcc.username}" as "${newAcc.permissions}".` },
                                ...o.activities
                              ]
                            };
                          }
                          return o;
                        }));
                      }

                      setNewStaffUsername("");
                      setNewStaffPassword("");
                      setStaffErrors({});
                      showToast(`Staff Account '${u}' saved!`, "success");
                    }}
                    className="w-full bg-[#4CBB17] hover:bg-[#3FA012] text-white font-sans font-bold text-xs py-2 rounded-xl transition-all duration-155 shadow-xs flex items-center justify-center gap-1 shadow-[#4CBB17]/10"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Save Staff Account</span>
                  </button>
                </div>

                <div className="h-px bg-slate-100 my-1"></div>

                {/* Staff list registry with detailed indicators */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-bold text-[#0A2540] uppercase tracking-wider">
                    Active Registry Stream ({staffAccounts.length})
                  </h5>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {staffAccounts.map((acc, index) => (
                      <div key={index} className="flex flex-col p-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] gap-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span
                              onClick={() => {
                                const updated = [...staffAccounts];
                                updated[index].isOnline = !updated[index].isOnline;
                                setStaffAccounts(updated);
                                showToast(`Staff online status updated for ${acc.username}!`, "info");
                              }}
                              className={`h-2 w-2 rounded-full cursor-pointer transition-all hover:scale-130 ${acc.isOnline ? "bg-[#4CBB17]" : "bg-slate-300"}`}
                              title="Toggle Online Status"
                            ></span>
                            <span className="font-bold text-[#0A2540]">{acc.username}</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const nextStaff = staffAccounts.filter(a => a.username !== acc.username);
                              setStaffAccounts(nextStaff);
                              if (activeShopId && setShopOwners) {
                                setShopOwners(prev => prev.map(o => {
                                  if (o.id === activeShopId) {
                                    return {
                                      ...o,
                                      staff: nextStaff,
                                      activities: [
                                        { id: `act_staff_del_${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: "Staff", description: `Deleted staff login account: "${acc.username}".` },
                                        ...o.activities
                                      ]
                                    };
                                  }
                                  return o;
                                }));
                              }
                              showToast(`Staff member '${acc.username}' removed`, "info");
                            }}
                            className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors text-[10px] font-black"
                            title="Delete Account"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[8px] text-slate-400">
                          <span>Role: <strong className="text-[#0052CC] font-sans font-bold">{acc.permissions || "Counter Sales Only"}</strong></span>
                          <span>PIN: <code className="bg-slate-200 text-[#0A2540] px-1 rounded font-mono">{acc.password}</code></span>
                        </div>

                        <div className="flex items-center justify-between bg-white border border-slate-100 p-1.5 rounded-lg text-[8.5px]">
                          <span className="text-slate-400 font-sans">Today's Sales:</span>
                          <span className="font-mono font-bold text-[#00875A]">
                            ₦{(acc.salesToday || 0).toLocaleString()} ({acc.ordersCount || 0} orders)
                          </span>
                        </div>
                      </div>
                    ))}
                    {staffAccounts.length === 0 && (
                      <p className="text-[9px] text-slate-400 italic text-center py-2">No active staff accounts registered.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowManageStaffOverlay(false)}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-500 font-sans font-bold text-xs py-2 rounded-xl text-center active:scale-95 transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Subscription Billing & Auto-Pay Overlay */}
      <AnimatePresence>
        {showSubscriptionDetailsSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-5 select-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-4.5 shadow-xl w-full max-w-[280px] flex flex-col max-h-[92%] text-left border border-slate-100 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-1.5 text-[#0A2540]">
                  <span className="text-sm">💳</span>
                  <h4 className="font-display font-black text-xs uppercase tracking-wide">
                    Billing & Subscription
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSubscriptionDetailsSheet(false)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-0.5">
                
                {/* Active Plan badge */}
                <div className="bg-[#0052CC]/5 border border-blue-100 rounded-xl p-3 text-center space-y-1">
                  <span className="text-[7px] bg-[#0052CC] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {activePlanType === "trial" ? "1-Week Trial Mode" : `${activePlanType.toUpperCase()} Tier Plan`}
                  </span>
                  <p className="text-xs font-black text-[#0A2540] mt-1">
                    {activePlanType === "trial" ? "🎁 Nigeria SMB Starter Trial" : "⚡ CornerStreams Premium SMB"}
                  </p>
                  <p className="text-[9.5px] text-slate-400 leading-normal">
                    {activePlanType === "trial" ? (
                      <>You are enjoying 7 days of unlimited sales registers. <strong className="text-[#0052CC]">6 days remaining</strong>.</>
                    ) : (
                      <>Your premium auto-renewal is configured successfully.</>
                    )}
                  </p>
                </div>

                {/* Switch Plans Selection */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Choose Auto-Pay Cycle
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: "monthly", label: "Monthly Auto-Pay", price: "₦5,000/mo", desc: "Pay month to month" },
                      { id: "quarterly", label: "Quarterly Auto-Pay", price: "₦12,550/qtr", desc: "Save 16% on renewal" },
                      { id: "yearly", label: "Yearly Auto-Pay", price: "₦42,000/yr", desc: "Save 30% on renewal (Best Value)" }
                    ].map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => {
                          setSelectedPlan(plan.id as any);
                          setActivePlanType(plan.id as any);
                          showToast(`Plan updated: ${plan.label} active!`, "success");
                        }}
                        className={`border rounded-xl p-2.5 flex items-center justify-between cursor-pointer transition-all ${
                          selectedPlan === plan.id
                            ? "border-[#0052CC] bg-[#0052CC]/5 text-[#0A2540]"
                            : "border-slate-200 hover:border-slate-300 text-slate-500 bg-white"
                        }`}
                      >
                        <div>
                          <p className="text-[10px] font-bold">{plan.label}</p>
                          <p className="text-[8px] text-slate-400">{plan.desc}</p>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[#0052CC] shrink-0">
                          {plan.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card on file status */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Saved Payment Method
                  </label>
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💳</span>
                      <div>
                        <p className="text-[10px] font-bold text-[#0A2540] font-mono">
                          •••• •••• •••• {subCardNumber ? subCardNumber.slice(-4) : "4242"}
                        </p>
                        <p className="text-[8px] text-slate-400 font-sans">
                          Expires: {subExpiry || "12/28"}
                        </p>
                      </div>
                    </div>
                    <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider scale-90 shrink-0">VISA</span>
                  </div>
                </div>

                {/* Subscription Auto-Renewal Toggle Switch */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-[9.5px] font-black text-[#0A2540] uppercase tracking-wide">Auto-Renewal Engine</h5>
                      <p className="text-[7.5px] text-slate-400 mt-0.5">Toggle automatic card collection cycle</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !isAutoRenewEnabled;
                        setIsAutoRenewEnabled(nextState);
                        
                        // Add an audit log item
                        const newLog = {
                          id: `aud_ren_${Date.now()}`,
                          timestamp: new Date().toLocaleTimeString().slice(0, 5) + " " + new Date().toLocaleTimeString().slice(-2),
                          type: "Billing",
                          description: nextState 
                            ? "Auto-pay renewal ENABLED. Premium plan will cycle automatically."
                            : "Auto-pay renewal DISABLED. Subscription will terminate at end of term."
                        };
                        setAuditLogs([newLog, ...auditLogs]);
                        showToast(nextState ? "🔄 Auto-Renewal ENABLED!" : "⏸️ Auto-Renewal Disabled", nextState ? "success" : "info");
                      }}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                        isAutoRenewEnabled ? "bg-[#0052CC]" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          isAutoRenewEnabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded ${
                      isAutoRenewEnabled 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {isAutoRenewEnabled ? "✓ Active & Enabled" : "⏸ Paused / Disabled"}
                    </span>
                    <span className="text-[8px] text-slate-500 font-medium">
                      {isAutoRenewEnabled 
                        ? "Next collection: June 26, 2026." 
                        : "Locks on June 26, 2026."}
                    </span>
                  </div>
                </div>

              </div>

              {/* Done Footer */}
              <div className="pt-2 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSubscriptionDetailsSheet(false)}
                  className="w-full bg-[#0A2540] hover:bg-[#0A2540]/90 text-white font-sans font-bold text-xs py-2 rounded-xl text-center active:scale-95 transition-all"
                >
                  Save & Apply Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHOTO CLICK PICKER DRAWER DIALOGUE */}
      <AnimatePresence>
        {showImagePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImagePicker(false)}
            className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center"
          >
            <motion.div
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              exit={{ y: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl p-5 shadow-2xl w-full text-left space-y-4 border-t border-slate-100 z-50 pb-6"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div>
                  <h4 className="font-display font-black text-[#0A2540] text-xs uppercase tracking-wider">pickProductImage()</h4>
                  <p className="text-[9px] text-slate-400">Choose simulated input method</p>
                </div>
                <button
                  onClick={() => setShowImagePicker(false)}
                  className="p-1 px-2 text-[9px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-2 pt-1">
                {/* Option 1: Snap Camera */}
                <button
                  type="button"
                  onClick={() => {
                    const randomPhotos = [
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60", // Indomie packs
                      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&auto=format&fit=crop&q=60", // Box
                      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60", // electronics charging
                      "https://images.unsplash.com/photo-1524295988555-463e3d48408f?w=150&auto=format&fit=crop&q=60"  // fabrics
                    ];
                    // Pick a relevant photo according to newProdCategory!
                    let picked = randomPhotos[1];
                    if (newProdCategory === "Fabrics") picked = "https://images.unsplash.com/photo-1524295988555-463e3d48408f?w=150&auto=format&fit=crop&q=60";
                    else if (newProdCategory === "Electronics") picked = "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60";
                    else if (newProdCategory === "Snacks") picked = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60";
                    
                    setSelectedImage(picked);
                    setShowImagePicker(false);
                    showToast("📸 Camera Snap: Product photo saved into state!", "success");
                  }}
                  className="p-3 border border-slate-200 hover:border-[#0052CC] bg-slate-50/50 hover:bg-slate-50 rounded-xl text-center space-y-1.5 transition-all text-[#0A2540] active:scale-95"
                >
                  <Camera className="h-5 w-5 mx-auto text-[#0052CC]" />
                  <span className="text-[10px] font-bold block">Camera Snap</span>
                </button>

                {/* Option 2: Gallery Upload */}
                <button
                  type="button"
                  onClick={() => {
                    const randomPhotos = [
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60", // Indomie packs
                      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&auto=format&fit=crop&q=60", // Box
                      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60", // electronics charging
                      "https://images.unsplash.com/photo-1524295988555-463e3d48408f?w=150&auto=format&fit=crop&q=60"  // fabrics
                    ];
                    let picked = randomPhotos[0];
                    if (newProdCategory === "Fabrics") picked = "https://images.unsplash.com/photo-1524295988555-463e3d48408f?w=150&auto=format&fit=crop&q=60";
                    else if (newProdCategory === "Electronics") picked = "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60";
                    else if (newProdCategory === "Snacks") picked = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60";

                    setSelectedImage(picked);
                    setShowImagePicker(false);
                    showToast("📂 Gallery Upload: Preset image selected!", "success");
                  }}
                  className="p-3 border border-slate-200 hover:border-[#0052CC] bg-slate-50/50 hover:bg-slate-50 rounded-xl text-center space-y-1.5 transition-all text-[#0A2540] active:scale-95"
                >
                  <ImageIcon className="h-5 w-5 mx-auto text-[#00875A]" />
                  <span className="text-[10px] font-bold block">Gallery Upload</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OWNER NOTIFICATION FEED CENTER */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/65 z-55 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-[270px] h-[390px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs relative"
            >
              <div className="bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-white">Owner Activity Desk</h3>
                  <p className="text-[8px] font-bold text-slate-100/90">Live activity logs stream</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="p-1 px-2.5 text-[10px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Feed logs lists */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 bg-slate-50/50">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Staff Activity Logs</p>

                {[
                  { text: "Staff Blessing completed a ₦20,000 POS sale", time: "Just now", type: "sale" },
                  { text: "Staff Jude added 50 units of Ankara Fabric", time: "18 mins ago", type: "stock" },
                  { text: "Staff Blessing adjusted Peak Milk stock count (-2)", time: "1 hr ago", type: "adjust" },
                  { text: "Staff Jude completed a ₦6,000 Cash sale", time: "2 hrs ago", type: "sale" }
                ].map((log, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-2.5 rounded-xl flex gap-2 items-start shadow-xs">
                    <div className={`h-6 w-6 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black ${
                      log.type === "sale" ? "bg-[#00875A]/10 text-[#00875A]" :
                      log.type === "stock" ? "bg-[#0A2540]/10 text-[#0A2540]" : "bg-[#0052CC]/10 text-[#0052CC]"
                    }`}>
                      {log.type === "sale" ? "₦" : log.type === "stock" ? "🧵" : "🔌"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold text-[#0A2540] leading-normal">{log.text}</p>
                      <span className="text-[7.5px] text-slate-400 font-sans block mt-0.5">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(false);
                    showToast("Connected to live activity_logs db stream!", "success");
                  }}
                  className="w-full bg-gradient-to-r from-[#0A2540] via-[#0052CC] to-[#4CBB17] hover:brightness-110 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all duration-155 shadow-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEBTORS BOOK OVERLAY */}
      <AnimatePresence>
        {showDebtorsOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] h-[430px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              <div className="bg-gradient-to-r from-red-800 to-rose-600 p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">Ogbese Credit Book</h3>
                  <p className="text-[8px] font-bold text-rose-100">Track custom balances & defaults</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDebtorsOverlay(false)}
                  className="p-1 px-2.5 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/40">
                {/* Add new debtor */}
                <div className="bg-white border border-rose-100 p-2.5 rounded-xl space-y-2 shadow-xs">
                  <p className="text-[8.5px] font-black text-rose-700 uppercase tracking-wider">Log New Debtor Record</p>
                  <div className="space-y-1.5 text-[9px]">
                    <input
                      type="text"
                      placeholder="Customer Name"
                      value={newDebtorName}
                      onChange={(e) => setNewDebtorName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Phone number"
                      value={newDebtorPhone}
                      onChange={(e) => setNewDebtorPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Amount Owed (₦)"
                      value={newDebtorAmount}
                      onChange={(e) => setNewDebtorAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md font-mono"
                    />
                    <div className="flex gap-1.5">
                      <input
                        type="date"
                        value={newDebtorDue}
                        onChange={(e) => setNewDebtorDue(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 outline-none p-1 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newDebtorName || !newDebtorAmount) {
                            showToast("Please enter debtor name and amount owed!", "error");
                            return;
                          }
                          const newDeb = {
                            id: `deb_${Date.now()}`,
                            customerName: newDebtorName,
                            phoneNumber: newDebtorPhone || "N/A",
                            amountOwed: Number(newDebtorAmount),
                            dateAdded: new Date().toISOString().split("T")[0],
                            dueDate: newDebtorDue || "No deadline",
                            status: "unpaid"
                          };
                          const nextDebtors = [newDeb, ...debtors];
                          setDebtors(nextDebtors);
                          syncLocalChangesToMaster({ debtors: nextDebtors });

                          setNewDebtorName("");
                          setNewDebtorPhone("");
                          setNewDebtorAmount("");
                          setNewDebtorDue("");
                          showToast(`Logged credit for ${newDeb.customerName}!`, "success");
                        }}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1 rounded-md text-[10px]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Debtors List */}
                <div className="space-y-1.5">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Active Debtors ({debtors.length})</p>
                  {debtors.length === 0 ? (
                    <div className="text-center py-4 bg-white rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-400 italic">
                      Zero outstanding customer debts. Outstanding!
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {debtors.map((deb) => (
                        <div key={deb.id} className="bg-white border border-slate-100 p-2 rounded-xl text-[9px] flex flex-col gap-1 shadow-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-slate-900">{deb.customerName}</p>
                              <p className="text-[8px] text-slate-500 font-mono leading-none mt-0.5">{deb.phoneNumber}</p>
                            </div>
                            <span className={`px-1.5 py-0.5 rounded-full font-bold text-[7px] ${
                              deb.status === "unpaid" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                            }`}>
                              {deb.status === "unpaid" ? "Unpaid" : "Part Paid"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-slate-50">
                            <span className="text-rose-600 font-black font-mono">{formatValue(deb.amountOwed)}</span>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = debtors.map(d => {
                                    if (d.id === deb.id) {
                                      return { ...d, status: d.status === "unpaid" ? "partially_paid" : "unpaid" };
                                    }
                                    return d;
                                  });
                                  setDebtors(updated);
                                  syncLocalChangesToMaster({ debtors: updated });
                                  showToast(`Updated payment state for ${deb.customerName}!`, "info");
                                }}
                                className="bg-slate-100 hover:bg-slate-200 text-[8px] font-bold px-1.5 py-0.5 rounded"
                              >
                                Toggle Paid
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = debtors.filter(d => d.id !== deb.id);
                                  setDebtors(updated);
                                  syncLocalChangesToMaster({ debtors: updated });
                                  showToast(`Cleared debt for ${deb.customerName}!`, "success");
                                }}
                                className="bg-emerald-500 text-white hover:bg-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded"
                              >
                                Clear ₦
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setShowDebtorsOverlay(false)}
                  className="w-full bg-rose-600 text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all"
                >
                  Close Credit Book
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MULTI-BRANCH REGISTRY OVERLAY */}
      <AnimatePresence>
        {showBranchesOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] h-[430px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              <div className="bg-gradient-to-r from-teal-800 to-teal-600 p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">Branch Registry</h3>
                  <p className="text-[8px] font-bold text-teal-100">Multi-outlet inventory syncing</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBranchesOverlay(false)}
                  className="p-1 px-2.5 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/40">
                {/* Add new branch */}
                <div className="bg-white border border-teal-100 p-2.5 rounded-xl space-y-2 shadow-xs">
                  <p className="text-[8.5px] font-black text-teal-700 uppercase tracking-wider">Establish New Branch</p>
                  <div className="space-y-1.5 text-[9px]">
                    <input
                      type="text"
                      placeholder="Branch Name (e.g. Alaba Outlet)"
                      value={newBranchName}
                      onChange={(e) => setNewBranchName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Physical Location"
                      value={newBranchLocation}
                      onChange={(e) => setNewBranchLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Assigned Manager"
                      value={newBranchManager}
                      onChange={(e) => setNewBranchManager(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newBranchName || !newBranchLocation) {
                          showToast("Please enter branch name and location!", "error");
                          return;
                        }
                        const newBr = {
                          id: `br_${Date.now()}`,
                          name: newBranchName,
                          location: newBranchLocation,
                          manager: newBranchManager || "Unassigned"
                        };
                        const nextBranches = [...branches, newBr];
                        setBranches(nextBranches);
                        syncLocalChangesToMaster({ branches: nextBranches });

                        setNewBranchName("");
                        setNewBranchLocation("");
                        setNewBranchManager("");
                        showToast(`Registered branch: ${newBr.name}!`, "success");
                      }}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-1.5 rounded-md transition-all text-[9.5px]"
                    >
                      Provision Outlet
                    </button>
                  </div>
                </div>

                {/* Branches List */}
                <div className="space-y-1.5">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Operational Locations ({branches.length})</p>
                  {branches.length === 0 ? (
                    <div className="text-center py-4 bg-white rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-400 italic">
                      No branches provisioned yet.
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {branches.map((br) => (
                        <div key={br.id} className="bg-white border border-slate-100 p-2.5 rounded-xl text-[9px] flex flex-col gap-1 shadow-xs">
                          <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                              <p className="font-bold text-slate-900 flex items-center gap-1">
                                <MapPin className="h-2.5 w-2.5 text-teal-600" />
                                <span>{br.name}</span>
                              </p>
                              <p className="text-[8px] text-slate-500">{br.location}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = branches.filter(b => b.id !== br.id);
                                setBranches(updated);
                                syncLocalChangesToMaster({ branches: updated });
                                showToast(`Decommissioned branch: ${br.name}`, "info");
                              }}
                              className="text-slate-400 hover:text-red-500 text-[9px] font-bold px-1"
                              title="Delete Branch"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-[8px] text-teal-600 bg-teal-50/50 p-1 rounded font-bold mt-1">
                            Manager: {br.manager}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setShowBranchesOverlay(false)}
                  className="w-full bg-teal-600 text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all"
                >
                  Close Branch Registry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHIFT HANDOVER / AUDITING OVERLAY */}
      <AnimatePresence>
        {showShiftOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] h-[430px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              <div className="bg-gradient-to-r from-amber-800 to-amber-600 p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">Shift Handover Desk</h3>
                  <p className="text-[8px] font-bold text-amber-100">Audit physical cash with ledger totals</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowShiftOverlay(false)}
                  className="p-1 px-2.5 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/40">
                {/* Log Shift report */}
                <div className="bg-white border border-amber-100 p-2.5 rounded-xl space-y-2 shadow-xs">
                  <p className="text-[8.5px] font-black text-amber-700 uppercase tracking-wider">Close Shift & Reconcile Drawer</p>
                  <p className="text-[8px] text-slate-400">
                    System Expected Sales: <strong className="text-slate-800">₦24,800</strong>
                  </p>
                  <div className="space-y-1.5 text-[9px]">
                    <div className="space-y-0.5">
                      <label className="text-[7.5px] font-bold text-slate-400 block">ACTUAL CASH COUNTED IN DRAWER</label>
                      <input
                        type="number"
                        placeholder="₦ Counted Amount"
                        value={shiftActualCash}
                        onChange={(e) => setShiftActualCash(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md font-mono"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="text-[7.5px] font-bold text-slate-400 block">REMARKS / EXPLANATION OF VARIANCE</label>
                      <textarea
                        placeholder="e.g. Scarcity of naira change led to a ₦100 rounding discount"
                        value={shiftRemarks}
                        onChange={(e) => setShiftRemarks(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-md h-12 resize-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (!shiftActualCash) {
                          showToast("Please enter the counted cash amount!", "error");
                          return;
                        }
                        const expected = 24800; // Expected sample amount
                        const actual = Number(shiftActualCash);
                        const difference = actual - expected;

                        const newReport = {
                          id: `sh_${Date.now()}`,
                          date: new Date().toISOString().split("T")[0],
                          staffUsername: userRole === "owner" ? "Owner Principal" : "Counter Sales",
                          expectedCash: expected,
                          actualCash: actual,
                          difference: difference,
                          remarks: shiftRemarks || "Reconciled cleanly.",
                          timestamp: new Date().toLocaleTimeString().slice(0, 5)
                        };
                        const nextShifts = [newReport, ...shifts];
                        setShifts(nextShifts);
                        syncLocalChangesToMaster({ shifts: nextShifts });

                        setShiftActualCash("");
                        setShiftRemarks("");
                        showToast(`Shift Balance saved! Variance: ₦${difference.toLocaleString()}`, difference === 0 ? "success" : "info");
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-md transition-all text-[9.5px]"
                    >
                      Audit & Lock Cashbox
                    </button>
                  </div>
                </div>

                {/* Shifts audits List */}
                <div className="space-y-1.5">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Audit History Logs ({shifts.length})</p>
                  {shifts.length === 0 ? (
                    <div className="text-center py-4 bg-white rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-400 italic">
                      No shifts closed yet today.
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                      {shifts.map((sh) => (
                        <div key={sh.id} className="bg-white border border-slate-100 p-2 rounded-xl text-[9px] flex flex-col gap-1 shadow-xs">
                          <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono">
                            <span>{sh.date} @ {sh.timestamp}</span>
                            <span>By {sh.staffUsername}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 text-center font-mono py-1 border-y border-slate-50 text-[8.5px]">
                            <div>
                              <p className="text-[7.5px] text-slate-400 font-sans">Expected</p>
                              <p className="font-bold text-slate-700">{formatValue(sh.expectedCash)}</p>
                            </div>
                            <div>
                              <p className="text-[7.5px] text-slate-400 font-sans">Counted</p>
                              <p className="font-bold text-slate-700">{formatValue(sh.actualCash)}</p>
                            </div>
                            <div>
                              <p className="text-[7.5px] text-slate-400 font-sans">Variance</p>
                              <p className={`font-bold ${sh.difference < 0 ? "text-red-500" : sh.difference > 0 ? "text-teal-600" : "text-emerald-600"}`}>
                                {sh.difference >= 0 ? "+" : ""}{formatValue(sh.difference)}
                              </p>
                            </div>
                          </div>
                          <p className="text-[8px] text-slate-500 leading-normal italic mt-0.5">
                            "{sh.remarks}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setShowShiftOverlay(false)}
                  className="w-full bg-amber-600 text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all"
                >
                  Close Shift Auditing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANTI-LEAKAGE CONTROL HUB OVERLAY */}
      <AnimatePresence>
        {showLeakageOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] h-[430px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">Leakage Guard Hub</h3>
                  <p className="text-[8px] font-bold text-indigo-200">Owner Absentee Safety Controls</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLeakageOverlay(false)}
                  className="p-1 px-2.5 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/40">
                
                {/* Emergency Lock Switch */}
                <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-xl space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8.5px] font-black text-rose-700 uppercase tracking-wider">Remote Terminals Lock</p>
                      <p className="text-[7.5px] text-slate-500">Instantly freeze all staff POS registers</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !terminalFrozen;
                        setTerminalFrozen(nextState);
                        
                        // Add an audit log item
                        const newLog = {
                          id: `aud_${Date.now()}`,
                          timestamp: new Date().toLocaleTimeString().slice(0, 5) + " " + new Date().toLocaleTimeString().slice(-2),
                          type: "Security Alert",
                          description: nextState 
                            ? "CRITICAL: POS register locked remotely by Principal Owner"
                            : "POS register security lock lifted by Principal Owner"
                        };
                        setAuditLogs([newLog, ...auditLogs]);

                        // Push activity to master
                        if (activeShopId && setShopOwners) {
                          setShopOwners((prev) =>
                            prev.map((o) => {
                              if (o.id === activeShopId) {
                                const newAct = {
                                  id: `act_sec_${Date.now()}`,
                                  timestamp: new Date().toLocaleTimeString(),
                                  type: "Admin",
                                  description: nextState 
                                    ? "Owner remotely FROZE counter terminals to inspect cash variance."
                                    : "Owner UNFORZED counter terminals."
                                };
                                return {
                                  ...o,
                                  activities: [newAct, ...o.activities]
                                };
                              }
                              return o;
                            })
                          );
                        }

                        showToast(nextState ? "🔒 Terminals LOCKED instantly!" : "🔓 Terminals Unlocked", nextState ? "error" : "success");
                      }}
                      className={`px-2.5 py-1 text-[8.5px] font-black rounded-lg transition-all ${
                        terminalFrozen 
                          ? "bg-rose-600 text-white animate-pulse" 
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }`}
                    >
                      {terminalFrozen ? "LOCKED" : "FREEZE POS"}
                    </button>
                  </div>
                  {terminalFrozen && (
                    <div className="bg-rose-100 text-rose-800 text-[8px] p-1.5 rounded font-medium leading-normal animate-pulse">
                      🚨 Counter nodes are currently frozen. Staff logins are blocked from recording transactions until you lift this lock.
                    </div>
                  )}
                </div>

                {/* Staff Privileges policies */}
                <div className="bg-white border border-slate-100 p-2.5 rounded-xl space-y-2 shadow-xs">
                  <p className="text-[8.5px] font-black text-slate-700 uppercase tracking-wider">Counter Staff Gatekeepers</p>
                  
                  <div className="space-y-2">
                    {/* Policy 1 */}
                    <div className="flex items-center justify-between py-0.5">
                      <div>
                        <p className="font-bold text-[9px] text-slate-800">Allow manual price edits</p>
                        <p className="text-[7.5px] text-slate-400">Allows overrides on listed catalog cost</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={allowManualDiscounts}
                        onChange={(e) => {
                          setAllowManualDiscounts(e.target.checked);
                          showToast(`Price overrides ${e.target.checked ? "allowed" : "disabled for staff"}`, "info");
                        }}
                        className="h-3 w-3 accent-indigo-600"
                      />
                    </div>

                    {/* Policy 2 */}
                    <div className="flex items-center justify-between py-0.5 border-t border-slate-50">
                      <div>
                        <p className="font-bold text-[9px] text-slate-800">Allow instant refunds</p>
                        <p className="text-[7.5px] text-slate-400">Allows staff to pay out cash from register</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={allowRefunds}
                        onChange={(e) => {
                          setAllowRefunds(e.target.checked);
                          showToast(`Cash refunds ${e.target.checked ? "unlocked" : "restricted to Owner PIN"}`, "info");
                        }}
                        className="h-3 w-3 accent-indigo-600"
                      />
                    </div>

                    {/* Policy 3 */}
                    <div className="flex items-center justify-between py-0.5 border-t border-slate-50">
                      <div>
                        <p className="font-bold text-[9px] text-slate-800">Allow on-screen stock edits</p>
                        <p className="text-[7.5px] text-slate-400">Required to override catalog inventory numbers</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={allowStockEdits}
                        onChange={(e) => {
                          setAllowStockEdits(e.target.checked);
                          showToast(`Stock adjustments ${e.target.checked ? "open to cashier" : "restricted to Admin"}`, "info");
                        }}
                        className="h-3 w-3 accent-indigo-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Leakage Audit Stream Logs */}
                <div className="space-y-1.5">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Anti-Leakage Security Log</p>
                  <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="bg-white border border-slate-100 p-2 rounded-lg text-[8.5px] flex flex-col gap-0.5 shadow-2xs">
                        <div className="flex justify-between text-[7px] text-slate-400 font-mono">
                          <span>{log.timestamp}</span>
                          <span className="font-bold text-indigo-600 uppercase">{log.type}</span>
                        </div>
                        <p className="text-slate-700 font-medium leading-normal">{log.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setShowLeakageOverlay(false)}
                  className="w-full bg-slate-900 text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all"
                >
                  Close Security Center
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Status Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`absolute bottom-16 left-4 right-4 p-3 rounded-xl shadow-lg border text-[10px] font-sans font-bold flex items-center gap-2 z-50 ${
              toastType === "success"
                ? "bg-[#0052CC]/5 text-[#0052CC] border-[#0052CC]/15"
                : toastType === "error"
                ? "bg-slate-950 text-white border-slate-900"
                : "bg-slate-50 text-slate-700 border-slate-200"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              toastType === "success" ? "bg-[#0052CC]" : toastType === "error" ? "bg-white" : "bg-slate-500"
            }`}></div>
            <span className="text-left line-clamp-2">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SALES RECEIPT DETAILS OVERLAY MODAL */}
      <AnimatePresence>
        {selectedReceipt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              <div className="bg-[#0A2540] p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">Digital Sales Receipt</h3>
                  <p className="text-[8px] font-bold text-[#4CBB17]">Audit Authenticated Copy</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="p-1 px-2 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Receipt Body */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
                {/* Paper Receipt container */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-3 relative overflow-hidden">
                  {/* Decorative receipt zig-zag top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 flex overflow-hidden">
                    {Array.from({ length: 20 }).map((_, idx) => (
                      <div key={idx} className="w-2 h-2 rotate-45 bg-white -mt-1 border border-slate-200"></div>
                    ))}
                  </div>

                  <div className="text-center pt-2 pb-1">
                    <h4 className="text-[12px] font-black text-[#0A2540] tracking-tight">
                      {shopOwners.find((o) => o.id === activeShopId)?.businessName || "CSB Retail Node"}
                    </h4>
                    <p className="text-[8px] text-slate-400 mt-0.5">Audit Stamp No: {selectedReceipt.id}</p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-slate-200 my-2"></div>

                  {/* Meta Details */}
                  <div className="grid grid-cols-2 gap-y-1.5 text-[8.5px] text-slate-500">
                    <div>
                      <span className="block text-slate-400 text-[7.5px] uppercase font-black">Receipt No</span>
                      <strong className="text-[#0A2540] font-mono">{selectedReceipt.receiptNumber}</strong>
                    </div>
                    <div className="text-right">
                      <span className="block text-slate-400 text-[7.5px] uppercase font-black">Operator</span>
                      <strong className="text-[#0A2540]">{selectedReceipt.operator}</strong>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[7.5px] uppercase font-black">Timestamp</span>
                      <strong className="text-slate-600 font-mono">{selectedReceipt.timestamp}</strong>
                    </div>
                    <div className="text-right">
                      <span className="block text-slate-400 text-[7.5px] uppercase font-black">Payment Stream</span>
                      <strong className="text-[#0052CC] uppercase font-mono">{selectedReceipt.paymentMethod}</strong>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-slate-200 my-2"></div>

                  {/* Items */}
                  <div className="space-y-1.5">
                    <span className="block text-slate-400 text-[7.5px] uppercase font-black mb-1">Purchased Products</span>
                    {selectedReceipt.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-[9px] text-[#0A2540]">
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="font-bold truncate">{item.productName}</p>
                          <p className="text-[7.5px] text-slate-400 font-mono">
                            {item.quantity} x ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                        <span className="font-black font-mono shrink-0">
                          ₦{item.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 my-2"></div>

                  {/* Totals */}
                  <div className="space-y-1 text-[9px]">
                    <div className="flex justify-between font-medium text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-mono">₦{selectedReceipt.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium text-slate-500">
                      <span>Tax / POS Levy</span>
                      <span className="font-mono">₦0</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-black text-[#0A2540] pt-1.5 border-t border-dashed border-slate-200">
                      <span>GRAND TOTAL</span>
                      <span className="font-mono text-[#00875A]">₦{selectedReceipt.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Anti-fraud Stamp */}
                  <div className="border border-[#4CBB17]/20 bg-[#4CBB17]/5 p-2 rounded-lg text-center mt-3">
                    <p className="text-[8px] font-black text-[#4CBB17] uppercase tracking-wider">
                      ✓ FINGERPRINT VERIFIED
                    </p>
                    <p className="text-[7px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                      This digital payload has been cryptographically signed. Any discrepancy triggers automatic owner notification.
                    </p>
                  </div>
                </div>

                {/* Audit lock footer info */}
                <div className="bg-amber-500/5 border border-amber-500/10 p-2.5 rounded-xl text-center">
                  <p className="text-[8px] font-black text-amber-700 uppercase tracking-widest">
                    ⚠️ OWNER CONTROL PROTOCOL
                  </p>
                  <p className="text-[7.5px] text-slate-500 mt-0.5 leading-relaxed">
                    Under absentee safety measures, this transaction cannot be reversed or altered without inputting the Security Master Code.
                  </p>
                </div>
              </div>

              {/* Action Close */}
              <div className="p-3 border-t border-slate-100 bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(null)}
                  className="w-full bg-[#0A2540] text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all hover:brightness-110 active:scale-95 shadow-sm"
                >
                  Return to Audit Feed
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP BUSINESS SYNC SETUP OVERLAY */}
      <AnimatePresence>
        {showWhatsappOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] h-[435px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              <div className="bg-gradient-to-r from-emerald-800 to-teal-700 p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">WhatsApp Business Sync</h3>
                  <p className="text-[8px] font-bold text-emerald-200">Atomic Customer Bill Dispatch</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWhatsappOverlay(false)}
                  className="p-1 px-2.5 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/40">
                
                {/* Connection Status Card */}
                <div className="bg-white border border-slate-100 p-2.5 rounded-xl space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-[8.5px] font-black text-slate-700 uppercase tracking-wider">Gateway Status</p>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      whatsappConnected ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}>
                      {whatsappConnected ? "● Live Connected" : "○ Disconnected"}
                    </span>
                  </div>

                  {whatsappConnected ? (
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-lg">
                      <span className="text-base">🟢</span>
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-slate-800">Linked Phone Instance:</p>
                        <p className="text-[8px] text-slate-500 font-mono">
                          {shopOwners.find(o => o.id === activeShopId)?.phoneNumber || "+234 803 111 2222"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-center py-1">
                      {isWhatsappConnecting ? (
                        <div className="flex flex-col items-center gap-1">
                          <RefreshCw className="h-4 w-4 text-emerald-600 animate-spin" />
                          <p className="text-[8px] text-slate-500 font-bold">Synchronizing handshake credentials...</p>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <p className="text-[8px] text-slate-400">Generate secure terminal API connection keys</p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsWhatsappConnecting(true);
                              setTimeout(() => {
                                setIsWhatsappConnecting(false);
                                setWhatsappConnected(true);
                                showToast("WhatsApp Node Handshake Successful!", "success");
                              }, 1500);
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded-md text-[8.5px] transition-all"
                          >
                            Scan API Web QR
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Toggle Active Dispatch */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                    <div>
                      <p className="font-bold text-[9px] text-slate-800">Auto Receipt Sendout</p>
                      <p className="text-[7.5px] text-slate-400">Dispatch message on every checkout</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isWhatsappSyncEnabled}
                      disabled={!whatsappConnected}
                      onChange={(e) => {
                        setIsWhatsappSyncEnabled(e.target.checked);
                        showToast(e.target.checked ? "WhatsApp Auto-Send Enabled!" : "WhatsApp Auto-Send Disabled", "info");
                      }}
                      className="h-3 w-3 accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Templates customization */}
                <div className="bg-white border border-slate-100 p-2.5 rounded-xl space-y-2 shadow-xs">
                  <p className="text-[8.5px] font-black text-slate-700 uppercase tracking-wider">SMS Dispatch Message Template</p>
                  
                  <textarea
                    value={whatsappTemplate}
                    onChange={(e) => setWhatsappTemplate(e.target.value)}
                    placeholder="Message Template"
                    className="w-full bg-slate-50 border border-slate-200 outline-none p-1.5 rounded-lg text-[9px] font-sans h-16 resize-none focus:border-emerald-600 text-slate-700"
                  />

                  <div className="text-[7.5px] text-slate-400 space-y-0.5">
                    <p>Placeholder keys supported: <code className="bg-slate-100 px-0.5 rounded text-slate-600">{`{name}`}</code>, <code className="bg-slate-100 px-0.5 rounded text-slate-600">{`{business}`}</code>, <code className="bg-slate-100 px-0.5 rounded text-slate-600">{`{amount}`}</code>, <code className="bg-slate-100 px-0.5 rounded text-slate-600">{`{link}`}</code></p>
                  </div>
                </div>

                {/* Live rendering Preview */}
                <div className="space-y-1">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Live Customer Dispatch Preview</p>
                  <div className="bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-xl space-y-1.5 relative overflow-hidden">
                    <div className="flex justify-between items-center text-[7.5px] text-emerald-600 font-mono font-bold">
                      <span>📤 OUTBOX PARSER PREVIEW</span>
                      <span>100% Validated</span>
                    </div>
                    <p className="text-[9px] text-slate-800 leading-relaxed bg-white p-2 rounded-lg shadow-2xs italic border border-emerald-100/30">
                      "{whatsappTemplate
                        .replace("{name}", "Chinedu Alao")
                        .replace("{business}", shopOwners.find(o => o.id === activeShopId)?.businessName || "Provisions Mart")
                        .replace("{amount}", "₦6,000")
                        .replace("{link}", "csb.ng/r/rcpt_9821")}"
                    </p>
                  </div>
                </div>

              </div>

              <div className="p-3 border-t border-slate-100 bg-white shrink-0 flex gap-2">
                {whatsappConnected && (
                  <button
                    type="button"
                    onClick={() => {
                      setWhatsappConnected(false);
                      setIsWhatsappSyncEnabled(false);
                      showToast("WhatsApp connection revoked", "info");
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 rounded-xl text-center text-[10px] transition-all"
                  >
                    Disconnect
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowWhatsappOverlay(false)}
                  className="flex-1 bg-emerald-600 text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all hover:brightness-110"
                >
                  Save Integration
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPREHENSIVE FORENSIC AUDIT LOGS OVERLAY */}
      <AnimatePresence>
        {showAuditLogsOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-55 flex items-center justify-center p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-[280px] h-[435px] flex flex-col overflow-hidden border border-slate-150 text-left font-sans text-xs shadow-2xl"
            >
              {/* Header */}
              <div className="bg-slate-900 p-3 text-white shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-white">Forensic Audit Stream</h3>
                  <p className="text-[8px] font-bold text-slate-400">Absentee Compliance Inspection Panel</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuditLogsOverlay(false)}
                  className="p-1 px-2.5 text-[9px] bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Filters Panel */}
              <div className="bg-slate-50 border-b border-slate-150 p-2.5 space-y-2 shrink-0">
                {/* Search Log Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={auditLogsSearch}
                    onChange={(e) => setAuditLogsSearch(e.target.value)}
                    placeholder="Forensic description filter..."
                    className="w-full bg-white text-[9px] border border-slate-200 p-1.5 pl-6 rounded-lg outline-none focus:border-slate-800"
                  />
                  <span className="absolute left-2 top-1.5 text-slate-400 text-[8px]">🔍</span>
                </div>

                {/* Log Category Filter Rows */}
                <div className="flex flex-wrap gap-1">
                  {["All", "Security", "Stock Control", "Staff", "Billing"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setAuditLogsFilter(cat)}
                      className={`text-[7.5px] px-1.5 py-0.5 rounded font-bold transition-all ${
                        auditLogsFilter === cat 
                          ? "bg-slate-900 text-white" 
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audit Scroll List */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-2 bg-slate-50/20">
                
                {/* Dynamically Filtered Logs Timeline */}
                <div className="relative border-l border-slate-200 pl-3.5 ml-2.5 space-y-3">
                  {auditLogs
                    .filter(log => {
                      const matchesSearch = log.description.toLowerCase().includes(auditLogsSearch.toLowerCase()) || 
                        log.type.toLowerCase().includes(auditLogsSearch.toLowerCase());
                      const matchesFilter = auditLogsFilter === "All" || log.type.toLowerCase() === auditLogsFilter.toLowerCase();
                      return matchesSearch && matchesFilter;
                    })
                    .map((log) => {
                      // Color schemes
                      let bulletColor = "bg-slate-400";
                      let badgeColor = "bg-slate-100 text-slate-600";
                      if (log.type === "Security" || log.type === "Security Alert") {
                        bulletColor = "bg-rose-500";
                        badgeColor = "bg-rose-100 text-rose-800";
                      } else if (log.type === "Stock Control") {
                        bulletColor = "bg-amber-500";
                        badgeColor = "bg-amber-100 text-amber-800";
                      } else if (log.type === "Billing") {
                        bulletColor = "bg-[#0052CC]";
                        badgeColor = "bg-blue-100 text-[#0052CC]";
                      } else if (log.type === "Staff" || log.type === "Staff check-in") {
                        bulletColor = "bg-emerald-500";
                        badgeColor = "bg-emerald-100 text-emerald-800";
                      }

                      return (
                        <div key={log.id} className="relative space-y-1">
                          {/* Timeline Point */}
                          <div className={`absolute -left-[19.5px] top-1 h-2 w-2 rounded-full border border-white ${bulletColor}`} />
                          
                          <div className="flex justify-between items-baseline">
                            <span className="text-[7.5px] text-slate-400 font-mono">{log.timestamp}</span>
                            <span className={`text-[7px] font-black uppercase px-1 rounded ${badgeColor}`}>{log.type}</span>
                          </div>

                          <div className="bg-white border border-slate-100 p-2 rounded-lg shadow-2xs space-y-1.5 text-left">
                            <p className="text-[8.5px] text-slate-700 leading-normal font-medium">{log.description}</p>
                            
                            <button
                              type="button"
                              onClick={() => {
                                alert(`Forensic Footprint ID: cbs_sha256_${log.id}_f392\nOperator ID: Principal Owner\nDevice: TECNO Camon 20\nNode IP: 192.168.100.41\nAuth Stamp: OK`);
                              }}
                              className="text-[7px] text-slate-400 hover:text-slate-800 font-bold block"
                            >
                              🔍 Expand Cryptographic Stamp
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  {auditLogs.filter(log => {
                    const matchesSearch = log.description.toLowerCase().includes(auditLogsSearch.toLowerCase()) || 
                      log.type.toLowerCase().includes(auditLogsSearch.toLowerCase());
                    const matchesFilter = auditLogsFilter === "All" || log.type.toLowerCase() === auditLogsFilter.toLowerCase();
                    return matchesSearch && matchesFilter;
                  }).length === 0 && (
                    <p className="text-[9px] text-slate-400 italic py-8 text-center -ml-3">No compliance records matched this filter.</p>
                  )}
                </div>

              </div>

              {/* Action Close & Export */}
              <div className="p-3 border-t border-slate-100 bg-white shrink-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast("Forensic Audit CSV generated!", "success");
                    alert("Simulated Export Complete!\nSaved 'forensic_audit_trail_07022026.csv' containing full cryptographic signatures to your device storage.");
                  }}
                  className="flex-1 bg-slate-900 text-white font-bold py-2 rounded-xl text-center text-[10px] transition-all hover:bg-slate-800"
                >
                  Export CSV Logs
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuditLogsOverlay(false)}
                  className="flex-1 border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold py-2 rounded-xl text-center text-[10px] transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
