"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/* ═════════════════════════════════════════════════
   Root
   ═════════════════════════════════════════════════ */
interface AccordionProps extends AccordionPrimitive.Root.Props {
  /** "single" allows only one open at a time; "multiple" allows several */
  type?: "single" | "multiple";
  /** When type="single", allow closing the open item */
  collapsible?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function Accordion({
  type: _type = "single",
  collapsible: _collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

/* ═════════════════════════════════════════════════
   Item
   ═════════════════════════════════════════════════ */
function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b border-border", className)}
      {...props}
    />
  );
}

/* ═════════════════════════════════════════════════
   Trigger
   ═════════════════════════════════════════════════ */
function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-4",
          "rounded-lg border border-transparent py-4 text-start",
          "text-[15px] font-semibold text-primary",
          "transition-colors outline-none",
          "hover:text-sage",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          "**:data-[slot=accordion-trigger-icon]:ml-auto",
          "**:data-[slot=accordion-trigger-icon]:size-4",
          "**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="
            pointer-events-none shrink-0
            transition-transform duration-300 ease-out
            group-aria-expanded/accordion-trigger:rotate-180
          "
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* ═════════════════════════════════════════════════
   Content
   ═════════════════════════════════════════════════ */
function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden",
        "data-open:animate-accordion-down",
        "data-closed:animate-accordion-up",
      )}
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-4",
          "data-ending-style:h-0 data-starting-style:h-0",
          "text-[14.5px] leading-relaxed text-muted-foreground",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };