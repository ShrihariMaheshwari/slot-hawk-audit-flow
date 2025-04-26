
import { SlotAudit } from '@/types/auditTypes';

// Helper function to generate mock data
function generateMockSlots(count: number): SlotAudit[] {
  const slots: SlotAudit[] = [];
  const discrepancyTypes = ["Wrong Inventory", "Wrong Quantity", "Missing Label"] as const;
  const racks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  for (let i = 0; i < count; i++) {
    // Determine slot ID in format like "A1-01"
    const rackLetter = racks[Math.floor(i / 100) % racks.length];
    const rackNumber = Math.floor(i / 10) % 10 + 1;
    const slotNumber = (i % 10) + 1;
    const slotId = `${rackLetter}${rackNumber}-${String(slotNumber).padStart(2, '0')}`;
    
    // Randomly determine if there's a discrepancy (about 30% chance)
    const hasDiscrepancy = Math.random() < 0.3;
    const discrepancyType = discrepancyTypes[Math.floor(Math.random() * discrepancyTypes.length)];
    
    // Determine status (about 20% audited)
    const isAudited = Math.random() < 0.2;
    let status: "no-discrepancy" | "discrepancy" | "audited" = "no-discrepancy";
    if (isAudited) {
      status = "audited";
    } else if (hasDiscrepancy) {
      status = "discrepancy";
    }
    
    // Generate barcode
    const wmsBarcode = `WMS-${Math.floor(10000 + Math.random() * 90000)}`;
    const corvusBarcode = hasDiscrepancy && discrepancyType === "Wrong Inventory"
      ? `CORV-${Math.floor(10000 + Math.random() * 90000)}`
      : wmsBarcode;
    
    // Generate quantities
    const wmsQuantity = Math.floor(1 + Math.random() * 20);
    const corvusQuantity = hasDiscrepancy && discrepancyType === "Wrong Quantity"
      ? wmsQuantity + Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1)
      : wmsQuantity;
    
    // Generate labels
    const labels = ["Widgets", "Gadgets", "Tools", "Parts", "Screws", "Components"];
    const labelIndex = Math.floor(Math.random() * labels.length);
    const wmsLabel = labels[labelIndex];
    const corvusLabel = hasDiscrepancy && discrepancyType === "Missing Label"
      ? ""
      : wmsLabel;
    
    slots.push({
      slotId,
      location: `Rack ${rackLetter}${rackNumber}, Slot ${slotNumber}`,
      wms: {
        barcode: wmsBarcode,
        quantity: wmsQuantity,
        label: wmsLabel,
      },
      corvus: {
        barcode: corvusBarcode,
        quantity: corvusQuantity,
        label: corvusLabel,
      },
      discrepancy: hasDiscrepancy
        ? {
            type: discrepancyType,
            systemDetected: true,
            notes: hasDiscrepancy ? `Detected by system scan on ${new Date().toLocaleDateString()}` : undefined,
          }
        : null,
      status,
      auditResult: isAudited ? (hasDiscrepancy ? discrepancyType : "Validated") : undefined,
    });
  }
  
  return slots;
}

// For demonstration, we'll generate 50 slots
// In a real app, you'd fetch this from an API
export const slotAudits: SlotAudit[] = generateMockSlots(50);
