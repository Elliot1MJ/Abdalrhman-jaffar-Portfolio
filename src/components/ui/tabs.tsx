import { type ReactNode } from "react";
import { useI18n } from "../../i18n/useI18n";
import { cn } from "../../lib/utils";

interface TabOption<T extends string> {
    label: string;
    value: T;
}

interface TabsProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: TabOption<T>[];
    ariaLabel?: string;
    className?: string;
    fullWidth?: boolean;
    icon?: ReactNode;
}

export function Tabs<T extends string>({
    value,
    onChange,
    options,
    ariaLabel = "Tabs",
    className,
    fullWidth = false,
    icon,
}: TabsProps<T>) {
    const { isRtl } = useI18n();

    return (
        <div
            className={cn(
                "inline-flex gap-4 border-b border-foreground/15 pb-2",
                className
            )}
            role="tablist"
            aria-label={ariaLabel}
        >
            {options.map((option) => {
                const isActive = option.value === value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={cn(
                            "relative px-1 py-2 font-semibold-alt transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            isRtl
                                ? "text-sm"
                                : "text-xs uppercase tracking-[0.22em]",
                            fullWidth && "min-w-[8.75rem]",
                            isActive
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => onChange(option.value)}
                    >
                        <span className="inline-flex items-center gap-2">
                            {icon ? (
                                <span
                                    aria-hidden
                                    className={cn(
                                        "inline-flex overflow-hidden transition-all duration-300 ease-out",
                                        isActive
                                            ? "max-w-6 scale-100 opacity-100"
                                            : "max-w-0 scale-75 opacity-0"
                                    )}
                                >
                                    {icon}
                                </span>
                            ) : null}
                            {option.label}
                        </span>
                        <span
                            aria-hidden
                            className={cn(
                                "absolute left-0 top-full mt-1 h-[2px] w-full origin-center bg-primary transition-transform duration-300 ease-out",
                                isActive ? "scale-x-100" : "scale-x-0"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}
