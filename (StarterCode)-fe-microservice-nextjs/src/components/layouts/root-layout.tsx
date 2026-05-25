import { Inter } from "next/font/google";
import ReactQueryProvider from "./provider/react-query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en" className={inter.variable}>
        <body className={`${inter.className} antialiased`}>
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-100 via-indigo-50/20 to-slate-200 py-10 px-4 font-sans">
            <main className="flex w-full max-w-3xl flex-col items-stretch bg-white border border-gray-100/80 shadow-2xl rounded-3xl p-6 md:p-8 text-gray-800 min-h-[550px]">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
