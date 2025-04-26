
export type SlotStatus = "no-discrepancy" | "discrepancy" | "audited";

export interface InventoryData {
  barcode: string;
  quantity: number;
  label: string;
}

export interface DiscrepancyInfo {
  type: "Wrong Inventory" | "Wrong Quantity" | "Missing Label";
  systemDetected: boolean;
  notes?: string;
}

export interface SlotAudit {
  slotId: string;
  location: string;
  wms: InventoryData;
  corvus: InventoryData;
  discrepancy: DiscrepancyInfo | null;
  status: SlotStatus;
  auditResult?: string;
}

export interface AuditFilters {
  status: SlotStatus | 'all';
  discrepancyType: string | 'all';
  search: string;
}
