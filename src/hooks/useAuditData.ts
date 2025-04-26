
import { useState, useMemo } from 'react';
import { SlotAudit, AuditFilters } from '@/types/auditTypes';
import { slotAudits as initialSlotAudits } from "@/mock/auditData";

// A clone for local state, since we can't persist in db here
const cloneSlots = (slots: SlotAudit[]): SlotAudit[] => 
  slots.map(slot => ({ ...slot }));

export function useAuditData() {
  const [slots, setSlots] = useState<SlotAudit[]>(cloneSlots(initialSlotAudits));
  const [selectedSlotId, setSelectedSlotId] = useState<string>(slots[0]?.slotId || "");
  const [filters, setFilters] = useState<AuditFilters>({
    status: 'all',
    discrepancyType: 'all',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAudit = (slotId: string, result: string) => {
    setSlots(prev =>
      prev.map(s =>
        s.slotId === slotId
          ? { ...s, status: "audited", auditResult: result }
          : s
      )
    );
  };

  const filteredSlots = useMemo(() => {
    return slots.filter(slot => {
      // Filter by status
      if (filters.status !== 'all' && slot.status !== filters.status) {
        return false;
      }

      // Filter by discrepancy type
      if (filters.discrepancyType !== 'all') {
        if (filters.discrepancyType === 'none' && slot.discrepancy !== null) {
          return false;
        }
        if (filters.discrepancyType !== 'none' && 
            (!slot.discrepancy || slot.discrepancy.type !== filters.discrepancyType)) {
          return false;
        }
      }

      // Filter by search term (slot ID)
      if (filters.search && !slot.slotId.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [slots, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSlots.length / itemsPerPage);
  const paginatedSlots = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSlots.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSlots, currentPage, itemsPerPage]);

  const selectedSlot = useMemo(() => 
    slots.find(s => s.slotId === selectedSlotId), 
    [slots, selectedSlotId]
  );

  // Audit statistics
  const stats = useMemo(() => {
    const total = slots.length;
    const audited = slots.filter(s => s.status === "audited").length;
    const withDiscrepancy = slots.filter(s => s.discrepancy !== null).length;
    const noDiscrepancy = slots.filter(s => s.discrepancy === null).length;
    
    return {
      total,
      audited,
      withDiscrepancy,
      noDiscrepancy,
      percentComplete: total === 0 ? 0 : Math.round((audited / total) * 100)
    };
  }, [slots]);

  return {
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
  };
}
