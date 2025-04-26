
import { Progress } from "@/components/ui/progress";
import { SlotAudit } from "@/mock/auditData";

interface Props {
  slots: SlotAudit[];
}

export default function AuditProgressBar({ slots }: Props) {
  const total = slots.length;
  const audited = slots.filter(s => s.status === "audited").length;
  const percent = total === 0 ? 0 : Math.round((audited / total) * 100);

  return (
    <div className="w-full max-w-xl mx-auto mb-5">
      <div className="flex justify-between mb-1 text-xs text-gray-600">
        <span>{audited} of {total} audited</span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
