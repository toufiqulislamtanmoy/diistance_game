import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "City Guessing Game",
  description: "Powered by NeovoTech Limited",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap children with ToastProvider for display fancy toast message */}
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
