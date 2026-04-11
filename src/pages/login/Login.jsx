import LoginSistem from "@/features/auth/LoginSistem";
import React from "react";
import project__logo from "@/assets/img/project_logo.png";
import { CustomInput } from "@/components/molecules/CustomInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { userPostForgotPasswordMutation } from "@/service/user";
import { toast } from "react-toastify";
import ResetPassword from "@/features/auth/ResetPassword";

export default function Login() {
    const [state, setState] = React.useState(null);
    const [emailSent, setEmailSent] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState(null);
    const { control, handleSubmit, reset } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => userPostForgotPasswordMutation(data),
    });

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: (res) => {
                const email = res?.data?.data?.email;
                toast.success(res?.data?.message || "Reset link emailga yuborildi!");
                reset();
                setEmailSent(true);
                setUserEmail(email);
            },
            onError: (error) => {
                toast.error(
                    error?.response?.data?.message || error.message || "Xatolik yuz berdi"
                );
            },
        });
    };

    if (userEmail) {
        toast.success(<h1>Check your email {userEmail}</h1>)
    }


    if (state !== true) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1235] to-[#2a0845]">
                <LoginSistem setState={setState} state={state} />
            </div>
        );
    }

    if (emailSent) {
        return <ResetPassword userEmail={userEmail} />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1235] to-[#2a0845]">
            <div className="w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <img src={project__logo} alt="project logo" />
                    </div>
                    <h1 className="text-white text-2xl font-semibold mt-4">
                        Forgot your password?
                    </h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="relative mb-5">
                    <CustomInput
                        name="email"
                        control={control}
                        label="Email"
                        placeholder="Enter your email address"
                        containerClassName="mb-4"
                        leftElement={
                            <Mail className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        }
                        rules={{
                            required: "Email majburiy",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email formati noto'g'ri",
                            },
                        }}
                    />

                    <div className="text-right mb-6">
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => setState(null)}
                            className="text-sm text-blue-400 hover:text-blue-300 hover:underline cursor-pointer transition"
                        >
                            ← Back to Login
                        </Button>
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold hover:opacity-90 transition"
                    >
                        {isPending ? "Loading..." : "Send Reset Link"}
                    </Button>
                </form>

                {/* <p className="text-center text-textGrey text-sm">
                    We'll send you a link to reset your password if the account exists.
                </p> */}


            </div>
        </div>
    );
}
