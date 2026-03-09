import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CustomSheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = "right",
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side={side}>
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-2">{children}</div>

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  );
}
