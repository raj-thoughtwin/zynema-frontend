import { Inter } from "next/font/google";
import "@/styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BootstrapClient from "@/components/BootstrapClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zynema - Watch Movies Online",
  description: "Watch movies and TV shows online for free",
};

import { Toaster } from "react-hot-toast";
import { LoaderProvider } from "@/utils/LoaderContext";
import GlobalLoader from "@/components/GlobalLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient />
        <LoaderProvider>
          <GlobalLoader />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        {children}
        </LoaderProvider>
      </body>
    </html>
  );
}
