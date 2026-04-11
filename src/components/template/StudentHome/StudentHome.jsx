import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import StudanceReportStatus from "@/components/organisms/StudanceReportStatus/StudanceReportStatus";
import { ThemaContext } from "@/context/ThemaContext";
import { userMeQuery } from "@/query";
import { attendeseDeleteMutation, attendeseEditeMutation } from "@/service/lesson";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, BookOpenCheck, Calendar, Clock, Pencil, Trash2, User } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "react-toastify";

export default function StudentHome() {
  const { thema } = useContext(ThemaContext);

  const queriyclient = useQueryClient()

  const [deletingId, setDeletingId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);

  const { mutate } = useMutation({
    mutationFn: attendeseDeleteMutation,
    onSuccess: (_, id) => {
      setDeletingId(null);
      toast.success("success delete");
      queriyclient.setQueryData(userMeQuery().queryKey, (old) => ({
        ...old,
        data: {
          ...old.data,
          scheduledReports: old.data.scheduledReports.filter(
            (el) => el.scheduledAttendaceId !== id
          )
        }
      }))
    }
  })

  const { data } = useQuery({ ...userMeQuery() });
  const studentInfo = data?.data?.studentInfo;
  const todaySubjects = data?.data?.todaySubjects;
  const scheduledReports = data?.data?.scheduledReports;
  const schoolReasons = data?.data?.schoolReasons;


  const cardClass = `p-4 rounded-xl ${thema === "dark"
    ? "border border-[#29343FFF] bg-[#0C1626FF]"
    : "bg-[#F6F5F9FF] shadow-[0_10px_30px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.05)]"
    }`;

  return (
    <div className="mb-[100px]">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col gap-8">

          <div className={cardClass}>
            <CustomIcon
              title="Today's Subjects"
              className="border-none bg-[#07331F] rounded-full p-2"
              icon={BookOpen}
              titlesize={17}
              iconsize={20}
              iconColor="text-green-500"
            />
            <p className="text-textColor mt-2">You have the following subjects today:</p>
            {todaySubjects?.map((el, index) => (
              <div className="flex gap-2" key={index + 1}>
                <Clock />
                <div>
                  <h4 className="text-textColor">{index + 1}. {el?.subjectName}</h4>
                  <p className="text-textGray">From {el?.startTime} to {el?.endTime}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`${cardClass}max-h-[300px] `}>
            <CustomIcon
              title="Scheduled Reports"
              className="border-none bg-[#3B1F0F] rounded-full p-2 "
              icon={Calendar}
              titlesize={17}
              iconsize={20}
              iconColor="text-[#FF8904]"
            />
            <div className="mt-3 flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-2 custom-scroll">
              {scheduledReports?.map((res, index) => {
                const isLate = res?.type === "LATE";
                const isDark = thema === "dark";

                const cardStyle = isLate
                  ? isDark
                    ? "bg-[#2A1F0AFF] border border-[#E8A838FF]"
                    : "bg-[#FFF8ECFF] border border-[#E8A838FF]"
                  : isDark
                    ? "bg-[#2E1528FF] border border-[red]"
                    : "bg-[#FFE8E8FF] border border-[#E53935FF]";

                const titleColor = isLate
                  ? "text-[red]"
                  : isDark
                    ? "text-[red]"
                    : "text-[#E53935FF]";

                const badgeStyle = isLate
                  ? isDark
                    ? "bg-[#2A1F0AFF] text-[#E8A838FF] border border-[#E8A838FF]"
                    : "bg-[#FFF8ECFF] text-[#E8A838FF] border border-[#E8A838FF]"
                  : isDark
                    ? "bg-[#3D0F2AFF] text-[red]"
                    : "bg-[#FFE8E8FF] text-[#E53935FF] border border-[#E53935FF]";

                return (
                  <div key={index} className={`w-full rounded-xl p-4 ${cardStyle}`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-[15px] ${titleColor}`}>
                        {res?.reason}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle}`}>
                          {isLate ? "Late" : "Absence"}
                        </span>
                        <button onClick={() => setEditId(res)} className="text-gray-400 hover:text-gray-200 transition">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => {
                          setDeletingId(res.scheduledAttendaceId)
                          mutate(res.scheduledAttendaceId)
                        }} className="text-red-500 hover:text-red-400 transition">

                          {deletingId == res.scheduledAttendaceId ? "loading..." : <Trash2 size={15} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-gray-400 text-[13px]">
                      <Calendar size={13} />
                      <span>{res?.date}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-gray-400 text-[13px]">
                      <BookOpenCheck size={13} />
                      <span>
                        Affects:{" "}
                        <span className="text-[#6BBFFFFF]">
                          {res?.affectedLessons?.join(", ")}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {editId && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className={`w-full max-w-md rounded-2xl p-4 ${cardClass}`}>
                  <button onClick={() => setEditId(null)} className="text-gray-400 float-right">✕</button>
                  <StudanceReportStatus
                    schoolReasons={schoolReasons}
                    editData={editId}
                    onClose={() => setEditId(null)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={`text-textColor ${cardClass}`}>
            <CustomIcon
              title="Student Information"
              icon={User}
              iconsize={20}
              titlesize={20}
              className="rounded-[50px] border-none bg-[#14294D]"
            />
            <div className="mt-3 flex flex-col gap-2">
              {[
                { label: "Name", value: studentInfo?.fullName },
                { label: "Phone", value: studentInfo?.phone },
                { label: "Class", value: studentInfo?.className },
                { label: "School", value: studentInfo?.schoolName },
                { label: "Teacher", value: studentInfo?.teacherName },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-textGrey">{label}:</span>
                  <span>{value ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className={`h-fit ${cardClass}`}>
          <StudanceReportStatus schoolReasons={schoolReasons} />
        </div>
      </div>
    </div>
  );
}