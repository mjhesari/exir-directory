import Image from "next/image";
import Link from "next/link";
import img1 from "@/public/iranarabic.jpg";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";

const LogoIranArabic = ({ dicts }: { dicts: DictsTypes }) => {
    return (
        <Link href={`/${dicts?.lang}`} className="flex items-center gap-3 text-black">
            <Image
              src={img1}
              alt="logo"
              width={45}
              className="rounded-full"
            />
            <h1>{dicts?.DirectoryName?.iranarabic}</h1>
      </Link>
    );
}

export default LogoIranArabic;
