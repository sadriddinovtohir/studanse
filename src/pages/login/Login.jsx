import { Mail, Lock } from "lucide-react";
import project__logo from "../../assets/img/project_logo.png";
import { CustomInput } from "@/components/molecules/CustomInput";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { authLogin } from "@/service/login";
import { getRoleFromToken } from "@/config/getRoleFromToken";
import { saveState } from "@/config/storej";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function Login() {
    const { _, setRoles } = useContext(UserContext);

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
        try {
            const res = await authLogin(data);
            saveState("token", res?.data?.data?.token);
            setRoles(res?.data?.data?.token);
            saveState("role", getRoleFromToken(res?.data?.data?.token));
            if (res?.data?.data?.token) {
                window.location.pathname = "/";
            }
        } catch (error) {
            console.log(error);
        }
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
