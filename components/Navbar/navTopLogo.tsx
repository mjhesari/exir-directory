import { Card } from "@nextui-org/react";
import Logo from "./Logo";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Link from "next/link";

const NavTopLogo = ({dicts}:{dicts:DictsTypes}) => {
  return (
    <div className="fixed inset-[10px_0_auto_0] h-max z-50">
      <div className=" mx-auto px-3">
      <Link href={`/${dicts.lang}`} className="flex items-center gap-3 text-black">
        <div
          className="lg:hidden bg-white flex flex-row p-1 justify-start w-44 gap-x-2 items-center rounded-full border"
        >
          <Logo /> <h1>{dicts?.DirectoryName.exchange}</h1>
        </div>
        </Link>

      </div>
    </div>
  );
};

export default NavTopLogo;
