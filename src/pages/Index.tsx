
import { useState } from "react";
import AuditSidebar from "@/components/Sidebar";
import SlotAuditCard from "@/components/SlotAuditCard";
import { slotAudits as initialSlotAudits, SlotAudit } from "@/mock/auditData";

// A clone for local state, since we can't persist in db here
const cloneSlots = (slots: SlotAudit[]) => slots.map(slot => ({ ...slot }));

const Index = () => {
  const [slots, setSlots] = useState<SlotAudit[]>(cloneSlots(initialSlotAudits));
  const [selectedSlotId, setSelectedSlotId] = useState<string>(slots[0]?.slotId || "");

  const handleAudit = (slotId: string, result: string) => {
    setSlots(prev =>
      prev.map(s =>
        s.slotId === slotId
          ? { ...s, status: "audited", auditResult: result }
          : s
      )
    );
  };

  const selectedSlot = slots.find(s => s.slotId === selectedSlotId);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AuditSidebar selectedSlotId={selectedSlotId} onSelect={setSelectedSlotId} />
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-violet-800">Warehouse Slot Audit Workflow</h1>
        <div className="mb-6 text-gray-600 max-w-xl text-center">
          Review warehouse slots below. Discrepancies between WMS and Corvus scans are highlighted; mark audit outcomes as you proceed.
        </div>
        {selectedSlot ? (
          <SlotAuditCard
            key={selectedSlot.slotId + selectedSlot.status + selectedSlot.auditResult}
            slot={selectedSlot}
            audited={selectedSlot.status === "audited"}
            onAudit={handleAudit}
          />
        ) : (
          <div className="text-gray-400 text-lg mt-8">No slot selected.</div>
        )}
      </main>
    </div>
  );
};

export default Index;

