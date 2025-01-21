import "../[lang]/globals.css";
import NavTopLogo from "@/components/Common/Navbar/navTopLogo";
import MainNavbar from "@/components/Common/Navbar/MainNavbar";
import MainFooter from "@/components/Common/Footer/MainFooter";
import { getDictionary } from "../[lang]/dictionaries/dictionaries";
import MainProviders from "../providers/main-provider";
import { getAllLanguage, getDirectoryData } from "@/utils/api";

export const metadata = {
  title: "Languages",
  description: "Change Language Page",
};

export default async function LanguageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dicts = await getDictionary('en');
  const {data}=await getDirectoryData()
  const lang=await getAllLanguage()
  return (
    <html>
      <body>
      <MainProviders exchange={data} lang={lang}>
        <NavTopLogo dicts={dicts} />
        <MainNavbar dicts={dicts}/>
        {children}
        {/* <MobileNav dicts={dicts}/> */}
        <MainFooter dicts={dicts} />
        </MainProviders>
      </body>
    </html>
  );
}
