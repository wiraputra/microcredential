"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function AdminLayoutHeader() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<{ sub?: string }>(token);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEmail(decoded.sub || "");
      }
    } catch (e) {
      console.error("Failed to decode token", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <header className="py-4 w-full">
      <div className="w-full bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center p-5 shadow-md border border-slate-800 gap-4">
        {/* Left Side: Logo & Info */}
        <div className="flex items-center gap-4">
          <img
            src="/logo/logo-hita-vidya-utama.png"
            alt="BangJek"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <div className="hidden sm:block h-8 w-[1px] bg-slate-800"></div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white tracking-tight">
              User Management
            </h1>
            <p className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest mt-0.5">
              Admin Console
            </p>
          </div>
        </div>

        {/* Right Side: Active User Details & Logout */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          {email && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-300 text-xs">
                {email.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-left font-sans">
                <p className="text-xs text-slate-300 font-semibold">{email}</p>
                <span className="inline-block mt-0.5 px-2 py-0.5 text-[9px] font-bold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
                  Admin
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 rounded-xl transition duration-200 border border-rose-500/20 hover:border-rose-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
