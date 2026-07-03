import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Coins,
  Users,
  Database,
  Activity,
  AlertCircle,
  Unlock,
  Lock,
  Plus,
  Trash2,
  FileText,
  CreditCard,
  RefreshCw,
  Sparkles,
  Layers,
  Check,
  ChevronRight,
  Phone,
  Mail,
  Zap,
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { ShopOwner, Product, StaffAccount, ActivityLog } from "../types";

interface SuperAdminDashboardProps {
  shopOwners: ShopOwner[];
  setShopOwners: React.Dispatch<React.SetStateAction<ShopOwner[]>>;
  activeShopId: string | null;
  setActiveShopId: React.Dispatch<React.SetStateAction<string | null>>;
  onSimulateOwnerLogin: (email: string) => void;
}

export default function SuperAdminDashboard({
  shopOwners,
  setShopOwners,
  activeShopId,
  setActiveShopId,
  onSimulateOwnerLogin
}: SuperAdminDashboardProps) {
  // Navigation & Interactive states
  const [selectedShopId, setSelectedShopId] = useState<string | null>(
    shopOwners.length > 0 ? shopOwners[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // State for creating a new custom shop directly from admin console
  const [showCreateShopModal, setShowCreateShopModal] = useState(false);
  const [newBizName, setNewBizName] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newNIN, setNewNIN] = useState("");
  const [newPassword, setNewPassword] = useState("owner123");
  const [newPlan, setNewPlan] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [newGoodsType, setNewGoodsType] = useState("provisions");

  // Automated outreach campaign logs and configuration states
  const [campaignRunning, setCampaignRunning] = useState(false);
  const [campaignLogs, setCampaignLogs] = useState<string[]>([]);
  const [useWhatsApp, setUseWhatsApp] = useState(true);
  const [useInApp, setUseInApp] = useState(true);

  // Admin active shop detail states
  const selectedShop = shopOwners.find((s) => s.id === selectedShopId);

  // Stats aggregations
  const totalShops = shopOwners.length;
  const activeShops = shopOwners.filter((s) => s.status === "active").length;
  const suspendedShops = shopOwners.filter((s) => s.status === "suspended").length;
  const totalStaff = shopOwners.reduce((acc, s) => acc + s.staff.length, 0);
  const totalRevenue = shopOwners.reduce((acc, s) => acc + s.cumulativeRevenue, 0);
  const verifiedNins = shopOwners.filter((s) => s.ninLookupStatus === "verified").length;

  // Filtered Shop Owners list
  const filteredShops = shopOwners.filter((shop) => {
    const matchesSearch =
      shop.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.phoneNumber.includes(searchQuery);

    const matchesPlan = filterPlan === "all" || shop.activePlanType === filterPlan;
    const matchesStatus = filterStatus === "all" || shop.status === filterStatus;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Toggle suspension state
  const handleToggleSuspension = (shopId: string) => {
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const nextStatus = s.status === "active" ? "suspended" : "active";
          const alertDesc =
            nextStatus === "suspended"
              ? "Account suspended by Super Admin override."
              : "Account reactivated by Super Admin override.";
          const newActivity: ActivityLog = {
            id: `act_admin_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "Admin",
            description: alertDesc
          };
          
          // Force disconnect from phone simulator if suspended
          if (nextStatus === "suspended" && activeShopId === shopId) {
            if (setActiveShopId) setActiveShopId(null);
          }

          return {
            ...s,
            status: nextStatus,
            activities: [newActivity, ...s.activities]
          };
        }
        return s;
      })
    );
  };

  // Toggle NIN status manually
  const handleToggleNIN = (shopId: string) => {
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const nextStatus = s.ninLookupStatus === "verified" ? "error" : "verified";
          const newActivity: ActivityLog = {
            id: `act_admin_nin_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "Admin",
            description: `NIN security verification status manually set to ${nextStatus.toUpperCase()} by Super Admin.`
          };
          return {
            ...s,
            ninLookupStatus: nextStatus,
            activities: [newActivity, ...s.activities]
          };
        }
        return s;
      })
    );
  };

  // Force adjust subscription plan type
  const handleUpgradeSubscription = (shopId: string, plan: "monthly" | "quarterly" | "yearly" | "trial") => {
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const newActivity: ActivityLog = {
            id: `act_admin_sub_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "Admin",
            description: `Subscription package upgraded to ${plan.toUpperCase()} by CSB Admin.`
          };
          return {
            ...s,
            activePlanType: plan,
            activities: [newActivity, ...s.activities]
          };
        }
        return s;
      })
    );
  };

  // Inject dynamic mock checkout transaction
  const handleInjectTransaction = (shopId: string, amount: number) => {
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const randomItemsCount = Math.floor(Math.random() * 4) + 1;
          const newActivity: ActivityLog = {
            id: `act_inject_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "Sale",
            description: `⚠️ Admin Injected Sale: Mock terminal checkout of ₦${amount.toLocaleString()} received.`
          };
          return {
            ...s,
            cumulativeRevenue: s.cumulativeRevenue + amount,
            activities: [newActivity, ...s.activities]
          };
        }
        return s;
      })
    );
  };

  // Admin controls to directly add product to a shop
  const [adminNewProdName, setAdminNewProdName] = useState("");
  const [adminNewProdPrice, setAdminNewProdPrice] = useState("");
  const [adminNewProdCost, setAdminNewProdCost] = useState("");
  const [adminNewProdQty, setAdminNewProdQty] = useState("");
  const [adminNewProdCat, setAdminNewProdCat] = useState("Snacks");

  const handleAdminAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShopId || !adminNewProdName || !adminNewProdPrice) return;

    const newProd: Product = {
      id: `prod_admin_${Date.now()}`,
      productName: adminNewProdName,
      costPrice: Number(adminNewProdCost) || 500,
      sellingPrice: Number(adminNewProdPrice),
      currentStock: Number(adminNewProdQty) || 10,
      category: adminNewProdCat
    };

    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === selectedShopId) {
          return {
            ...s,
            products: [newProd, ...s.products],
            activities: [
              {
                id: `act_admin_prod_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Inventory",
                description: `Super Admin injected new inventory item: "${newProd.productName}".`
              },
              ...s.activities
            ]
          };
        }
        return s;
      })
    );

    setAdminNewProdName("");
    setAdminNewProdPrice("");
    setAdminNewProdCost("");
    setAdminNewProdQty("");
  };

  // Admin controls to directly add staff to a shop
  const [adminNewStaffName, setAdminNewStaffName] = useState("");
  const [adminNewStaffPass, setAdminNewStaffPass] = useState("");
  const [adminNewStaffRole, setAdminNewStaffRole] = useState("Counter Sales Only");

  const handleAdminAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShopId || !adminNewStaffName || !adminNewStaffPass) return;

    const newStaff: StaffAccount = {
      username: adminNewStaffName.toLowerCase().replace(/\s+/g, "_"),
      password: adminNewStaffPass,
      dateAdded: new Date().toISOString().split("T")[0],
      salesToday: 0,
      ordersCount: 0,
      isOnline: false,
      permissions: adminNewStaffRole
    };

    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === selectedShopId) {
          return {
            ...s,
            staff: [newStaff, ...s.staff],
            activities: [
              {
                id: `act_admin_staff_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Staff",
                description: `Super Admin registered new staff login: "${newStaff.username}" (${newStaff.permissions}).`
              },
              ...s.activities
            ]
          };
        }
        return s;
      })
    );

    setAdminNewStaffName("");
    setAdminNewStaffPass("");
  };

  // Delete product directly
  const handleAdminDeleteProduct = (prodId: string) => {
    if (!selectedShopId) return;
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === selectedShopId) {
          const removed = s.products.find(p => p.id === prodId);
          return {
            ...s,
            products: s.products.filter((p) => p.id !== prodId),
            activities: [
              {
                id: `act_admin_prod_del_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Inventory",
                description: `Super Admin removed product "${removed?.productName || prodId}" from shop catalog.`
              },
              ...s.activities
            ]
          };
        }
        return s;
      })
    );
  };

  // Delete staff directly
  const handleAdminDeleteStaff = (username: string) => {
    if (!selectedShopId) return;
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === selectedShopId) {
          return {
            ...s,
            staff: s.staff.filter((st) => st.username !== username),
            activities: [
              {
                id: `act_admin_staff_del_${Date.now()}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "Staff",
                description: `Super Admin deleted staff account: "${username}".`
              },
              ...s.activities
            ]
          };
        }
        return s;
      })
    );
  };

  // Toggle subscription paused state
  const handleToggleSubscriptionPause = (shopId: string) => {
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const nextPausedState = !s.subscriptionPaused;
          const newActivity: ActivityLog = {
            id: `act_admin_pause_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "Admin",
            description: nextPausedState
              ? "Subscription was PAUSED by CSB central admin."
              : "Subscription was RESUMED by CSB central admin."
          };
          return {
            ...s,
            subscriptionPaused: nextPausedState,
            subscriptionPauseSchedule: nextPausedState ? s.subscriptionPauseSchedule : "none",
            activities: [newActivity, ...s.activities]
          };
        }
        return s;
      })
    );
  };

  // Set subscription automated pause schedule
  const handleSetSubscriptionPauseSchedule = (shopId: string, schedule: "none" | "end_of_period" | "immediate") => {
    setShopOwners((prev) =>
      prev.map((s) => {
        if (s.id === shopId) {
          const newActivity: ActivityLog = {
            id: `act_admin_schedule_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            type: "Admin",
            description: `Automated pause scheduled: ${schedule.toUpperCase()}`
          };
          return {
            ...s,
            subscriptionPauseSchedule: schedule,
            subscriptionPaused: schedule === "immediate" ? true : s.subscriptionPaused,
            activities: [newActivity, ...s.activities]
          };
        }
        return s;
      })
    );
  };

  // Execute outreach campaign for registered businesses yet to update and expiring plans
  const handleRunCampaign = () => {
    setCampaignRunning(true);
    setCampaignLogs(["Initializing Outreach Engines...", "Connecting to WhatsApp Business API Gateway...", "Accessing POS Terminal In-App Push Hub..."]);

    const yetToUpdate = shopOwners.filter(s => s.isRegisteredYetToUpdate);
    const endingSoon = shopOwners.filter(s => {
      if (!s.subscriptionEndDate) return false;
      const end = new Date(s.subscriptionEndDate).getTime();
      const current = new Date("2026-07-02").getTime();
      const diffDays = (end - current) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    });

    setTimeout(() => {
      let logs: string[] = ["Engines online. Targeting merchants..."];
      let count = 0;

      // Process yet to update
      yetToUpdate.forEach(shop => {
        const phone = shop.phoneNumber || "+234 810 555 7777";
        if (useWhatsApp) {
          logs.push(`[WHATSAPP SUCCESS] Sent to ${phone} (Owner: ${shop.ownerName}): "Dear ${shop.ownerName}, you registered ${shop.businessName} but are yet to complete catalog updates. Complete setup within 48h to prevent terminal lock!"`);
        }
        if (useInApp) {
          logs.push(`[IN-APP SUCCESS] Dispatched setup alert to ${shop.businessName} POS terminal.`);
          
          setShopOwners(prev => prev.map(s => {
            if (s.id === shop.id) {
              return {
                ...s,
                activities: [
                  {
                    id: `act_msg_warn_${Date.now()}`,
                    timestamp: new Date().toLocaleTimeString(),
                    type: "Admin",
                    description: "🔔 SYSTEM ALERT: Please complete your retail catalog registration. Unpopulated shops will be locked out within 48 hours."
                  },
                  ...s.activities
                ]
              };
            }
            return s;
          }));
        }
        count++;
      });

      // Process expiring plans
      endingSoon.forEach(shop => {
        const phone = shop.phoneNumber || "+234 905 555 6666";
        if (useWhatsApp) {
          logs.push(`[WHATSAPP SUCCESS] Sent to ${phone} (Owner: ${shop.ownerName}): "Dear ${shop.ownerName}, your CornerStreams subscription for ${shop.businessName} is ending on ${shop.subscriptionEndDate}. Please ensure your pre-authorized card is funded for auto-renewal."`);
        }
        if (useInApp) {
          logs.push(`[IN-APP SUCCESS] Dispatched expiring alert to ${shop.businessName} POS terminal.`);
          
          setShopOwners(prev => prev.map(s => {
            if (s.id === shop.id) {
              return {
                ...s,
                activities: [
                  {
                    id: `act_msg_sub_${Date.now()}`,
                    timestamp: new Date().toLocaleTimeString(),
                    type: "Admin",
                    description: `💳 SUBSCRIPTION WARNING: Your subscription tier ends on ${shop.subscriptionEndDate}. Autopay debit is scheduled.`
                  },
                  ...s.activities
                ]
              };
            }
            return s;
          }));
        }
        count++;
      });

      logs.push(`Campaign completed successfully! ${count} merchants notified.`);
      setCampaignLogs(logs);
      setCampaignRunning(false);
    }, 1200);
  };

  // Create new shop owner from Admin console
  const handleCreateShopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName || !newOwnerName || !newEmail || !newPhone) return;

    const newId = `owner_${Date.now()}`;
    const newOwnerObj: ShopOwner = {
      id: newId,
      businessName: newBizName,
      ownerName: newOwnerName,
      email: newEmail,
      phoneNumber: newPhone,
      password: newPassword,
      nin: newNIN || "11223344556",
      ninVerifiedName: newOwnerName,
      ninLookupStatus: newNIN ? "verified" : "idle",
      goodsType: newGoodsType,
      selectedPlan: newPlan,
      cardNumber: "4242 4242 4242 " + Math.floor(1000 + Math.random() * 9000).toString(),
      expiry: "12/28",
      cvv: "321",
      activePlanType: newPlan,
      dateRegistered: new Date().toISOString().split("T")[0],
      status: "active",
      cumulativeRevenue: 0,
      products: [
        { id: `p_init_1_${Date.now()}`, productName: "Sovereign Cooking Oil 1L", costPrice: 3800, sellingPrice: 4500, currentStock: 25, category: "Provisions" },
        { id: `p_init_2_${Date.now()}`, productName: "Gala Sausage Roll Pack", costPrice: 1500, sellingPrice: 1800, currentStock: 4, category: "Snacks" }
      ],
      staff: [
        { username: `staff_${newOwnerName.toLowerCase().split(' ')[0]}`, password: "1234", dateAdded: new Date().toISOString().split("T")[0], salesToday: 0, ordersCount: 0, isOnline: true, permissions: "Counter Sales Only" }
      ],
      activities: [
        { id: `act_adm_reg_${Date.now()}`, timestamp: new Date().toLocaleTimeString(), type: "Register", description: "Account created directly from CSB Central Super Admin Console." }
      ]
    };

    setShopOwners((prev) => [...prev, newOwnerObj]);
    setSelectedShopId(newId);
    setShowCreateShopModal(false);

    // Reset fields
    setNewBizName("");
    setNewOwnerName("");
    setNewEmail("");
    setNewPhone("");
    setNewNIN("");
    setNewPassword("owner123");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 text-white space-y-6 shadow-xl relative min-h-[680px]">
      {/* Decorative branding elements */}
      <div className="absolute top-0 right-0 p-8 opacity-5 font-mono select-none pointer-events-none text-9xl">
        CSB
      </div>

      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5 shrink-0">
        <div>
          <span className="text-[10px] bg-red-500/15 text-red-400 border border-red-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            🛡️ SECURITY PRIVILEGES: SUPER ADMIN CONSOLE
          </span>
          <h2 className="text-xl font-display font-black tracking-tight text-white mt-1.5 flex items-center gap-2">
            <span>CornerStreams Business Registry</span>
            <span className="text-[11px] bg-[#0052CC] text-white px-2 py-0.5 rounded font-mono font-medium tracking-normal">v4.0 RESTRICTED</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time control over all active merchants, staff registry pipelines, compliance audit histories, and active card auto-billing gateways.
          </p>
        </div>

        <button
          onClick={() => setShowCreateShopModal(true)}
          className="bg-[#0052CC] hover:bg-[#0052CC]/90 text-white font-sans font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Provision New Shop</span>
        </button>
      </div>

      {/* METRIC CARD GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-slate-800/45 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Shops</span>
            <Database className="h-4 w-4 text-[#0052CC]" />
          </div>
          <p className="text-2xl font-mono font-black mt-1.5 text-white">{totalShops}</p>
          <p className="text-[9px] text-slate-400 mt-1">Global merchants registered</p>
        </div>

        <div className="bg-slate-800/45 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Stream</span>
            <span className="h-2 w-2 rounded-full bg-[#4CBB17] animate-pulse"></span>
          </div>
          <p className="text-2xl font-mono font-black mt-1.5 text-[#4CBB17]">{activeShops}</p>
          <p className="text-[9px] text-slate-400 mt-1">Unrestricted active terminals</p>
        </div>

        <div className="bg-slate-800/45 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Suspended</span>
            <ShieldAlert className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-2xl font-mono font-black mt-1.5 text-red-400">{suspendedShops}</p>
          <p className="text-[9px] text-slate-400 mt-1">Locked out due to compliance</p>
        </div>

        <div className="bg-slate-800/45 border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Staff</span>
            <Users className="h-4 w-4 text-[#00875A]" />
          </div>
          <p className="text-2xl font-mono font-black mt-1.5 text-[#00875A]">{totalStaff}</p>
          <p className="text-[9px] text-slate-400 mt-1">Underactive team logins</p>
        </div>

        <div className="bg-slate-800/45 border border-slate-800 p-3.5 rounded-2xl col-span-2 md:col-span-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Sales (Naira)</span>
            <Coins className="h-4 w-4 text-yellow-500" />
          </div>
          <p className="text-2xl font-mono font-black mt-1.5 text-yellow-500">₦{totalRevenue.toLocaleString()}</p>
          <p className="text-[9px] text-slate-400 mt-1">Aggregated platform trade volume</p>
        </div>
      </div>

      {/* CORE WORKSPACE SPLIT (LEFT: TABLE, RIGHT: DETAIL CONSOLE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: FILTERABLE REGISTER TABLE (7 COLS) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 space-y-3">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by business, owner, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-[#0052CC] font-sans"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-400">
                  <Filter className="h-3 w-3 shrink-0 text-[#0052CC]" />
                  <span>Plan:</span>
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="bg-transparent text-white border-none outline-none cursor-pointer focus:ring-0 font-sans p-0 m-0"
                  >
                    <option value="all">All Plan Cycles</option>
                    <option value="trial">Trial Mode Only</option>
                    <option value="monthly">Monthly Active</option>
                    <option value="quarterly">Quarterly Active</option>
                    <option value="yearly">Yearly Active</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-400">
                  <span>Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-transparent text-white border-none outline-none cursor-pointer focus:ring-0 font-sans p-0 m-0"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Terminals</option>
                    <option value="suspended">Suspended Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shop owners Master Table */}
            <div className="overflow-x-auto pr-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                    <th className="py-2.5 px-3">Business Name & Owner</th>
                    <th className="py-2.5 px-3">Plan Cycle</th>
                    <th className="py-2.5 px-3 text-right">Transactions</th>
                    <th className="py-2.5 px-3 text-center">NIMC NIN</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredShops.map((shop) => (
                    <tr
                      key={shop.id}
                      onClick={() => setSelectedShopId(shop.id)}
                      className={`cursor-pointer transition-colors group ${
                        selectedShopId === shop.id
                          ? "bg-[#0052CC]/15 text-white"
                          : "hover:bg-slate-800/30 text-slate-300"
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            {shop.businessName}
                            {activeShopId === shop.id && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#4CBB17] animate-ping" title="Active on simulator screen"></span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            {shop.ownerName} &bull; <span className="font-mono">{shop.email}</span>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block text-[9px] px-2 py-0.5 rounded font-mono font-black ${
                          shop.activePlanType === "trial"
                            ? "bg-slate-700 text-slate-300"
                            : shop.activePlanType === "yearly"
                            ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                            : "bg-[#0052CC]/15 text-blue-400 border border-blue-500/20"
                        }`}>
                          {shop.activePlanType.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        <div className="flex flex-col items-end">
                          <span className="text-yellow-400">₦{shop.cumulativeRevenue.toLocaleString()}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">{shop.products.length} Products &bull; {shop.staff.length} Staff</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleNIN(shop.id);
                          }}
                          className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full cursor-pointer hover:scale-105 transition-all ${
                            shop.ninLookupStatus === "verified"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                          title="Click to toggle NIN status manually"
                        >
                          {shop.ninLookupStatus === "verified" ? (
                            <>
                              <ShieldCheck className="h-2.5 w-2.5" />
                              <span>Verified</span>
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="h-2.5 w-2.5" />
                              <span>Required</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSuspension(shop.id);
                          }}
                          className={`inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full cursor-pointer hover:scale-105 transition-all ${
                            shop.status === "active"
                              ? "bg-[#00875A]/15 text-[#00875A] border border-[#00875A]/20"
                              : "bg-red-500/15 text-red-500 border border-red-500/20"
                          }`}
                          title="Click to suspend / reactivate merchant account"
                        >
                          {shop.status === "active" ? (
                            <>
                              <Unlock className="h-2 w-2" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-2 w-2 animate-pulse" />
                              <span>Suspended</span>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredShops.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500 font-sans italic">
                        No active shop owners matching search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MERCHANT OUTREACH & COMPLIANCE PUSH ENGINE */}
          <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-4 mt-4 space-y-3.5 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-display font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span className="p-1 rounded bg-[#00875A]/20 text-[#00875A]">💬</span>
                  <span>Merchants Automated Outreach Campaign Engine</span>
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                  Send real-time alerts to unpopulated merchants and expiring pre-authorized card cycles via dual-channel WhatsApp and POS In-App messages.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-bold text-[8.5px] block">Onboarding Warning Targets</span>
                <p className="font-mono font-bold text-white text-xs">{shopOwners.filter(s => s.isRegisteredYetToUpdate).length} Pending Setup</p>
                <p className="text-slate-400 text-[8.5px]">Registered but unpopulated stores</p>
              </div>

              <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-bold text-[8.5px] block">Renewal Reminders (7-Day window)</span>
                <p className="font-mono font-bold text-yellow-400 text-xs">
                  {shopOwners.filter(s => {
                    if (!s.subscriptionEndDate) return false;
                    const end = new Date(s.subscriptionEndDate).getTime();
                    const current = new Date("2026-07-02").getTime();
                    const diffDays = (end - current) / (1000 * 60 * 60 * 24);
                    return diffDays >= 0 && diffDays <= 7;
                  }).length} Accounts expiring
                </p>
                <p className="text-slate-400 text-[8.5px]">Includes: Musa Danjuma, Bello Aliko, Chinelo Okeke</p>
              </div>
            </div>

            {/* Config & Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60 text-[10px]">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useWhatsApp}
                    onChange={(e) => setUseWhatsApp(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-[#0052CC] focus:ring-0"
                  />
                  <span className="text-slate-300">WhatsApp API Portal</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useInApp}
                    onChange={(e) => setUseInApp(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-950 text-[#0052CC] focus:ring-0"
                  />
                  <span className="text-slate-300">POS Terminal In-App Push</span>
                </label>
              </div>

              <button
                type="button"
                disabled={campaignRunning}
                onClick={handleRunCampaign}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow ${
                  campaignRunning
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-[#0052CC] hover:bg-[#0052CC]/90 text-white active:scale-95"
                }`}
              >
                {campaignRunning ? "Dispatching..." : "⚡ Dispatch Automated Campaign"}
              </button>
            </div>

            {/* Campaign Logs Output Console */}
            {campaignLogs.length > 0 && (
              <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 font-mono text-[9.5px] text-slate-300 space-y-1.5 max-h-[160px] overflow-y-auto">
                <div className="flex items-center justify-between text-[8px] text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1 mb-1">
                  <span>Dual Channel Campaign Log Terminal</span>
                  <button onClick={() => setCampaignLogs([])} className="hover:text-white font-black text-xs">✕</button>
                </div>
                {campaignLogs.map((log, i) => (
                  <div key={i} className={`leading-relaxed ${log.includes("SUCCESS") || log.includes("completed") ? "text-[#4CBB17]" : "text-slate-300"}`}>
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIONABLE CENTRAL CONTROLLER (5 COLS) */}
        <div className="lg:col-span-5">
          {selectedShop ? (
            <div className="bg-slate-800/30 border border-slate-800 rounded-3xl p-5 space-y-5 flex flex-col h-full justify-between">
              
              {/* Header: Shop Credentials */}
              <div className="space-y-2 border-b border-slate-800/50 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-wide">
                      {selectedShop.businessName}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {selectedShop.id}</p>
                  </div>
                  
                  {/* Simulate Quick Login */}
                  <button
                    onClick={() => onSimulateOwnerLogin(selectedShop.email)}
                    className="bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-[#0052CC] border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1"
                    title="Logs in this shop owner in the phone simulator instantly"
                  >
                    <span>Simulate Screen Login</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </button>
                </div>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-300 pt-1.5">
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-2 rounded-xl">
                    <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{selectedShop.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-2 rounded-xl">
                    <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                    <span className="truncate font-mono">{selectedShop.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Merchant: <strong className="text-white font-sans">{selectedShop.ownerName}</strong></span>
                  <span>Registered: <strong className="text-white font-mono">{selectedShop.dateRegistered}</strong></span>
                </div>

                {/* Localized African Operations Pulse Metrics */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2.5 mt-2 space-y-2">
                  <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 block">African Business Operational Indicators</span>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-sm block">📍</span>
                      <span className="font-mono font-bold text-white block">{(selectedShop as any).branches?.length || 0} Outlets</span>
                      <span className="text-[7.5px] text-slate-500 leading-none block mt-0.5">Multi-Branch Sync</span>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-sm block">📕</span>
                      <span className="font-mono font-bold text-rose-400 block">{(selectedShop as any).debtors?.length || 0} Debtors</span>
                      <span className="text-[7.5px] text-slate-500 leading-none block mt-0.5">Outstanding Credits</span>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-sm block">⏱️</span>
                      <span className="font-mono font-bold text-amber-400 block">{(selectedShop as any).shifts?.length || 0} Audits</span>
                      <span className="text-[7.5px] text-slate-500 leading-none block mt-0.5">Closed Shifts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION: ADMIN ACTIONS QUICK TRIGGERS */}
              <div className="space-y-2">
                <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  🛡️ Override Administrative Controls
                </h4>
                
                <div className="grid grid-cols-2 gap-2">
                  {/* Lock/Unlock Override */}
                  <button
                    onClick={() => handleToggleSuspension(selectedShop.id)}
                    className={`p-2.5 rounded-xl border flex flex-col justify-center items-center text-center gap-1 transition-all ${
                      selectedShop.status === "active"
                        ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10 text-red-400"
                        : "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {selectedShop.status === "active" ? (
                      <>
                        <Lock className="h-4 w-4" />
                        <span className="text-[10px] font-bold">Suspend Account</span>
                        <span className="text-[7.5px] text-slate-500 leading-none">Block terminal access</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-4 w-4" />
                        <span className="text-[10px] font-bold">Unlock Account</span>
                        <span className="text-[7.5px] text-slate-500 leading-none">Restore active permissions</span>
                      </>
                    )}
                  </button>

                  {/* Manual NIN Certifier */}
                  <button
                    onClick={() => handleToggleNIN(selectedShop.id)}
                    className="bg-slate-900 hover:bg-slate-850 border border-slate-800 p-2.5 rounded-xl flex flex-col justify-center items-center text-center gap-1 transition-all"
                  >
                    <ShieldCheck className={`h-4 w-4 ${selectedShop.ninLookupStatus === "verified" ? "text-emerald-400" : "text-slate-500"}`} />
                    <span className="text-[10px] font-bold text-white">Toggle NIN Status</span>
                    <span className="text-[7.5px] text-slate-500 leading-none">
                      {selectedShop.ninLookupStatus === "verified" ? "Override: Unverify" : "Override: Verify Compliance"}
                    </span>
                  </button>
                </div>

                {/* Inject mock checkout revenues */}
                <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-bold text-slate-400">⚡ Injected Sales Simulator</span>
                    <span className="text-[8px] bg-yellow-500/10 text-yellow-400 px-1 rounded font-bold uppercase">Mock Terminal</span>
                  </div>
                  <p className="text-[8px] text-slate-400 leading-normal">
                    Trigger artificial cash checkout actions on behalf of this shop. Increments total naira revenue and triggers logs instantly on the merchant simulator.
                  </p>
                  <div className="flex items-center gap-2 pt-0.5">
                    {[5000, 15000, 45000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleInjectTransaction(selectedShop.id, amt)}
                        className="flex-1 bg-slate-850 hover:bg-slate-800 text-[9.5px] font-bold py-1.5 rounded-lg text-yellow-500 border border-slate-800 active:scale-95 transition-all font-mono"
                      >
                        +₦{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SPLIT TABS: INVENTORY VS STAFF DIRECT CONFIGURATION */}
              <div className="flex-1 max-h-[220px] overflow-y-auto space-y-4 pr-1">
                
                {/* 1. DIRECT INVENTORY ADJUSTER */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800/45 pb-1">
                    <h5 className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <ShoppingBag className="h-3 w-3 text-[#0052CC]" />
                      <span>Shop Inventory Items ({selectedShop.products.length})</span>
                    </h5>
                  </div>

                  {/* Add Product Directly */}
                  <form onSubmit={handleAdminAddProduct} className="grid grid-cols-4 gap-1 bg-slate-900 p-2 rounded-xl">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={adminNewProdName}
                      onChange={(e) => setAdminNewProdName(e.target.value)}
                      className="col-span-2 bg-slate-850 border border-slate-800 px-2 py-1 text-[10px] outline-none text-white rounded"
                    />
                    <input
                      type="number"
                      placeholder="₦ Price"
                      value={adminNewProdPrice}
                      onChange={(e) => setAdminNewProdPrice(e.target.value)}
                      className="col-span-1 bg-slate-850 border border-slate-800 px-2 py-1 text-[10px] outline-none text-white rounded font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-[#0052CC] hover:bg-[#0052CC]/90 text-white font-bold text-[9px] rounded py-1"
                    >
                      Add
                    </button>
                  </form>

                  {/* List of current shop inventory */}
                  <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                    {selectedShop.products.map((p) => (
                      <div key={p.id} className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded-lg text-[10px] border border-slate-800/40 hover:border-slate-800">
                        <div>
                          <p className="font-bold text-slate-200">{p.productName}</p>
                          <p className="text-[8px] text-slate-400 mt-0.5">Cat: {p.category} &bull; Cost: ₦{p.costPrice}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold text-[10px] ${p.currentStock <= 5 ? "text-red-400" : "text-emerald-400"}`}>
                            {p.currentStock} in stock
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdminDeleteProduct(p.id)}
                            className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. DIRECT STAFF CONTROLLER */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800/45 pb-1">
                    <h5 className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Users className="h-3 w-3 text-[#00875A]" />
                      <span>Merchant Staff Accounts ({selectedShop.staff.length})</span>
                    </h5>
                  </div>

                  {/* Add Staff Directly */}
                  <form onSubmit={handleAdminAddStaff} className="grid grid-cols-4 gap-1 bg-slate-900 p-2 rounded-xl">
                    <input
                      type="text"
                      placeholder="Staff Username"
                      value={adminNewStaffName}
                      onChange={(e) => setAdminNewStaffName(e.target.value)}
                      className="col-span-2 bg-slate-850 border border-slate-800 px-2 py-1 text-[10px] outline-none text-white rounded"
                    />
                    <input
                      type="text"
                      placeholder="PIN Code"
                      value={adminNewStaffPass}
                      onChange={(e) => setAdminNewStaffPass(e.target.value)}
                      className="col-span-1 bg-slate-850 border border-slate-800 px-2 py-1 text-[10px] outline-none text-white rounded font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-[#00875A] hover:bg-[#00875A]/90 text-white font-bold text-[9px] rounded py-1"
                    >
                      Add
                    </button>
                  </form>

                  {/* List of current shop staff logins */}
                  <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                    {selectedShop.staff.map((st, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-900/40 p-1.5 rounded-lg text-[10px] border border-slate-800/40 hover:border-slate-800">
                        <div>
                          <p className="font-bold text-slate-200 flex items-center gap-1">
                            <span className={`h-1.5 w-1.5 rounded-full ${st.isOnline ? "bg-[#4CBB17]" : "bg-slate-600"}`}></span>
                            <span>{st.username}</span>
                          </p>
                          <p className="text-[8.5px] text-slate-400 mt-0.5">Role: {st.permissions || "Counter Sales"}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="bg-slate-900 px-1 text-[9px] rounded font-mono text-blue-400">{st.password}</code>
                          <button
                            type="button"
                            onClick={() => handleAdminDeleteStaff(st.username)}
                            className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                            title="Remove Staff Login"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. SHOP COMPLIANCE ACTIVITIES */}
                <div className="space-y-1.5">
                  <h5 className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1 border-b border-slate-800/45 pb-1">
                    <Activity className="h-3 w-3 text-slate-400" />
                    <span>Compliance Activity Log Stream</span>
                  </h5>
                  <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                    {selectedShop.activities.map((act) => (
                      <div key={act.id} className="text-[9.5px] bg-slate-900/50 p-2 rounded-xl flex flex-col gap-1 text-slate-300 border border-slate-850">
                        <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono">
                          <span>{act.timestamp}</span>
                          <span className={`px-1.5 rounded uppercase font-bold text-[7.5px] ${
                            act.type === "Admin" ? "bg-red-500/10 text-red-400" :
                            act.type === "Sale" ? "bg-yellow-500/10 text-yellow-400" :
                            act.type === "Inventory" ? "bg-blue-500/10 text-blue-400" : "bg-slate-800 text-slate-400"
                          }`}>
                            {act.type}
                          </span>
                        </div>
                        <p className="leading-relaxed font-sans">{act.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Automated Pause and Pause Schedule Controls */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 space-y-2 text-left shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-bold text-slate-400 flex items-center gap-1">
                    <CreditCard className="h-3 w-3 text-yellow-400" />
                    <span>Subscription Overrides & Pause Gates</span>
                  </span>
                  <div className="flex items-center gap-1">
                    {selectedShop.subscriptionPaused ? (
                      <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/25 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">Paused</span>
                    ) : (
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Active</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleToggleSubscriptionPause(selectedShop.id)}
                    className={`py-1.5 px-2.5 rounded-lg border font-bold text-[9.5px] transition-all flex items-center justify-center gap-1 ${
                      selectedShop.subscriptionPaused
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                    }`}
                  >
                    <span>{selectedShop.subscriptionPaused ? "▶ Resume Subscription" : "⏸ Pause Subscription"}</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
                    <span className="text-[8px] text-slate-400 font-sans whitespace-nowrap">Schedule:</span>
                    <select
                      value={selectedShop.subscriptionPauseSchedule || "none"}
                      onChange={(e) => handleSetSubscriptionPauseSchedule(selectedShop.id, e.target.value as any)}
                      className="bg-transparent text-white border-none outline-none text-[9px] font-bold cursor-pointer p-0 m-0 w-full"
                    >
                      <option value="none" className="bg-slate-900">Immediate Run</option>
                      <option value="end_of_period" className="bg-slate-900">End of Period</option>
                      <option value="immediate" className="bg-slate-900">Force Stop Now</option>
                    </select>
                  </div>
                </div>

                {/* Date display & indicators */}
                <div className="flex justify-between items-center text-[8.5px] text-slate-400 font-mono">
                  <span>Cycle Renewal Date: <strong>{selectedShop.subscriptionEndDate || "2026-07-28"}</strong></span>
                  {selectedShop.subscriptionPauseSchedule && selectedShop.subscriptionPauseSchedule !== "none" && (
                    <span className="text-yellow-400">Scheduled: {selectedShop.subscriptionPauseSchedule.toUpperCase().replace(/_/g, ' ')}</span>
                  )}
                </div>
              </div>

              {/* Plan controls footer */}
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-2.5 flex items-center justify-between shrink-0">
                <div className="space-y-0.5">
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active Plan Cycle</p>
                  <p className="text-[10px] font-mono font-bold text-yellow-400 uppercase">{selectedShop.activePlanType} Auto-Pay Tier</p>
                </div>

                <div className="flex items-center gap-1.5 text-[9.5px]">
                  <span className="text-slate-400 font-sans">Quick Tier Upgrade:</span>
                  <div className="flex items-center gap-1">
                    {["monthly", "quarterly", "yearly"].map((t) => (
                      <button
                        key={t}
                        onClick={() => handleUpgradeSubscription(selectedShop.id, t as any)}
                        className={`px-2 py-0.5 rounded font-bold uppercase tracking-wide text-[8px] border transition-all ${
                          selectedShop.activePlanType === t
                            ? "bg-[#0052CC] text-white border-[#0052CC]"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                      >
                        {t === "monthly" ? "Mo" : t === "quarterly" ? "Qtr" : "Yr"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-800/15 border border-slate-800 border-dashed rounded-3xl p-8 flex flex-col justify-center items-center text-slate-500 h-full">
              <AlertCircle className="h-8 w-8 mb-2 text-slate-600" />
              <p className="text-xs italic">Select a shop owner to display admin overrides and active control panel</p>
            </div>
          )}
        </div>

      </div>

      {/* MODAL: CREATE SHOP FROM ADMIN */}
      {showCreateShopModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-md space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-display font-black text-sm text-white uppercase tracking-wide flex items-center gap-1.5">
                <Plus className="h-4 w-4 text-[#0052CC]" />
                <span>Provision CornerStreams Shop</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowCreateShopModal(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateShopSubmit} className="space-y-3 text-xs text-left">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kola Provisions & Groceries"
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Owner Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kola Adedoyin"
                    value={newOwnerName}
                    onChange={(e) => setNewOwnerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +234 812 345 6789"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kola@provisions.ng"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Owner Secure Password</label>
                  <input
                    type="text"
                    placeholder="e.g. owner123"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">11-Digit NIMC NIN</label>
                  <input
                    type="text"
                    maxLength={11}
                    placeholder="e.g. 50493827104"
                    value={newNIN}
                    onChange={(e) => setNewNIN(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Initial Auto-Pay Cycle</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC]"
                  >
                    <option value="monthly">Monthly (₦5,000/mo)</option>
                    <option value="quarterly">Quarterly (₦12,550/qtr)</option>
                    <option value="yearly">Yearly (₦42,000/yr)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Inventory Catalog Type</label>
                  <select
                    value={newGoodsType}
                    onChange={(e) => setNewGoodsType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-[#0052CC]"
                  >
                    <option value="provisions">Provisions & Groceries</option>
                    <option value="cosmetics">Cosmetics & Beauty</option>
                    <option value="electronics">Electronics & Gadgets</option>
                    <option value="beverages">Wines & Beverages</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#0052CC] hover:bg-[#0052CC]/90 text-white font-sans font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                >
                  Confirm & Initialize Active Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
