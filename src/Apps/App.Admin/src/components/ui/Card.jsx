import React from "react";
import useSkin from "@/hooks/useSkin";

const Card = ({
  children,
  title,
  subtitle,
  headerSlot,
  className = " ",
  bodyClass = "p-6",
  noBorder,
  titleClass = "text-slate-900 dark:text-white",
  ...props
}) => {
  const [skin] = useSkin();

  return (
    <div
      {...props}
      className={`
        card rounded-md bg-white dark:bg-slate-800 ${
          skin === "bordered"
            ? " border border-slate-200 dark:border-slate-700"
            : "shadow-base"
        } ${className}`}
    >
      {(title || subtitle) && (
        <header className={`card-header ${noBorder ? "no-border" : ""}`}>
          <div>
            {title && <div className={`card-title ${titleClass}`}>{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerSlot && <div className="card-header-slot">{headerSlot}</div>}
        </header>
      )}
      <main className={`card-body ${bodyClass}`}>{children}</main>
    </div>
  );
};

export default Card;
