"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import SearchInput from "./SearchInput";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Logoex from "@/components/Directory/exchange/Navbar/MainLogo";
import LanguageButton from "./LanguageButton";
import { LanguagesTypes } from "@/types/dataTypes";
import NavTopLogoExchange from "@/components/Directory/exchange/Navbar/navTopLogo";
import useMediaQuery from "@/hooks/use-media-query";

const NavTopLogo = dynamic(
  () =>
    import(
      `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/Navbar/navTopLogo`
    ),
  {
    loading: () => <p>Loading...</p>,
  }
) as typeof NavTopLogoExchange;
const Logo = dynamic(
  () =>
    import(
      `@/components/Directory/${process.env.NEXT_PUBLIC_DIRECTORY}/Navbar/MainLogo`
    ),
  {
    loading: () => <p>Loading...</p>,
  }
) as typeof Logoex;
export default function MainNavbar({ dicts,lang }: { dicts: DictsTypes;lang:LanguagesTypes }) {
  const isMoblie = useMediaQuery("(max-width: 1024px)");

  return (
    <Navbar
      maxWidth="full"
      classNames={{
        wrapper:
          "mx-auto !grid grid-cols-[300px_auto_max-content] justify-normal px-4",
        base: "lg:bg-white",
      }}
      className="lg:border-b sticky inset-[0_0_auto_0] lg:block lg:shadow-sm"
      isBlurred={false}
    >
      <NavbarBrand>
        {isMoblie?<NavTopLogo dicts={dicts}/>:<Logo dicts={dicts} />}
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex">
        {/* <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light">All</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Categories">
              <DropdownItem key="stock">Stock Footage</DropdownItem>
              <DropdownItem key="motion">Motion Graphics</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem> */}
        <NavbarItem>
          <SearchInput dicts={dicts} />
        </NavbarItem>
      </NavbarContent>
      {/* <NavbarContent className="flex-1 gap-6 " justify="center">
        <NavbarItem>
          <Link href="/" className="text-black">
            {dicts?.menuSection?.mainNav?.allExchanges}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/" className="text-black">
            {dicts?.menuSection?.mainNav?.suggestAnExchange}
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent className="gap-4">
        {(!process.env.IS_NOT_MULTILANG ? (
          <NavbarItem>
            <LanguageButton dicts={dicts} lang={lang} />
          </NavbarItem>
        ) : null)}

        {/* <NavbarItem>
          <UserAvatar />
        </NavbarItem>
        <NavbarItem>
          <Button
            radius="full"
            className="bg-gradient-to-tr from-purple-500 to-blue-500 text-white shadow-lg"
          >
            <Icon icon="hugeicons:credit-card" width="1.4rem" height="1.4rem" />{" "}
            {dicts.contributors.contributors}
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
