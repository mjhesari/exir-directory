import MainNavbar from "@/components/Common/Navbar/MainNavbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";
//* Import components
import MainProviders from "./providers/main-provider";
import { langsType, getDictionary } from "./dictionaries/dictionaries";
// import MobileNav from "@/components/Common/Navbar/mobileNav";
import { getAllLanguage, getDirectoryData } from "@/utils/api";
import { locales } from "@/middleware";
import dynamic from "next/dynamic";
import FooterExchnage from "@/components/Directory/exchange/Footer/MainFooter";

const MainFooter = dynamic(
  () =>
    import(
      `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/Footer/MainFooter`
    ),
  {
    loading: () => <p>Loading...</p>,
  }
) as typeof FooterExchnage;
//* Local fonts
const yekanBakh = localFont({
  src: "./fonts/YekanBakh-VF.woff2",
  display: "swap",
});
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
export async function generateMetadata({
  params,
}: {
  params: { lang: langsType };
}): Promise<Metadata> {
  const { lang } = params;
  const dicts=await getDictionary(lang)
  // Update manifest
  // await manifestGenerator(data, domain ?? "");

  return {
    title: dicts.metaData.title?.[process.env.NEXT_PUBLIC_DIRECTORY as keyof typeof dicts.metaData.title],
    description:dicts.metaData.desc?.[process.env.NEXT_PUBLIC_DIRECTORY as keyof typeof dicts.metaData.desc],
    icons: `/favicon/${process.env.NEXT_PUBLIC_DIRECTORY}.png`,
    // keywords:
    //   siteData?.tags?.map((e) =>
    //     typeof e === "string" ? e : e?.[lang] ?? ""
    //   ) ?? [],

    // robots: "index, follow",
    // generator: "Pazh",
    // creator: "Pazh",
    // publisher: "Pazh",
    // // manifest: `/${domain?.split(".").join("-")}.json`,
    // verification: {
    //   google: siteConfig?.googleVerification ?? "",
    //   yahoo: siteConfig?.yahooVerification ?? "",
    //   yandex: siteConfig?.yandexVerification ?? "",
    //   me: siteConfig?.bingVerification ?? "",
    // },
    // appleWebApp: {
    //   capable: true,
    //   title: `${siteConfig?.title?.[lang] ?? "Local business"}`,
    //   startupImage: siteConfig?.image ?? "",
    //   statusBarStyle: "default",
    // },
    // openGraph: {
    //   title: siteConfig?.title?.[lang] ?? "",
    //   description:
    //     siteConfig?.description?.[lang] ??
    //     "Website maker for every businesses in the iran",
    //   images: siteConfig?.image ?? "",
    // },
    // twitter: {
    //   title: `${siteConfig?.title?.[lang] ?? "Local business"}`,
    //   description:
    //     siteConfig?.description?.[lang] ??
    //     "Website maker for every businesses in the iran",
    //   images: siteConfig?.image ?? "",
    // },
    // metadataBase: new URL(`https://${domain}`),
    // alternates: {
    //   canonical: "/",
    //   languages: {
    //     en: `https://${domain}/en`,
    //     fa: `https://${domain}/fa`,
    //     ar: `https://${domain}/ar`,
    //   },
    // },
  };
}


export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { lang: langsType } }>) {
  const dicts = await getDictionary(params?.lang);
  const {data}=await getDirectoryData()
  const lang = await getAllLanguage()
  const font = dicts.dir === "rtl" ? yekanBakh.className : roboto.className;
  return (
    <html lang={dicts.lang} dir={dicts.dir}>
      <body className={`${font}`}>
        <MainProviders exchange={data} lang={lang}>
          <MainNavbar dicts={dicts} lang={lang}/>
          {children}
          {/* <MobileNav dicts={dicts}/> */}
          <MainFooter dicts={dicts} />
        </MainProviders>
      </body>
    </html>
  );
}
