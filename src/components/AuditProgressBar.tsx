
import { Progress } from "@/components/ui/progress";

interface AuditProgressBarProps {
  total: number;
  audited: number;
  percentComplete: number;
}

export default function AuditProgressBar({ total, audited, percentComplete }: AuditProgressBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto mb-5">
      <div className="flex justify-between mb-1 text-xs text-gray-600">
        <span>{audited} of {total} audited</span>
        <span>{percentComplete}%</span>
      </div>
      <Progress value={percentComplete} className="h-2" />
    </div>
  );
}
