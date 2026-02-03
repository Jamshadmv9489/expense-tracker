import { Loader2 } from "lucide-react";

export default function Loader({
  size = "md",          // sm | md | lg | xl
  color = "text-blue-600",
  center = true,
  fullScreen = false,
  label,
}) {

  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
    xl: "w-14 h-14",
  };

  const wrapperClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm"
    : center
    ? "flex items-center justify-center"
    : "";

  return (
    <div
      className={wrapperClasses}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-2">
        <Loader2
          className={`animate-spin ${sizes[size]} ${color}`}
        />

        {label && (
          <span className="text-sm text-gray-500">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
