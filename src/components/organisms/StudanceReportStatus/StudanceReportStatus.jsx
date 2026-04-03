import { CustomInput } from "@/components/molecules/CustomInput";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { CustomTextarea } from "../CustomTextarea";
import { Button } from "@/components/ui/button";
import { attendancePostMutation, userMeQuery } from "@/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Clock, Send } from "lucide-react";
import { useState, memo } from "react";
import { attendeseEditeMutation } from "@/service/lesson";

const ABSENT = "ABSENT";
const LATE = "LATE";

const StudanceReportStatus = memo(({ schoolReasons, editData, onClose }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      date: editData?.date ?? new Date().toISOString().split("T")[0],
      reasonId: editData?.reasonId ?? "",
      comment: editData?.comment ?? "",
    }
  });
  const [state, setState] = useState(editData?.type ?? null);
  const queryClient = useQueryClient();

  const reasonOptions = schoolReasons?.map(({ id, name }) => ({
    value: id,
    label: name,
  })) ?? [];


  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => {
      console.log("final payload:", payload);
      return editData
        ? attendeseEditeMutation(editData.scheduledAttendaceId, payload)
        : attendancePostMutation(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(userMeQuery().queryKey);
      reset();
      setState(null);
      onClose?.();
      toast.success(editData ? "Updated!" : "Created!");
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = ({ date, reasonId, comment }) => {
    if (editData) {
      mutate({ attendanceStatus: state, requestedDate: date, reasonId, comment });
    } else {
      mutate({ status: state, date, reasonId, comment });
    }
  };
  return (
    <section aria-label="Report Your Status" className="px-6">
      <header className="text-center">
        <h2 className="text-textColor">Report Your Status</h2>
        <p className="text-textGrey">Choose the type of report you'd like to submit</p>
      </header>

      <div className="py-4 flex justify-between items-center gap-4">
        <Button
          onClick={() => setState(ABSENT)}
          variant="outline"
          aria-pressed={state === ABSENT}
          className={`text-white bg-btnblue border-2 border-iconsColor rounded-xl flex flex-col w-full max-w-[50%] h-[80px] hover-scale hover:bg-btnBgHoverPrimary hover:text-white ${state === ABSENT ? "shadow-[0_0_15px_#8CD7FAFF] bg-btnBgHoverPrimary" : ""
            }`}
        >
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${state === ABSENT ? "bg-[#2266CCFF]" : "bg-[#17294DFF]"}`}>
            A
          </span>
          Absence
        </Button>

        <Button
          onClick={() => setState(LATE)}
          variant="outline"
          aria-pressed={state === LATE}
          className={`text-white border-2 border-[#AD46FFFF] rounded-xl flex flex-col w-full max-w-[50%] h-[80px] hover-scale hover:bg-btnBgHoverSecondry hover:text-white ${state === LATE ? "shadow-[0_0_15px_#5D2D92FF] bg-btnBgHoverSecondry" : "bg-btnBgHoverSecondry"
            }`}
        >
          <span className={`w-6 h-6 flex justify-center items-center rounded-full text-white ${state === LATE ? "bg-[#AD46FFFF]" : "bg-[#3B235BFF]"}`}>
            <Clock size={14} />
          </span>
          Late
        </Button>
      </div>

      {state && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput name="date" control={control} label="Select Date" type="date" className="text-block bg-gray-200 rounded-xl" />
          <p className="p-2 text-[13px] text-gray-400">Note: Cannot select past dates or Sundays (school closed)</p>
          <CustomSelect name="reasonId" control={control} label="Select Reason" placeholder="Choose a reason..." className="rounded-xl bg-gray-200 text-black" options={reasonOptions} />
          <CustomTextarea name="comment" control={control} label="Additional Details (Optional)" placeholder="Add any additional details here..." className="text-textColor" rows={6} />
          <Button type="submit" disabled={isPending} className="my-4 py-8 w-full bg-[green] text-white rounded-xl text-[20px] hover:bg-green-800">
            <Send className="mt-1 mr-2" />
            {isPending ? "Loading..." : "Send"}
          </Button>
        </form>
      )}
    </section>
  );
});

export default StudanceReportStatus;