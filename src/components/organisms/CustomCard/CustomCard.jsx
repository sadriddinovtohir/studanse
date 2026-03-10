import { Skeleton } from "@/components/ui/skeleton";
import {
  Building,
  ChevronRight,
  Clock,
  GraduationCap,
  Users,
  X,
} from "lucide-react";
import React from "react";

function CustomAvatar({ src, fallback = "US" }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center font-bold text-base text-white tracking-wide shrink-0">
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
}) {
  const isActive = BadgeVariants === "ACTIVE";
  
  if (isLoading) {
  return (
    <div className="w-full max-w-[450px]  rounded-2xl p-5 border border-white/[0.07] shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>

      <Skeleton className="w-[70%] h-6 mb-2" />
      <Skeleton className="w-[50%] h-4 mb-4" />

      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-28 h-4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
    </div>
  );
}

  return (
    <div className="w-full max-w-[450px] h-[280px] rounded-2xl p-5 border border-white/[0.07] shadow-2xl bg-transpatent hover-scale">
      {/* Top row */}
      <div className="flex justify-between items-center mb-3.5">
        <CustomAvatar src={src} fallback={avatarFallback} />

        {Badgeboolean ? (
          <span
            className={`${
              isActive ? "bg-green-500" : "bg-red-500"
            } text-white font-bold text-xs tracking-widest px-3.5 py-1 rounded-full uppercase`}
          >
            {isActive ? "ACTIVE" : "BLOCKED"}
          </span>
        ) : (
          <p className="text-textColor text-sm ">{deta}</p>
        )}
      </div>

      {/* Title */}
      {title && (
        <h2 className="text-textColor font-bold text-lg mb-1">{title}</h2>
      )}

      {/* Established */}
      {established && (
        <p className="text-textColor text-sm mb-3.5">
          Established: {established}
        </p>
      )}

      {/* Stats grid */}
      <div className="flex justify-between items-center mt-1.5">
        {/* Left column */}
        <div>
          {students ? (
            <div className="flex items-center gap-2 mb-2.5 text-gray-400 text-sm">
              <GraduationCap size={18} className="text-blue-400" />
              <span>Students: {students}</span>
            </div>
          ) : null}
          {mkClass ? (
            <div className="flex items-center gap-2 mb-2.5 text-gray-400 text-sm">
              <span>Class: {mkClass} </span>
            </div>
          ) : null}
         {classes ?  <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Building size={18} className="text-yellow-800" />
            <span>Classes: {classes}</span>
          </div> : null}
        </div>

        {/* Right column */}
        <div>
          {teachers ? (
            <div className="flex items-center gap-2 mb-2.5 text-gray-400 text-sm">
              <Users size={18} className="text-textColor" />
              <span>Teachers: {teachers}</span>
            </div>
          ) : null}
          {admins ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Users size={18} className="text-orange-500" />
              <span>Admins: {admins}</span>
            </div>
          ) : null}
        </div>

        {/* Arrow button */}
      </div>
      <div  className="mt-5 flex items-end ">
        <div className="flex items-center gap-4">
          {abents ? (
            <div className="flex items-center gap-2 text-textColor">
              {" "}
              <span>
                {" "}
                <X size={20} color="red" className="mt-1" />
              </span>
              <p>abents : {abents}</p>
            </div>
          ) : null}
          {late ? (
            <div className="flex items-center gap-2 text-textColor">
              {" "}
              <span>
                {" "}
                <Clock size={15} className="mt-1" />
              </span>
              <p>{late} : late</p>
            </div>
          ) : null}
        </div>
        {showArrow ? (
          <button className="w-9 h-9  ml-auto rounded-full bg-gray-500 border-none cursor-pointer flex items-center justify-center text-white">
            <ChevronRight size={18} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
    {/*
      import { Skeleton } from "@/components/ui/skeleton";
import {
  Building,
  ChevronRight,
  Clock,
  GraduationCap,
  Users,
  X,
} from "lucide-react";
import React from "react";

function CustomAvatar({ src, fallback = "US" }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center font-bold text-base text-white tracking-wide shrink-0">
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
}) {
  const isActive = BadgeVariants === "ACTIVE";
  
  if (isLoading) {
  return (
    <div className="w-full max-w-[450px] rounded-2xl p-5 border border-white/[0.07] shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>

      <Skeleton className="w-[70%] h-6 mb-2" />
      <Skeleton className="w-[50%] h-4 mb-4" />

      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-28 h-4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Skeleton className="w-9 h-9 rounded-full" />
      </div>
    </div>
  );
}

  return (
    <div className="w-full max-w-[450px] rounded-2xl p-5 border border-white/[0.07] shadow-2xl bg-transpatent hover-scale">
      <div className="flex justify-between items-center mb-3.5">
        <CustomAvatar src={src} fallback={avatarFallback} />

        {Badgeboolean ? (
          <span
            className={`${
              isActive ? "bg-green-500" : "bg-red-500"
            } text-white font-bold text-xs tracking-widest px-3.5 py-1 rounded-full uppercase`}
          >
            {isActive ? "ACTIVE" : "BLOCKED"}
          </span>
        ) : (
          <p className="text-textColor text-sm ">{deta}</p>
        )}
      </div>

      {title && (
        <h2 className="text-textColor font-bold text-lg mb-1">{title}</h2>
      )}

      {established && (
        <p className="text-textColor text-sm mb-3.5">
          Established: {established}
        </p>
      )}

      <div className="flex justify-between items-center mt-1.5">
        <div>
          {students && (
            <div className="flex items-center gap-2 mb-2.5 text-gray-400 text-sm">
              <GraduationCap size={18} className="text-blue-400" />
              <span>Students: {students}</span>
            </div>
          )}
          {mkClass && (
            <div className="flex items-center gap-2 mb-2.5 text-gray-400 text-sm">
              <span>Class: {mkClass} </span>
            </div>
          )}
         {classes &&  <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Building size={18} className="text-yellow-800" />
            <span>Classes: {classes}</span>
          </div>}
        </div>

        <div>
          {teachers ? (
            <div className="flex items-center gap-2 mb-2.5 text-gray-400 text-sm">
              <Users size={18} className="text-textColor" />
              <span>Teachers: {teachers}</span>
            </div>
          ) : null}
          {admins ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Users size={18} className="text-orange-500" />
              <span>Admins: {admins}</span>
            </div>
          ) : null}
        </div>

      </div>
      <div className="mt-5 flex items-center ">
        <div className="flex items-center gap-4">
          {abents ? (
            <div className="flex items-center gap-2 text-textColor">
              {" "}
              <span>
                {" "}
                <X size={20} color="red" className="mt-1" />
              </span>
              <p>abents : {abents}</p>
            </div>
          ) : null}
          {late ? (
            <div className="flex items-center gap-2 text-textColor">
              {" "}
              <span>
                {" "}
                <Clock size={15} className="mt-1" />
              </span>
              <p>{late} : late</p>
            </div>
          ) : null}
        </div>
        {showArrow ? (
          <button className="w-9 h-9 ml-auto rounded-full bg-gray-500 border-none cursor-pointer flex items-center justify-center text-white">
            <ChevronRight size={18} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

      */}

