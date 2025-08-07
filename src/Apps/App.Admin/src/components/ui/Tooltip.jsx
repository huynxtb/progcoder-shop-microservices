import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = ({
  title,
  children,
  className = "btn btn-dark",
  content = "Tooltip",
  theme,
  arrow,
  open,
  side,
  placement = "top",
  defaultOpen,
  onOpenChange,
  ...props
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        className={className}
      >
        <TooltipPrimitive.Trigger asChild>
          {children || <button className={className}>{title}</button>}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          {theme ? (
            <TooltipPrimitive.Content
              side={placement}
              sideOffset={5}
              align="center"
              className={`text-slate-50 dark:text-slate-200 rounded-md px-2 py-1.5 text-sm font-medium shadow-md bg-${theme}-500`}
              {...props}
            >
              {content}
              {arrow ? (
                <></>
              ) : (
                <TooltipPrimitive.Arrow
                  className={`fill-current text-${theme}-500`}
                  width={11}
                  height={5}
                />
              )}
            </TooltipPrimitive.Content>
          ) : (
            <TooltipPrimitive.Content
              side={side}
              align="center"
              className="text-slate-50 dark:text-slate-200 rounded-md px-2 py-1.5 text-sm font-medium shadow-md bg-slate-900 dark:bg-slate-700"
              {...props}
            >
              {content}

              {arrow ? (
                <></>
              ) : (
                <TooltipPrimitive.Arrow
                  className="fill-slate-900 dark:fill-slate-700"
                  width={11}
                  height={5}
                />
              )}
            </TooltipPrimitive.Content>
          )}
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
