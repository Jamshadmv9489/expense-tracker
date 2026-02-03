import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/50",
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500/50",
};

export default function AuthButton({
  children,
  loading = false,
  variant = "primary",
  type = "submit",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        mt-6 w-full flex items-center justify-center gap-2
        rounded-lg py-2.5 text-sm font-semibold text-white
        transition focus:outline-none focus:ring-2
        ${variants[variant]}
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {loading && <Loader2 className="animate-spin w-5 h-5" />}
      {children}
    </button>
  );
}
