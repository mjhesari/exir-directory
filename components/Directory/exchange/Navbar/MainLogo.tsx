import Link from "next/link";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
import Logoexir from "./ExchangeLogo";

const Logoex = ({ dicts }: { dicts: DictsTypes }) => {
    return (
        <Link href={`/${dicts?.lang}`} className="flex items-center gap-3 text-black">
            <Logoexir/>
              <h1>{dicts?.DirectoryName?.exchange}</h1>
        </Link>
    );
}

export default Logoex;
