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

## Example Button Component

```tsx
import { twMerge } from "tailwind-merge";

// Must to use toCss utility to boolean conditions for class names
import { toCss } from "../../utils/strings";

export interface ButtonProps {
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
  onClick?: () => void;
  disabled?: boolean;
  btnProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

// Must to allways declare component properties as props
export const Button = (props: ButtonProps) => {
  // const {} = props; If there is more than 3 properties, it's better to use props.x instead of destructuring

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
    <button
      className={btnStyles}
      disabled={props.loading}
      onClick={props.onClick}
      {...props.btnProps}
    >
      {props.loading && <span className="loading loading-spinner loading-xs" />}
      {props.label || props.children}
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
