import { cn } from "@/lib/utils"

interface SeverityBadgeProps {
  severity: "Critical" | "Moderate" | "Needs Attention" | "Fixed"
  className?: string
}

const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const getBadgeStyles = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-critical text-critical-foreground border-critical"
      case "Moderate":
        return "bg-moderate text-moderate-foreground border-moderate"
      case "Needs Attention":
        return "bg-warning text-warning-foreground border-warning"
      case "Fixed":
        return "bg-success text-success-foreground border-success"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "🔴"
      case "Moderate":
        return "🟧"
      case "Needs Attention":
        return "🟨"
      case "Fixed":
        return "🟢"
      default:
        return "⚪"
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
        getBadgeStyles(severity),
        className
      )}
    >
      <span>{getIcon(severity)}</span>
      {severity}
    </span>
  )
}

export default SeverityBadge
