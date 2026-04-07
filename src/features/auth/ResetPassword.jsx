// import React from "react";
// import { useForm } from "react-hook-form";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { Lock } from "lucide-react";
// import { toast } from "react-toastify";

// import project__logo from "@/assets/img/project_logo.png";
// import { CustomInput } from "@/components/molecules/CustomInput";
// import { Button } from "@/components/ui/button";
// import { userPostResetPasswordMutation } from "@/service/user";

// export default function ResetPassword() {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     // URL dan token olish: /reset-password?token=abc123
//     const token = searchParams.get("token");

//     const {
//         control,
//         handleSubmit,
//         watch,
//         reset,
//     } = useForm();

//     const newPassword = watch("newPassword");

//     const { mutate, isPending } = useMutation({
//         mutationFn: (data) => userPostResetPasswordMutation(data),
//     });

//     const onSubmit = (data) => {
//         if (!token) {
//             toast.error("Token topilmadi. Iltimos emaildagi linkni qayta bosing.");
//             return;
//         }

//         mutate(
//             {
//                 token,
//                 newPassword: data.newPassword,
//                 confirmPassword: data.confirmPassword,
//             },
//             {
//                 onSuccess: (res) => {
//                     toast.success(res?.data?.message || "Parol muvaffaqiyatli o'zgartirildi!");
//                     reset();
//                     // Login sahifasiga qaytarish
//                     setTimeout(() => navigate("/login"), 1500);
//                 },
//                 onError: (error) => {
//                     toast.error(
//                         error?.response?.data?.message || error.message || "Xatolik yuz berdi"
//                     );
//                 },
//             }
//         );
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1235] to-[#2a0845]">
//             <div className="w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

//                 {/* Logo + Title */}
//                 <div className="flex flex-col items-center mb-8">
//                     <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
//                         <img src={project__logo} alt="project logo" />
//                     </div>
//                     <h1 className="text-white text-2xl font-semibold mt-4">
//                         Reset Password
//                     </h1>
//                     <p className="text-yellow-400 text-sm mt-2 flex items-center gap-1">
//                         ⏰ Your link will expire in 30 minutes.
//                     </p>
//                 </div>

//                 {/* Token yo'q bo'lsa xabar */}
//                 {!token && (
//                     <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
//                         ⚠️ Yaroqsiz yoki eskirgan link. Iltimos qaytadan forgot password qiling.
//                     </div>
//                 )}

//                 {/* Form */}
//                 <form onSubmit={handleSubmit(onSubmit)} className="relative mb-5">
//                     {/* New Password */}
//                     <CustomInput
//                         name="newPassword"
//                         control={control}
//                         label="New Password"
//                         type="password"
//                         placeholder="New password"
//                         containerClassName="mb-4"
//                         leftElement={
//                             <Lock className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         }
//                         rules={{
//                             required: "Yangi parol majburiy",
//                             minLength: {
//                                 value: 8,
//                                 message: "Parol kamida 8 ta belgi bo'lishi kerak",
//                             },
//                         }}
//                     />

//                     {/* Confirm Password */}
//                     <CustomInput
//                         name="confirmPassword"
//                         control={control}
//                         label="Confirm Password"
//                         type="password"
//                         placeholder="Confirm password"
//                         containerClassName="mb-6"
//                         leftElement={
//                             <Lock className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                         }
//                         rules={{
//                             required: "Parolni tasdiqlang",
//                             validate: (value) =>
//                                 value === newPassword || "Parollar mos kelmadi",
//                         }}
//                     />

//                     {/* Submit */}
//                     <Button
//                         type="submit"
//                         disabled={isPending || !token}
//                         className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold hover:opacity-90 transition"
//                     >
//                         {isPending ? "Saqlanmoqda..." : "Reset Password"}
//                     </Button>
//                 </form>

//                 {/* Back to login */}
//                 <div className="text-center">
//                     <Button
//                         type="button"
//                         variant="link"
//                         onClick={() => navigate("/login")}
//                         className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
//                     >
//                         ← Back to Login
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }