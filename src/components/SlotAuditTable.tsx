
import { SlotAudit } from "@/mock/auditData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Check, AlertTriangle, FileText } from "lucide-react";

interface SlotAuditTableProps {
  slots: SlotAudit[];
  selectedSlotId: string;
  onSelect: (slotId: string) => void;
}

export default function SlotAuditTable({ slots, selectedSlotId, onSelect }: SlotAuditTableProps) {
  return (
    <div className="rounded-xl bg-white shadow border border-gray-100 w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Slot ID</TableHead>
            <TableHead>Discrepancy</TableHead>
            <TableHead>Expected (WMS)</TableHead>
            <TableHead>Actual (Corvus)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map(slot => (
            <TableRow
              key={slot.slotId}
              className={`cursor-pointer transition hover:bg-violet-50 ${slot.slotId === selectedSlotId ? "bg-violet-100" : ""}`}
              onClick={() => onSelect(slot.slotId)}
            >
              <TableCell>
                {slot.status === "audited" ? (
                  <Check className="text-green-500" />
                ) : slot.discrepancy ? (
                  <AlertTriangle className="text-orange-500" />
                ) : (
                  <FileText className="text-gray-400" />
                )}
              </TableCell>
              <TableCell className="font-mono">{slot.slotId}</TableCell>
              <TableCell>
                {slot.discrepancy ? (
                  <span className="text-orange-700">{slot.discrepancy.type}</span>
                ) : (
                  <span className="text-green-700">None</span>
                )}
              </TableCell>
              <TableCell>
                <div className="text-xs text-gray-500">
                  {slot.wms.label}
                  <span className="block font-mono">
                    {slot.wms.barcode} / Qty: {slot.wms.quantity}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-xs text-gray-500">
                  {slot.corvus.label}
                  <span className="block font-mono">
                    {slot.corvus.barcode} / Qty: {slot.corvus.quantity}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
