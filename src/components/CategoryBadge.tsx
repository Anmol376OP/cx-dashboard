import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: 'Network & Communication' | 'Billing & Recharge' | 'Plans & Services' | 'Profile & Security' | 'General Complaints';
  className?: string;
}

const CategoryBadge = ({ category, className }: CategoryBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-black border border-border",
        className
      )}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;