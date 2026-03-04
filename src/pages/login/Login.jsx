import { Mail, Lock, Eye } from "lucide-react";
import project__logo from "../../assets/img/project_logo.png";

export default function Login() {
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

        <div className="relative mb-5">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="relative mb-3">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
        </div>

        <div className="text-right mb-6">
          <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition">
            Forgot Password?
          </span>
        </div>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold hover:opacity-90 transition">
          Sign In
        </button>
      </div>
    </div>
  );
}
