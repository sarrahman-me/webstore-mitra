"use client";
import { Provider } from "react-redux";
import store from "@/src/redux/store";
import "./globals.css";
import Logo from "@/src/components/atoms/Logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body id="root">
        <div className="bg-slate-50 dark:bg-slate-900 dark:text-white text-black min-h-screen">
          <Provider store={store}>{children}</Provider>
          <div className=" text-gray-500 py-5 flex items-center justify-center">
            <p className="text-xs mr-1">Powered By</p> <Logo size="small" />
          </div>
        </div>
      </body>
    </html>
  );
}
