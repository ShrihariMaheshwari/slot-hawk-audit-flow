
import { useAuditData } from "@/hooks/useAuditData";
import AuditSidebar from "@/components/Sidebar";
import SlotAuditCard from "@/components/SlotAuditCard";
import SlotAuditTable from "@/components/SlotAuditTable";
import AuditProgressBar from "@/components/AuditProgressBar";
import AuditFilters from "@/components/AuditFilters";
import AuditPagination from "@/components/AuditPagination";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { 
    slots,
    filteredSlots,
    paginatedSlots,
    selectedSlot,
    selectedSlotId,
    setSelectedSlotId,
    handleAudit,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    stats
  } = useAuditData();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex w-full overflow-x-hidden">
        <AuditSidebar 
          slots={slots}
          selectedSlotId={selectedSlotId} 
          onSelect={setSelectedSlotId}
          stats={stats}
        />
        <main className="flex-1 flex flex-col items-center py-5 px-2 sm:px-6 overflow-hidden">
          <div className="w-full max-w-5xl">
            <div className="sticky top-0 bg-white z-20 pb-4 border-b border-gray-100 mb-5">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight text-violet-800">
                Warehouse Slot Audit Workflow
              </h1>
              <div className="mb-4 text-gray-600 text-sm">
                Review and audit warehouse slots below. Filter by status or search for specific slots.
              </div>
              <AuditProgressBar 
                total={stats.total} 
                audited={stats.audited} 
                percentComplete={stats.percentComplete} 
              />
            </div>
            
            <AuditFilters 
              filters={filters} 
              onFilterChange={setFilters} 
              totalRecords={slots.length}
              filteredCount={filteredSlots.length}
            />
            
            <div className="w-full mb-6">
              <SlotAuditTable 
                slots={paginatedSlots} 
                selectedSlotId={selectedSlotId} 
                onSelect={setSelectedSlotId} 
              />
              
              <AuditPagination 
                currentPage={currentPage} 
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
