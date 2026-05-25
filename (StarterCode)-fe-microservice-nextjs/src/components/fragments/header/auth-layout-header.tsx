export default function AuthLayoutHeader() {
  return (
    <header className="py-4 w-full">
      <div className="w-full bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl flex justify-between items-center p-5 shadow-md border border-slate-800">
        <div>
          <img
            src="/logo/logo-hita-vidya-utama.png"
            alt="BangJek"
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold text-white tracking-tight">
            BangJek
          </h1>
          <p className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest mt-0.5">
            Secured Entry
          </p>
        </div>
      </div>
    </header>
  );
}
