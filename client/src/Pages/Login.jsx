import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { HeartPulseIcon, MailIcon, LockIcon, UserIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, LoaderIcon } from "lucide-react";

export default function Login() {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", { name, email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-md mb-3">
            <HeartPulseIcon className="size-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            Health<span className="text-indigo-600">Mate</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1">Your Smart Health Companion</p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {["Login", "Sign Up"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setState(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                state === tab ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">

          {/* Name — Sign Up Only */}
          {state === "Sign Up" && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" required
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
            <div className="relative">
              <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          {state === "Login" && (
            <div className="text-right -mt-1">
              <span className="text-xs text-indigo-600 hover:underline cursor-pointer">Forgot password?</span>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-200 disabled:opacity-60 active:scale-95">
            {loading ? (
              <><LoaderIcon className="size-4 animate-spin" />{state === "Sign Up" ? "Creating..." : "Logging in..."}</>
            ) : (
              <>{state === "Sign Up" ? "Create Account" : "Login"}<ArrowRightIcon className="size-4" /></>
            )}
          </button>
        </form>

        {/* Bottom Toggle */}
        <p className="text-center text-xs text-gray-500 mt-5">
          {state === "Sign Up" ? (
            <>Already have an account?{" "}
              <span onClick={() => setState("Login")} className="text-indigo-600 font-semibold cursor-pointer hover:underline">Login</span>
            </>
          ) : (
            <>Don't have an account?{" "}
              <span onClick={() => setState("Sign Up")} className="text-indigo-600 font-semibold cursor-pointer hover:underline">Sign Up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}