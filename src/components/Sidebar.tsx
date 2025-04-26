
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { AlertTriangle, Check, FileText } from "lucide-react";
import { slotAudits } from "@/mock/auditData";

interface SidebarProps {
  selectedSlotId: string;
  onSelect: (slotId: string) => void;
}

export default function AuditSidebar({ selectedSlotId, onSelect }: SidebarProps) {
  return (
    <Sidebar className="h-full min-h-screen">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Slots</SidebarGroupLabel>
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
                      className="flex items-center w-full gap-2"
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
      </SidebarContent>
    </Sidebar>
  );
}
