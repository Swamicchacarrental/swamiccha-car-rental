import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CarFront,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { callAppsScript } from "../services/appsScript";

function LoadingOverlay({ text }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080c]/90 backdrop-blur-md"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-amber-300/20 border-t-amber-300" />
        <CarFront className="text-amber-300" size={34} />
      </div>
      <p className="mt-6 text-lg font-semibold text-white">{text}</p>
      <p className="mt-1 text-sm text-zinc-500">Please wait a moment...</p>
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-amber-300 to-amber-500" />
      </div>
    </div>
  );
}

function InputField({ label, icon: Icon, right, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          {...props}
          className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-11 pr-11 text-white placeholder:text-zinc-600 outline-none transition focus:border-amber-300/60 focus:ring-4 focus:ring-amber-300/10"
        />
        {right}
      </div>
    </div>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        const result = await callAppsScript("register", {
          name,
          email,
          password,
        });

        if (!result.success) {
          setError(result.message || "Registration failed.");
          setLoading(false);
          return;
        }

        setSuccess(result.message || "Registration successful! Please log in.");

        setIsRegister(false);
        setName("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
      } else {
        const result = await callAppsScript("login", {
          email,
          password,
        });

        if (!result.success) {
          setError(result.message || "Invalid email or password.");
          setLoading(false);
          return;
        }

        // Authentication and role verification must be enforced
        // server-side before this dashboard is used in production.
        sessionStorage.setItem("adminUser", JSON.stringify(result.user));
        // The loader stays on screen until the dashboard replaces this page.
        navigate("/admin/dashboard", {
          state: { user: result.user },
        });
      }
    } catch (err) {
      console.error("Registration/Login Error:", err);
      console.error("Error stack:", err.stack);

      setError(err?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  function switchMode() {
    setIsRegister((previous) => !previous);
    setName("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  }

  const eyeButton = (
    <button
      type="button"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-amber-300"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07080c] px-4 py-10 text-white">
      {loading && (
        <LoadingOverlay
          text={isRegister ? "Creating your account..." : "Signing you in..."}
        />
      )}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-amber-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-amber-400/20 via-amber-500/5 to-transparent p-10 lg:flex">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-black">
              <CarFront size={24} />
            </div>
            <p className="font-semibold">Swamiccha Car Rental</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Manage every booking,{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                effortlessly.
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-zinc-400">
              Track trips, payments and customer ID proofs from one secure
              admin panel.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-zinc-400">
            <ShieldCheck size={18} className="text-amber-300" />
            Secure admin access
          </div>
        </div>

        {/* Form panel */}
        <div className="p-6 sm:p-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-black shadow-lg shadow-amber-500/25 lg:hidden">
            <CarFront size={26} />
          </div>

          <h1 className="text-3xl font-bold">
            {isRegister ? "Create account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {isRegister
              ? "Register to start managing bookings."
              : "Log in to open your admin dashboard."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {isRegister && (
              <InputField
                label="Full name"
                icon={UserRound}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            )}

            <InputField
              label="Email address"
              icon={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <InputField
              label="Password"
              icon={Lock}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              required
              right={eyeButton}
            />

            {isRegister && (
              <InputField
                label="Confirm password"
                icon={Lock}
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            )}

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 py-3.5 font-bold text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:shadow-amber-400/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
            </button>
          </form>

          {/* Register link hidden. Uncomment to re-enable registration.
          <p className="mt-6 text-center text-sm text-zinc-400">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={switchMode}
              className="font-semibold text-amber-300 hover:text-amber-200"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
          */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mx-auto mt-5 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-amber-300"
          >
            <ArrowLeft size={16} />
            Back to website
          </button>
        </div>
      </div>
    </div>
  );
}