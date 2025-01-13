import MainNavbar from "@/components/Navbar/MainNavbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";
//* Import components
import MainProviders from "../providers/main-provider";
import { langsType, getDictionary } from "./dictionaries/dictionaries";
import MainFooter from "@/components/Footer/MainFooter";
// import MobileNav from "@/components/Navbar/mobileNav";
import NavTopLogo from "@/components/Navbar/navTopLogo";
import { getAllLanguage, getExchangeData } from "@/utils/api";
import { locales } from "@/middleware";

//* Local fonts
const yekanBakh = localFont({
  src: "./fonts/YekanBakh-VF.woff2",
  display: "swap",
});
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

//* Set meta tags
export const metadata: Metadata = {
  title: "Exchange Hub",
  description: "Exchange Hub",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { lang: langsType } }>) {
  const dicts = await getDictionary(params?.lang);
  const {data}=await getExchangeData()
  const lang=await getAllLanguage()
  const font = dicts.dir === "rtl" ? yekanBakh.className : roboto.className;
  return (
    <html lang={dicts.lang} dir={dicts.dir}>
      <body className={`${font}`}>
        <MainProviders exchange={data} lang={lang}>
          <NavTopLogo dicts={dicts}/>
          <MainNavbar dicts={dicts} />
          {children}
          {/* <MobileNav dicts={dicts}/> */}
          <MainFooter dicts={dicts} />
        </MainProviders>
      </body>
    </html>
  );
}
