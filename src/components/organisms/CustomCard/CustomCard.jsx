import { Skeleton } from "@/components/ui/skeleton";
import { ThemaContext } from "@/context/ThemaContext";
import {
  Building,
  ChevronRight,
  Clock,
  GraduationCap,
  Users,
  X,
} from "lucide-react";
import React, { useContext } from "react";

function CustomAvatar({ src, fallback = "US" }) {
  return (
    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center font-bold text-sm text-white tracking-wide shrink-0 shadow-lg shadow-violet-900/40">
      {src ? (
        <img
          src={src}
          alt="avatar"
          className="w-full h-full rounded-xl object-cover"
        />
      ) : (
        fallback
      )}
    </div>
  );
}

export default function CustomCard({
  src,
  isLoading,
  avatarFallback,
  BadgeVariants,
  Badgeboolean = false,
  deta,
  title,
  established,
  students,
  classes,
  teachers,
  admins,
  showArrow = true,
  abents,
  late,
  mkClass,
  height,
  grade,
}) {
  const isActive = BadgeVariants === "ACTIVE";
  const { thema } = useContext(ThemaContext);
  const isDark = thema === "dark";

  if (isLoading) {
    return (
      <div
        className={`w-full max-w-[450px] rounded-2xl p-5 border shadow-xl
        ${isDark
            ? "bg-[#16181f] border-white/[0.06]"
            : "bg-white border-gray-200/80 shadow-gray-200/60"
          }`}
        style={{ height: height || "200px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="w-11 h-11 rounded-xl" />
          <Skeleton className="w-16 h-5 rounded-md" />
        </div>
        <Skeleton className="w-[65%] h-5 mb-2" />
        <Skeleton className="w-[40%] h-4 mb-5" />
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="w-28 h-3.5" />
            <Skeleton className="w-24 h-3.5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-24 h-3.5" />
            <Skeleton className="w-20 h-3.5" />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-[450px] rounded-2xl p-5 border cursor-pointer
        transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl
        ${isDark
          ? "bg-gradient-to-br from-[#1a1d27] to-[#16181f] border-white/[0.07] hover:border-white/[0.13] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white border-gray-200 hover:border-violet-200 shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-violet-100/60"
        }`}
      style={{ height: height || "auto", minHeight: "180px" }}
    >
      <div className="flex justify-between items-start mb-3">
        <CustomAvatar src={src} fallback={avatarFallback} />

        {Badgeboolean ? (
          <span
            className={`text-white font-semibold text-xs tracking-widest px-3 py-1 rounded-full uppercase
              ${isActive ? "bg-emerald-500/90" : "bg-red-500/90"}`}
          >
            {isActive ? "ACTIVE" : "BLOCKED"}
          </span>
        ) : deta ? (
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{deta}</p>
        ) : null}
      </div>

      {title && (
        <h2 className={`font-bold text-base mb-0.5 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>
      )}

      {(grade || established) && (
        <p className={`text-sm mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {grade || `Est. ${established}`}
        </p>
      )}

      {(teachers || admins || classes || mkClass || students) && (
        <div className="flex justify-between items-center mt-2 mb-3">
          <div>
            {mkClass && (
              <div className={`flex items-center gap-1.5 mb-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <Building size={15} className="text-amber-500" />
                <span>Class: {mkClass}</span>
              </div>
            )}
            {classes && (
              <div className={`flex items-center gap-1.5 mb-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <Building size={15} className="text-amber-500" />
                <span>Classes: {classes}</span>
              </div>
            )}
            {students !== undefined && students !== null && (
              <div className={`flex items-center gap-1.5 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <GraduationCap size={15} className="text-violet-400" />
                <span>Students: {students}</span>
              </div>
            )}
          </div>
          <div>
            {teachers && (
              <div className={`flex items-center gap-1.5 mb-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <Users size={15} className={isDark ? "text-gray-300" : "text-gray-600"} />
                <span>Teachers: {teachers}</span>
              </div>
            )}
            {admins && (
              <div className={`flex items-center gap-1.5 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <Users size={15} className="text-orange-400" />
                <span>Admins: {admins}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3">
        <div className="flex items-center gap-4">
          {abents !== undefined && abents !== null && (
            <div className="flex items-center gap-1.5">
              <X size={14} className="text-red-400 shrink-0" />
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {abents} absent
              </span>
            </div>
          )}
          {late !== undefined && late !== null && (
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-amber-400 shrink-0" />
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {late} late
              </span>
            </div>
          )}
        </div>

        {showArrow && (
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors
              ${isDark
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}