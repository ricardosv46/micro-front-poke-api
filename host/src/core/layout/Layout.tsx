import type { ReactNode } from "react";
import { Toast } from "../../modules/home/presentation/components/Toast";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MobileNav } from "./components/MobileNav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-background text-on-background pb-[80px] md:pb-0">
      <div className="pokeball-watermark">
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10,0,0,0,2,12a10,10,0,0,0,10,10A10,10,0,0,0,22,12,10,10,0,0,0,12,2Zm0,2a8,8,0,0,1,7.93,7H15a3,3,0,0,0-6,0H4.07A8,8,0,0,1,12,4Zm0,16a8,8,0,0,1-7.93-7H9a3,3,0,0,0,6,0h4.93A8,8,0,0,1,12,20Zm0-9a1,1,0,1,1-1,1A1,1,0,0,1,12,11Z"></path>
        </svg>
      </div>

      <Header />

      <main className="relative z-10 mx-auto w-full max-w-[1200px] px-container">
        {children}
      </main>

      <Footer />

      <MobileNav />

      <Toast />
    </div>
  );
};
