
import { SlotAudit } from "@/mock/auditData";
import { useState } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SlotAuditCardProps {
  slot: SlotAudit;
  onAudit: (slotId: string, result: string) => void;
  audited: boolean;
}

const badgeColors: Record<string, string> = {
  "Wrong Inventory": "bg-red-200 text-red-700",
  "Wrong Quantity": "bg-orange-200 text-orange-700",
  "Missing Label": "bg-yellow-100 text-yellow-800",
  "Validated": "bg-green-200 text-green-700",
};

export default function SlotAuditCard({ slot, onAudit, audited }: SlotAuditCardProps) {
  const [selectedResult, setSelectedResult] = useState<string>("");

  const handleAudit = (result: string) => {
    setSelectedResult(result);
    onAudit(slot.slotId, result);
    toast({
      title: "Audit Result Saved",
      description: `Slot ${slot.slotId} marked as "${result}".`,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-xl bg-white shadow-md flex flex-col gap-4 border border-gray-100">
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        Slot <span className="font-mono px-2 py-1 bg-gray-100 rounded">{slot.slotId}</span>
        {slot.discrepancy && (
          <span className={`ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full ${badgeColors[slot.discrepancy.type]}`}>
            <AlertTriangle className="w-4 h-4" /> {slot.discrepancy.type}
          </span>
        )}
        {!slot.discrepancy && (
          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
            <Check className="w-4 h-4" /> No discrepancies
          </span>
        )}
      </h2>
      <div className="bg-gray-50 rounded-md p-4 flex flex-col gap-4 border border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-semibold text-gray-600 mb-2">WMS (Expected)</div>
            <div className="space-y-1 text-gray-700 text-sm">
              <div><span className="font-medium">Barcode:</span> {slot.wms.barcode}</div>
              <div><span className="font-medium">Label:</span> {slot.wms.label || <span className="italic text-gray-400">N/A</span>}</div>
              <div><span className="font-medium">Quantity:</span> {slot.wms.quantity}</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-600 mb-2">Corvus (Actual)</div>
            <div className="space-y-1 text-gray-700 text-sm">
              <div><span className="font-medium">Barcode:</span> {slot.corvus.barcode}</div>
              <div><span className="font-medium">Label:</span> {slot.corvus.label || <span className="italic text-gray-400">N/A</span>}</div>
              <div><span className="font-medium">Quantity:</span> {slot.corvus.quantity}</div>
            </div>
          </div>
        </div>
      </div>
      {!audited ? (
        <div>
          <div className="mb-2 font-semibold text-gray-800">Audit Outcome:</div>
          <div className="flex gap-3 flex-wrap mb-3">
            {slot.discrepancy && (
              <>
                <Button
                  variant="outline"
                  className="border-orange-400 text-orange-600"
                  onClick={() => handleAudit(slot.discrepancy.type)}
                >
                  Mark as "{slot.discrepancy.type}"
                </Button>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-700"
                  onClick={() => handleAudit("Validated")}
                >
                  Override - Mark as Validated
                </Button>
              </>
            )}
            {!slot.discrepancy && (
              <Button
                variant="outline"
                className="border-green-500 text-green-700"
                onClick={() => handleAudit("Validated")}
              >
                Mark as Validated
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className={`inline-block rounded px-3 py-1 text-sm font-medium ${badgeColors[slot.auditResult || "Validated"]}`}>
            Audit: {slot.auditResult}
          </div>
        </div>
      )}
    </div>
  );
}
