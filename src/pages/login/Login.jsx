import { Mail, Lock, Eye } from "lucide-react";
import project__logo from "../../assets/img/project_logo.png";
import { CustomInput } from "@/components/molecules/CustomInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function Login() {
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1235] to-[#2a0845]">
            <div className="w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <img src={project__logo} alt="project logo" />
                    </div>
                    <h1 className="text-white text-2xl font-semibold mt-4">
                        Welcome Back
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative mb-5"
                >
                    <CustomInput
                        name="email"
                        control={control}
                        label="Email"
                        placeholder="email"
                        loading={isSubmitting}
                        containerClassName={"mb-4"}
                        leftElement={
                            <Mail className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        }
                    />
                    <CustomInput
                        name="password"
                        control={control}
                        label="Password"
                        type="password"
                        placeholder="password"
                        loading={isSubmitting}
                        leftElement={
                            <Lock className="absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        }
                    />
                    <div className="text-right mb-6">
                        <span className="text-sm text-blue-600 hover:underline cursor-pointer transition">
                            Forgot Password?
                        </span>
                    </div>

                    <Button className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold hover:opacity-90 transition">
                        Sign In
                    </Button>
                </form>

            </div>
        </div>
    );
}
