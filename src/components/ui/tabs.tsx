import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

interface TabOption<T extends string> {
    label: string;
    value: T;
}

interface TabsProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: TabOption<T>[];
    className?: string;
    fullWidth?: boolean;
    icon?: ReactNode;
}

export function Tabs<T extends string>({
    value,
    onChange,
    options,
    className,
    fullWidth = false,
    icon,
}: TabsProps<T>) {
    return (
        <div
            className={cn(
                "inline-flex rounded-full border border-border/90 bg-secondary/70 p-1",
                className
            )}
            role="tablist"
            aria-label="Project filter tabs"
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
                            "rounded-full px-4 py-1.5 text-sm font-semibold-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            fullWidth && "min-w-[8.75rem]",
                            isActive
                                ? "bg-primary text-primary-foreground shadow"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={() => onChange(option.value)}
                    >
                        <span className="inline-flex items-center gap-2">
                            {isActive && icon}
                            {option.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
