import AvatarUpload from "@/components/atoms/Avataruploud/Avatarupload";
import CustomIcon from "@/components/atoms/CustomTitleIcon/CustomIcon";
import { CustomInput } from "@/components/molecules/CustomInput";
import { Lock, Settings } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

export default function CustomSettings() {
  const { control } = useForm()

  

  return (
    <div className="w-full max-w-[700px]  mx-auto ">
      <div className="mb-[30px]">
        <CustomIcon
          icon={Settings}
          title={"Account Setting"}
          titlesize={25}
          className={"font-bold "}
        />
      </div>
      <div className="w-auto p-4 text-center border border-1 m-5 rounded-xl">
        <h2 className="text-textColor mb-5">Profile Picture</h2>
        <div>
          <AvatarUpload />
        </div>
        <p className="text-textGrey mt-5 ">
          Click the camera icon to upload or capture a new profile photo
        </p>
      </div>
      <div className="w-auto  text-center border border-1 m-5 rounded-xl">
        <div className="mb-[20px]">
          <CustomIcon
            icon={Lock}
            title={"Update Password"}
            titlesize={17}
            iconsize={25}
            iconColor={"text-orange-500"}
            className={"font-bold border-none bg-transparent "}
          />  
        </div>
        <form className="w-full p-4">
          <div className="flex flex-wrap gap-6 mb-4 justify-center">
            <CustomInput
              name={"currentPassword"}
              control={control}
              label={"Current Password"}
              type={"password"}
              placeholder={"Enter current password"}
            />
            <CustomInput
              name={"newPassword"}
              control={control}
              label={"New Password"}
              type={"password"}
              placeholder={"Enter new password"}
            />

            <CustomInput
              name={"confirmPassword"}
              control={control}
              label={"Confirm Password"}
              type={"password"}
              placeholder={"Confirm new password"}
            />
          </div>

          <button
            type="button"
            className="w-full py-4 rounded-xl font-semibold text-white 
    bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 transition"
          >
            Update Password
          </button>
        </form>
        <div className="w-auto  text-center border border-1 m-5 rounded-xl">
          <div className="mb-[20px]">
            <CustomIcon
              icon={Lock}
              title={"Update Password"}
              titlesize={15}
              iconsize={20}
              iconColor={"text-orange-500"}
              className={"font-bold border-none  bg-orange-900 ml-2 "}
            />
          </div>
          <p className="text-textColor text-[10px] w-full max-w-[550px] mt-[-20px] text-start ml-auto">For security reasons, please use a strong password that includes uppercase and lowercase letters, numbers, and special characters. Make sure to keep your account information secure and avoid sharing your credentials with others.</p>
        </div>
      </div>
    </div>
  );
}
