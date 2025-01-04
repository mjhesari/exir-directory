import {
  Link,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import { Icon } from "@iconify/react";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Image from "next/image";
import img1 from "@/public/drziba.jpg";
export default function MainNavbar({ dicts }: { dicts: DictsTypes }) {
  return (
    <Navbar
      maxWidth="full"
      classNames={{
        wrapper:
          "!container mx-auto px-0 !grid grid-cols-[300px_auto_max-content] justify-normal px-4",
        base: "bg-white",
      }}
      className="border-b hidden lg:block shadow-sm"
    >
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-3 text-black">
          {process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba" ? (
            <>
              <Image
                src={img1}
                alt="logo"
                width={45}
                className="rounded-full"
              />
              <h1>{dicts.DirectoryName.drziba}</h1>
            </>
          ) : (
            <>
              <Logo />
              <h1>{dicts.DirectoryName.exchange}</h1>
            </>
          )}
        </Link>
      </NavbarBrand>
      <NavbarContent>
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
        {!process.env.IS_NOT_MULTILANG ? (
          <NavbarItem>
            <Button
              as="a"
              variant="bordered"
              size="sm"
              className="text-default-500 rounded-xl hover:text-secondary-600 hover:border-secondary-600"
              href="/languages"
              aria-label="language page"
              startContent={<Icon icon="mdi:translate" className="h-4 w-4" />}
            >
              Languages
            </Button>
          </NavbarItem>
        ) : null}

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
