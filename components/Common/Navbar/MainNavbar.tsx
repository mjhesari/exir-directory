"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@heroui/react";
import dynamic from "next/dynamic";
import SearchInput from "./SearchInput";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Logoex from "@/components/Directory/exchange/Navbar/MainLogo";
import LanguageButton from "./LanguageButton";
import { LanguagesTypes } from "@/types/dataTypes";
import NavTopLogoExchange from "@/components/Directory/exchange/Navbar/navTopLogo";
import useMediaQuery from "@/hooks/use-media-query";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

const NavTopLogo = dynamic(
  () =>
    import(
      `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/Navbar/navTopLogo`
    ),
  {
    loading: () => (
      <Skeleton className="rounded-lg">
        <div className="h-12 rounded-lg bg-default-300" />
      </Skeleton>
    ),
  }
) as typeof NavTopLogoExchange;

const Logo = dynamic(
  () =>
    import(
      `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/Navbar/MainLogo`
    ),
  {
    loading: () => (
      <Skeleton className="rounded-lg">
        <div className="rounded-lg bg-default-300" />
      </Skeleton>
    ),
  }
) as typeof Logoex;

export default function MainNavbar({
  dicts,
  lang,
}: {
  dicts: DictsTypes;
  lang: LanguagesTypes;
}) {
  const isMoblie = useMediaQuery("(max-width: 1024px)");

  return (
    <Navbar
      maxWidth="full"
      classNames={{
        wrapper:
          "mx-auto !grid grid-cols-[300px_auto_max-content_max-content] justify-normal px-4",
        base: "lg:bg-white",
      }}
      className="lg:border-b sticky inset-[0_0_auto_0] lg:block lg:shadow-sm"
      isBlurred={false}
    >
      <NavbarBrand>
        {isMoblie ? <NavTopLogo dicts={dicts} /> : <Logo dicts={dicts} />}
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex">
        <NavbarItem>
          <SearchInput dicts={dicts} />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex-1" justify="end">
        {process.env.NEXT_PUBLIC_DIRECTORY === "exchange" ? (
          <NavbarItem>
            {isMoblie ? (
              <div className="fixed top-[10px] end-0 h-max z-70">
                <div className=" mx-auto px-3">
                  <div className="flex items-center">
                    <Link
                      href={`/p`}
                      className={`bg-white flex flex-row p-[10px] items-center rounded-full border`}
                      aria-label="language page"
                    >
                      <Icon icon="grommet-icons:blog" width={32} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href={`${dicts.lang}/p`}
                className="text-default-500 rounded-xl hover:text-secondary-600 hover:border-secondary-600 gap-x-2 items-center flex border-2 border-solid px-1 py-[2px] text-lg"
              >
                <Icon icon="fa-solid:blog" width={20} />{" "}
                {dicts.menuSection.mainNav.blogPost}
              </Link>
            )}
          </NavbarItem>
        ) : null}
        {process.env.NEXT_PUBLIC_DIRECTORY === "iranarabic" ? (
          <div className="fixed top-[10px] end-1 z-70">
            <div className=" mx-auto px-2">
              <div className="flex items-center">
                <Link
                  href={`/`}
                  className={` flex flex-col p-[12px_7px] items-center rounded-xl bg-black `}
                  aria-label="button"
                >
                  <p className="text-white text-sm">تحميل مجاني لدليل السفر </p>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
        {!process.env.NEXT_PUBLIC_IS_NOT_MULTILANG ? (
          <LanguageButton dicts={dicts} lang={lang} />
        ) : null}
      </NavbarContent>
    </Navbar>
  );
}
