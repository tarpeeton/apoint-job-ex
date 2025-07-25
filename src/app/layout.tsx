import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import { AuthProvider } from "@/providers/AuthProvider";


export const metadata: Metadata = {
  title: "Отчёт по материалам",
  description: "ERP - Отчёт по материалам",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>{children}</AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
