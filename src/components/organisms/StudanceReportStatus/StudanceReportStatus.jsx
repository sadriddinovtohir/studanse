import { CustomInput } from "@/components/molecules/CustomInput";
import { CustomSelect } from "@/components/molecules/CustomSelect";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { CustomTextarea } from "../CustomTextarea";

export default function StudanceReportStatus() {
  const { control } = useForm();
  const [state, setstate] = React.useState(null);
  console.log(state);

  return (
    <div className="px-6">
      <div className="text-center">
        <h2 className="text-textColor">Report Your Status</h2>
        <p className="text-textGrey ">
          Choose the type of report you'd like to submit
        </p>
      </div>
      <div className="py-4 flex justify-between items-center">
        <Button
          onClick={() => setstate(true)}
          variant={"outline"}
          className={`text-textColor bg-btnblue border-2 border-iconsColor rounded-xl flex flex-col w-full max-w-[220px] h-[80px] hover-scale hover:bg-btnBgHoverPrimary  ${state == true ? "shadow-[0_0_15px_#8CD7FAFF] bg-btnBgHoverPrimary" : null} `}
        >
          <span
            className={`text-white bg-[#2B7FFFFF] w-6 h-6  rounded-[100%] ${state == true ? "bg-[#2266CCFF]" : "bg-[#17294DFF] "} `}
          >
            A
          </span>
          Absence
        </Button>
        <Button
          onClick={() => setstate(false)}
          variant={"outline"}
          className={`text-textColor bg-[#1A1A2EFF ] border-2 border-[#AD46FFFF] rounded-xl flex flex-col w-full max-w-[220px] h-[80px] hover-scale hover:bg-btnBgHoverSecondry hover:text-white ${state == false ? "shadow-[0_0_15px_#5D2D92FF] bg-btnBgHoverSecondry text-white" : null} `}
        >
          <span
            className={`text-white bg-[#AD46FFFF] w-6 h-6 flex justify-center items-center  rounded-[50%] ${state == false ? "bg-[#AD46FFFF]" : "bg-[#3B235BFF] "} `}
          >
            <Clock />
          </span>
          Late
        </Button>
      </div>
      {state == true || state == false ? (
        <form>
          <CustomInput
            className="text-block bg-gray-200 rounded-xl"
            name="birthDate"
            control={control}
            label="Select Date"
            type="date"
          />
          <p className=" p-2 text-[13px] text-gray-400">
            Note: Cannot select past dates or Sundays (school closed)
          </p>
          <CustomSelect
            name="status" // formdagi key
            control={control} // react-hook-form control
            label="Report Status" // label
            placeholder="Choose a reason..."
            className={"rounded-xl bg-gray-200 "}
            options={[{ value: "fam", label: "Absence" }]}
          />
          <CustomTextarea
            name="message"
            className={"text-textColor"}
            control={control}
            label="Xabar matni"
            placeholder="Bu yerga matn yozing..."
            rows={6}
          />
          <Button
            // type="submit"
            type="button"
            className=" my-4 py-8 w-[100%] bg-[green] text-white  rounded-xl text-[20px] hover:bg-green-800 "
          >
            <Send className="mt-1" /> Send
          </Button>
        </form>
      ) : null}
    </div>
  );
}
