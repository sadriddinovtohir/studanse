import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function CustomAvatar({
  src,
  alt = "Avatar",
  fallback = "?",
  isOnline = false,
  className,
  secondclassName,
}) {
  return (
    <div className={cn("relative inline-flex", secondclassName)}>
      {/* Gradient container */}
      <div
        className={cn(
          "w-[50px] h-10 flex items-center justify-center rounded-[20%] overflow-hidden",
          "bg-gradient-to-br from-[#7B6EF6] via-[#6B5FE8] to-[#4B3FD8]",
          className,
        )}
        style={{
          boxShadow: "0 4px 14px rgba(107, 95, 232, 0.4)",
        }}
      >
        <Avatar className="rounded-none w-6 h-6">
          <AvatarImage
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
          />
          <AvatarFallback className="bg-transparent text-white font-bold select-none tracking-wide text-xs">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Online dot */}
      {isOnline && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4cd964] border-2 border-white",
          )}
          aria-label="Online"
        />
      )}
    </div>
  );
}
