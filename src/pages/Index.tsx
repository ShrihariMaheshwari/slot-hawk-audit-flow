
import { useState } from "react";
import AuditSidebar from "@/components/Sidebar";
import SlotAuditCard from "@/components/SlotAuditCard";
import SlotAuditTable from "@/components/SlotAuditTable";
import AuditProgressBar from "@/components/AuditProgressBar";
import { slotAudits as initialSlotAudits, SlotAudit } from "@/mock/auditData";
import { SidebarProvider } from "@/components/ui/sidebar";

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
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex w-full overflow-x-hidden">
        <AuditSidebar selectedSlotId={selectedSlotId} onSelect={setSelectedSlotId} />
        <main className="flex-1 flex flex-col items-center py-8 px-2 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-violet-800">Warehouse Slot Audit Workflow</h1>
          <div className="mb-2 text-gray-600 max-w-xl text-center">
            Review and audit warehouse slots below. Audited slots are shown with a green check. 
            Use the table for a quick overview, or click a row for details.
          </div>
          <AuditProgressBar slots={slots} />
          <div className="w-full max-w-4xl mb-6">
            <SlotAuditTable slots={slots} selectedSlotId={selectedSlotId} onSelect={setSelectedSlotId} />
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
    </SidebarProvider>
  );
};

export default Index;
