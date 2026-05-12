---
description: "Use when creating or updating React components"
name: "React Component Patterns"
applyTo: "**/*.tsx, **/*.jsx"
---

# React Component Patterns

- Reusable Button component example with Tailwind CSS and DaisyUI.
- This component supports various styles and states, such as loading and disabled.
- The component uses a props interface to define its properties.
- Uses the `twMerge` utility to ensure correct class merging.
- Avoid commenting code that is necessary for the component's functionality.

```tsx
import { twMerge } from "tailwind-merge";

// (value: any, str: string, str2?: string) => (value ? str : str2 || '');
import { toCss } from "../../utils/strings";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "wide" | "block" | "square" | "circle";
  mode?: "ghost" | "outline" | "link";
  loading?: boolean;
}

// Must to allways declare component properties as props
export const Button = (props: ButtonProps) => {
  // Props related to component style do not need to be extracted.
  const { loading, label, children, ...btnProps } = props;
  const {} = props;

  // Must use array and twMerge to ensure correct order of classes for tailwind-merge
  const btnStyles = twMerge([
    "btn rounded-sm",
    toCss(props.mode === "ghost", "btn-ghost"),
    toCss(props.mode === "link", "btn-link"),
    toCss(props.mode === "outline", "btn-outline border-base-300 hover:bg-bg2"),
    toCss(props.disabled, "cursor-not-allowed opacity-50"),
    toCss(props.loading, "cursor-not-allowed"),
    toCss(props.variant, `btn-${props.variant}`),
    toCss(props.size, `btn-${props.size}`, "btn-md"),
    toCss(props.color, `btn-${props.color}`),
    props.className,
  ]);

  return (
    <button className={btnStyles} disabled={loading} {...btnProps}>
      {loading && <span className="loading loading-spinner loading-xs" />}
      {label || children}
    </button>
  );
};

// Must to include dynamic styles to generate them
/* tailwind include
    btn btn-primary btn-secondary btn-accent btn-neutral btn-info btn-success btn-warning btn-error 
    btn-ghost btn-link
    btn-xs btn-sm btn-md btn-lg
    btn-wide btn-block btn-square btn-circle
*/
```
