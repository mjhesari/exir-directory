import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Image from "next/image";
import Link from "next/link";
import img1 from "@/public/iranarabic.jpg";
const NavTopLogoIranarabic = ({ dicts }: { dicts: DictsTypes }) => {
  return (
    <div className="fixed inset-[10px_0_auto_0] h-max z-50">
      <div className=" mx-auto px-3">
        <Link
          href={`/${dicts.lang}`}
          className="flex items-center gap-3 text-black"
        >
          <div className="lg:hidden bg-white flex flex-row p-1 justify-start w-44 gap-x-2 items-center rounded-full border">
          <Image
              src={img1}
              alt="logo"
              width={45}
              className="rounded-full"
            />
            <h1>{dicts?.DirectoryName?.iranarabic}</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavTopLogoIranarabic;
