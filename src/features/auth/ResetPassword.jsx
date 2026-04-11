import { resetPassword } from '@/service/login';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import project__logo from "@/assets/img/project_logo.png";
import { CustomInput } from '@/components/molecules/CustomInput';
import { useForm } from 'react-hook-form';
import { Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadState } from '@/config/storej';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomIcon from '@/components/atoms/CustomTitleIcon/CustomIcon';


export default function ResetPassword({ userEmail }) {
    const nav = useNavigate()
    const { handleSubmit, reset, control } = useForm()
    const [searchParams] = useSearchParams();
    const { mutate, isPending } = useMutation({ mutationFn: (data) => resetPassword(data) })
    const token = searchParams.get("token");

    const Submit = (data) => {
        const Payload = {
            token: token,
            newPassword: data.newPassword,
            confirmPassword: data.Confirm,

        }
        console.log(Payload);

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1235] to-[#2a0845]">
            <div className="w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg mb-4">
                        <img src={project__logo} alt="project logo" />
                    </div>
                    <h1 className="text-white text-2xl font-semibold">Reset Password</h1>
                    <div>
                        <CustomIcon titleColor={"text-[#EBAB03FF]"} icon={Clock} className={"text-[#EBAB03FF] border-none bg-transparent"} iconColor={"text-[#EBAB03FF]"} titlesize={15} title='Your link will expire in 30 minutes.' />
                    </div>
                </div>
                <form onSubmit={handleSubmit(Submit)}>
                    <div className=" my-5">
                        <CustomInput
                            name="newPassword"
                            control={control}
                            type="password"
                            placeholder="New Password"
                            containerClassName={"text-start"}
                            loading={isPending}
                            leftElement={
                                <Lock className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            }
                        />
                        <CustomInput
                            name="Confirm"
                            control={control}
                            containerClassName={"text-start"}
                            type="password"
                            placeholder="Confirm Password"
                            className={"mt-5"}
                            loading={isPending}
                            leftElement={
                                <Lock className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            }
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
}
