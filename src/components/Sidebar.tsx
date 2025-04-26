
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { AlertTriangle, Check, FileText } from "lucide-react";
import { slotAudits } from "@/mock/auditData";

interface SidebarProps {
  selectedSlotId: string;
  onSelect: (slotId: string) => void;
}

function countStatus(status: "discrepancy" | "no-discrepancy" | "audited") {
  return slotAudits.filter(slot => slot.status === status).length;
}

export default function AuditSidebar({ selectedSlotId, onSelect }: SidebarProps) {
  return (
    <Sidebar className="h-full min-h-screen border-r border-gray-100 bg-gray-50 w-[220px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-3 justify-between">
            <span>Slots</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {slotAudits.map((slot) => (
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
            <div className="mt-4 space-y-1 text-xs text-gray-500">
              <div>
                <Check className="inline-block w-3 h-3 mr-1 text-green-500" />
                Audited: <b>{countStatus("audited")}</b>
              </div>
              <div>
                <AlertTriangle className="inline-block w-3 h-3 mr-1 text-orange-500" />
                Discrepancy: <b>{countStatus("discrepancy")}</b>
              </div>
              <div>
                <FileText className="inline-block w-3 h-3 mr-1 text-gray-400" />
                Clear: <b>{countStatus("no-discrepancy")}</b>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
