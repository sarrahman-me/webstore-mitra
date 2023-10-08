"use client";
import { Provider } from "react-redux";
import store from "@/src/redux/store";
import "./globals.css";

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
          <p className="text-xs text-center text-gray-500 py-5">
            Powered By TokoKeramik.com
          </p>
        </div>
      </body>
    </html>
  );
}
