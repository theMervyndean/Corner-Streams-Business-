export interface Product {
  id: string;
  productName: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  category: string;
  imageUrl?: string;
  minStockLevel?: number; // Stock Alert Threshold
}

export interface StaffAccount {
  username: string;
  password: string;
  dateAdded: string;
  salesToday?: number;
  ordersCount?: number;
  isOnline?: boolean;
  permissions?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  type: "Register" | "Login" | "Sale" | "Inventory" | "Staff" | "Subscription" | "Admin" | "Debt" | "Shift" | "Branch";
  description: string;
}

export interface DebtorRecord {
  id: string;
  customerName: string;
  phoneNumber: string;
  amountOwed: number;
  dateAdded: string;
  dueDate?: string;
  status: "unpaid" | "partially_paid" | "cleared";
}

export interface ShiftReport {
  id: string;
  date: string;
  staffUsername: string;
  expectedCash: number;
  actualCash: number;
  difference: number;
  remarks: string;
  timestamp: string;
}

export interface BranchRecord {
  id: string;
  name: string;
  location: string;
  manager: string;
}

export interface OfflineSale {
  id: string;
  timestamp: string;
  amount: number;
  itemsCount: number;
}

export interface ReceiptItem {
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface SalesReceipt {
  id: string;
  receiptNumber: string;
  timestamp: string;
  operator: string;
  items: ReceiptItem[];
  totalAmount: number;
  paymentMethod: "Cash" | "Bank Transfer" | "POS Card" | "Debt Ledger";
  status: "verified" | "pending";
}

export interface ShopOwner {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  password: string;
  nin: string;
  ninVerifiedName: string;
  ninLookupStatus: "idle" | "searching" | "verified" | "error";
  goodsType: string;
  selectedPlan: "monthly" | "quarterly" | "yearly";
  cardNumber: string;
  expiry: string;
  cvv: string;
  activePlanType: "trial" | "monthly" | "quarterly" | "yearly";
  dateRegistered: string;
  status: "active" | "suspended";
  cumulativeRevenue: number;
  products: Product[];
  staff: StaffAccount[];
  activities: ActivityLog[];
  debtors?: DebtorRecord[];
  shifts?: ShiftReport[];
  branches?: BranchRecord[];
  offlineSalesQueue?: OfflineSale[];
  salesReceipts?: SalesReceipt[];
  subscriptionPaused?: boolean;
  subscriptionPauseSchedule?: "none" | "end_of_period" | "immediate";
  subscriptionEndDate?: string;
  isRegisteredYetToUpdate?: boolean; // registered but yet to complete/update profile
}
