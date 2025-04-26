
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { AlertTriangle, Check, FileText } from "lucide-react";
import { SlotAudit } from "@/types/auditTypes";

interface SidebarProps {
  slots: SlotAudit[];
  selectedSlotId: string;
  onSelect: (slotId: string) => void;
  stats: {
    total: number;
    audited: number;
    withDiscrepancy: number;
    noDiscrepancy: number;
    percentComplete: number;
  };
}

export default function AuditSidebar({ slots, selectedSlotId, onSelect, stats }: SidebarProps) {
  return (
    <Sidebar className="h-full min-h-screen border-r border-gray-100 bg-gray-50 w-[220px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-3 justify-between">
            <span>Slots</span>
            <span className="text-xs text-gray-500">{stats.audited}/{stats.total}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="max-h-[calc(100vh-180px)] overflow-y-auto">
            <SidebarMenu>
              {slots.map((slot) => (
                <SidebarMenuItem key={slot.slotId}>
                  <SidebarMenuButton
                    asChild
                    isActive={selectedSlotId === slot.slotId}
                  >
                    <button
                      aria-label={`Select slot ${slot.slotId}`}
                      className={`flex items-center w-full gap-2 px-1 py-1.5 rounded text-left transition font-semibold ${
                        selectedSlotId === slot.slotId
                          ? "bg-violet-100 text-violet-800"
                          : slot.status === "audited"
                            ? "bg-green-50 text-green-700"
                            : slot.discrepancy
                              ? "bg-orange-50 text-orange-700"
                              : "text-gray-700"
                      }`}
                      onClick={() => onSelect(slot.slotId)}
                    >
                      {slot.discrepancy ? (
                        <AlertTriangle className="text-orange-500 w-5 h-5" />
                      ) : slot.status === "audited" ? (
                        <Check className="text-green-500 w-5 h-5" />
                      ) : (
                        <FileText className="text-gray-400 w-5 h-5" />
                      )}
                      <span className="truncate">{slot.slotId}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-4 p-3 bg-white rounded-md shadow-sm">
          <h3 className="font-medium text-sm mb-2">Audit Summary</h3>
          <div className="space-y-1 text-xs text-gray-500">
            <div>
              <Check className="inline-block w-3 h-3 mr-1 text-green-500" />
              Audited: <b>{stats.audited}</b>
            </div>
            <div>
              <AlertTriangle className="inline-block w-3 h-3 mr-1 text-orange-500" />
              Discrepancy: <b>{stats.withDiscrepancy}</b>
            </div>
            <div>
              <FileText className="inline-block w-3 h-3 mr-1 text-gray-400" />
              Clear: <b>{stats.noDiscrepancy}</b>
            </div>
            <div className="pt-2 text-violet-600 font-medium">
              {stats.percentComplete}% Complete
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
