
export type SlotStatus = "no-discrepancy" | "discrepancy" | "audited"

export interface SlotAudit {
  slotId: string
  location: string
  wms: {
    barcode: string
    quantity: number
    label: string
  }
  corvus: {
    barcode: string
    quantity: number
    label: string
  }
  discrepancy: null | {
    type: "Wrong Inventory" | "Wrong Quantity" | "Missing Label"
    systemDetected: boolean
    notes?: string
  }
  status: SlotStatus
  auditResult?: string
}

export const slotAudits: SlotAudit[] = [
  {
    slotId: "A1-01",
    location: "Rack A1, Slot 01",
    wms: {
      barcode: "WMS-12345",
      quantity: 15,
      label: "Widgets",
    },
    corvus: {
      barcode: "WMS-12345",
      quantity: 14,
      label: "Widgets",
    },
    discrepancy: {
      type: "Wrong Quantity",
      systemDetected: true,
    },
    status: "discrepancy",
  },
  {
    slotId: "A1-02",
    location: "Rack A1, Slot 02",
    wms: {
      barcode: "WMS-22345",
      quantity: 10,
      label: "Gadgets",
    },
    corvus: {
      barcode: "CORV-99877",
      quantity: 10,
      label: "Gadgets",
    },
    discrepancy: {
      type: "Wrong Inventory",
      systemDetected: true,
    },
    status: "discrepancy",
  },
  {
    slotId: "A1-03",
    location: "Rack A1, Slot 03",
    wms: {
      barcode: "WMS-32345",
      quantity: 11,
      label: "Widgets",
    },
    corvus: {
      barcode: "WMS-32345",
      quantity: 11,
      label: "Widgets",
    },
    discrepancy: null,
    status: "no-discrepancy",
  },
  {
    slotId: "A2-01",
    location: "Rack A2, Slot 01",
    wms: {
      barcode: "WMS-67345",
      quantity: 6,
      label: "",
    },
    corvus: {
      barcode: "WMS-67345",
      quantity: 6,
      label: "",
    },
    discrepancy: {
      type: "Missing Label",
      systemDetected: true,
    },
    status: "discrepancy",
  },
];
