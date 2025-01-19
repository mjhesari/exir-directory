import LanguageCard from "@/components/Common/pages/languages/LanguageCard";
import img1 from "@/public/original-b93abe1472897c8a503205900c6a14d2.png";
import { getAllLanguage } from "@/utils/api";
import  Image from "next/image";

//* Fetch Data Countries

const Languages = async() => {
const languages =await getAllLanguage()
  return (
    <main>
      <section className="mx-auto bg-[#c5c5c593] h-96 flex flex-row justify-around p-7 xl:p-0 items-center">
        <h2 className="text-6xl font-semibold text-default-600 leading-snug">
          {" "}
          Choose your language
        </h2>
        <Image
          src={img1}
          alt="languge"
          width="500"
          className="lg:block hidden"
        ></Image>
      </section>
      <section className="container mx-auto pt-4">
        <LanguageCard language={languages}/>
      </section>
    </main>
  );
};

export default Languages;
