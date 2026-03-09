import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Building2,
} from "lucide-react";

export function CustomDialog({
  open,
  onClose,
  status,
  info,
  title,
  initials,
  address,
  established,
  Students,
  Teachers,
  Classes,
  Admins,
  dataes = [
    {
      name: "Emily Brown",
      role: "Principal",
      email: "emily.brown@westside.edu",
      status: "ACTIVE",
    },
    {
      name: "David Wilson",
      role: "Assistant Principal",
      email: "david.wilson@westside.edu",
      status: "ACTIVE",
    },
    {
      name: "David Wilson",
      role: "Assistant Principal",
      email: "david.wilson@westside.edu",
      status: "ACTIVE",
    },
    {
      name: "David Wilson",
      role: "Assistant Principal",
      email: "david.wilson@westside.edu",
      status: "block",
    },
  ],
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
     <DialogContent
  className="p-0 border-0 overflow-y-auto w-full max-w-[500px] max-h-[500px] rounded-md bg-bgColor [&>button]:text-textColor [&>button]:hover:text-textColor"
  style={{
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  }}
      >
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold text-textColor">
            <Building2 size={18} className="text-blue-400" />
            {title}
          </DialogTitle>
        </DialogHeader>

       
        <div className="px-4 pb-4">
          <div
            className="rounded-xl p-6 flex items-start gap-4"
            style={{ background: "var(--cardcolor)" }}
          >
            {initials && (
              <div
                className="flex items-center justify-center rounded-xl font-bold text-white text-sm flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                }}
              >
                {initials}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                {info && (
                  <span className="font-bold text-textColor text-base leading-tight">
                    {info}
                  </span>
                )}
                {status && (
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0"
                    style={{ background: "#16a34a", color: "#bbf7d0" }}
                  >
                    {status}
                  </span>
                )}
              </div>
              {address && (
                <div className="flex items-start gap-1.5 text-slate-400 text-xs mb-1">
                  <MapPin size={12} className="mt-0.5 flex-shrink-0 text-slate-500" />
                  <span>{address}</span>
                </div>
              )}
              {established && (
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Calendar size={12} className="flex-shrink-0 text-slate-500" />
                  <span>Established: {established}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {Students && (
              <div className="flex flex-col bg-bgColor items-center justify-center rounded-xl py-3 px-1">
                <GraduationCap size={20} className="mb-2 text-iconsColor" />
                <span className="text-textColor font-bold text-lg leading-none">
                  {Students}
                </span>
                <p className="text-[15px]">Students</p>
              </div>
            )}
            {Teachers && (
              <div className="flex flex-col bg-bgColor items-center justify-center rounded-xl py-3 px-1">
                <Users size={20} className="mb-2 text-green-400" />
                <span className="text-textColor font-bold text-lg leading-none">
                  {Teachers}
                </span>
                <p className="text-[15px]">Teachers</p>
              </div>
            )}
            {Classes && (
              <div className="flex flex-col bg-bgColor items-center justify-center rounded-xl py-3 px-1">
                <Building2 size={20} className="mb-2 text-green-400" />
                <span className="text-textColor font-bold text-lg leading-none">
                  {Classes}
                </span>
                <p className="text-[15px]">Classes</p>
              </div>
            )}
            {Admins && (
              <div className="flex flex-col bg-bgColor items-center justify-center rounded-xl py-3 px-1">
                <Users size={20} className="mb-2 text-[#f97316]" />
                <span className="text-textColor font-bold text-lg leading-none">
                  {Admins}
                </span>
                <p className="text-[15px]">Admins</p>
              </div>
            )}
          </div>

          {/* Admins List */}
          {dataes && (
            <div className="border border-[#272727FF] rounded-xl p-5 mt-3">
              <h3 className="text-textColor font-semibold pb-4">
                School Administrators
              </h3>
              <div className="flex flex-col gap-3">
                {dataes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-bgColor rounded-xl p-4 border border-[#272727FF]"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-textColor font-bold text-sm">
                        {item.name}
                      </span>
                      <span className="text-slate-400 text-xs">{item.role}</span>
                      <span className="text-slate-500 text-xs">{item.email}</span>
                    </div>

                    {item.status === "ACTIVE" ? (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0 text-white"
                        style={{ background: "#16a34a" }}
                      >
                        {item.status}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0 text-white bg-red-400">
                        {item.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}