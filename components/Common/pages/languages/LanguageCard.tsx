import { Card } from "@nextui-org/react";
// import Data
import { LanguagesTypes } from "@/types/dataTypes";
import Link from "next/link";

const LanguageCard = ({ language }: { language: LanguagesTypes }) => {
  // const country=useAppSelector(state=>state.lang.lang)
  return (
    <Card
      className="w-full p-3 border px-0"
      shadow="none"
      aria-label="Language Card"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 py-1 px-3">
        {language?.map((e) => (
          <ul className="space-y-4 space-x-4 " key={e.id}>
            <li
              key={e.id}
              className="h-10 flex  flex-col text-left min-w-max relative hover:bg-default-200 p-2 rounded-xl cursor-pointer transition-colors font-medium"
            >
            <Link href={`${e.code}`} className="absolute inset-0 place-items-center flex px-2">
              {e.nativeName}
            </Link>
            </li>
          </ul>
        ))}
      </div>
    </Card>
  );
};

export default LanguageCard;
