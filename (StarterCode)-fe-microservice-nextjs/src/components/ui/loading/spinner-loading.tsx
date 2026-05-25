export interface ISpinnerLoadingProps {
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  color?: string;
  className?: string;
}

const sizeClasses: Record<NonNullable<ISpinnerLoadingProps["size"]>, string> = {
  xs: "w-4 h-4",
  s: "w-6 h-6",
  m: "w-8 h-8",
  l: "w-10 h-10",
  xl: "w-14 h-14",
  xxl: "w-20 h-20",
};

export default function SpinnerLoading({
  size = "l",
  className = "",
}: {
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center bg-white p-3 rounded ${className}`}
    >
      <svg className={`animate-spin ${sizeClasses[size]}`} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#e5e7eb"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#2563eb"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="80"
          strokeDashoffset="60"
          fill="none"
        />
      </svg>
    </div>
  );
}
