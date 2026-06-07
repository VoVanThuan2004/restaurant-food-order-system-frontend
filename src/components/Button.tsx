// ============ TYPE DEFINITIONS ============
type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "outline";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonConfig = {
  bg: string;
  hover: string;
  text: string;
  border?: string;
};

type ButtonProps = {
  // Nội dung
  children: React.ReactNode;

  // Variant có sẵn (dùng khi không có custom)
  variant?: ButtonVariant;

  // Kích thước
  size?: ButtonSize;

  // CUSTOM MÀU - Dev tự do truyền vào
  customBg?: string; // Ví dụ: 'bg-purple-600' hoặc '#ff5733'
  customHover?: string; // Ví dụ: 'hover:bg-purple-700'
  customText?: string; // Ví dụ: 'text-white' hoặc '#ffffff'
  customBorder?: string; // Ví dụ: 'border border-purple-600'

  // Layout
  fullWidth?: boolean;

  // Trạng thái
  disabled?: boolean;
  loading?: boolean;

  // Sự kiện
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";

  // Icon
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  // CSS bổ sung
  className?: string;

  // Các props khác của button HTML
  "aria-label"?: string;
};

// ============ CONFIG MẶC ĐỊNH ============
const buttonConfig: Record<ButtonVariant, ButtonConfig> = {
  primary: {
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
    text: "text-white",
  },
  secondary: {
    bg: "bg-gray-200",
    hover: "hover:bg-gray-300",
    text: "text-gray-800",
  },
  danger: {
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
    text: "text-white",
  },
  success: {
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
    text: "text-white",
  },
  outline: {
    bg: "bg-transparent",
    hover: "hover:bg-gray-100",
    text: "text-blue-600",
    border: "border border-blue-600",
  },
};

const sizeConfig: Record<ButtonSize, string> = {
  xs: "px-2 py-1 text-xs rounded-md",
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-5 py-2.5 text-lg rounded-lg",
  xl: "px-6 py-3 text-xl rounded-xl",
};

// ============ HELPER: Merge class names ============
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  // Custom colors - ưu tiên hơn variant
  customBg,
  customHover,
  customText,
  customBorder,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  leftIcon,
  rightIcon,
  className = "",
  ...restProps
}) => {
  // Lấy style từ variant (nếu không có custom)
  const variantStyle = buttonConfig[variant];

  // QUY TẮC: Custom > Variant > Default
  const bgClass = customBg ?? variantStyle.bg;
  const hoverClass = customHover ?? variantStyle.hover;
  const textClass = customText ?? variantStyle.text;
  const borderClass = customBorder ?? variantStyle.border ?? "";

  const sizeClass = sizeConfig[size];

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        // Base styles
        "font-medium transition-all duration-200",
        "flex items-center justify-center gap-2",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "focus:ring-blue-500",
        // Dynamic styles
        bgClass,
        hoverClass,
        textClass,
        borderClass,
        sizeClass,
        // Layout
        fullWidth && "w-full",
        // States
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        loading && "cursor-wait",
        // Custom
        className,
      )}
      aria-disabled={isDisabled}
      aria-label={restProps["aria-label"]}
      {...restProps}
    >
      {/* Loading spinner */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
