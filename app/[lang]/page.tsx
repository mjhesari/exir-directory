import {getDictionary, langsType } from "@/app/[lang]/dictionaries/dictionaries";
import CardResult from "@/components/pages/SearchFilter/Result/CardResult";
import FilterBar from "@/components/pages/SearchFilter/Filter";

const Home =async ({ params }: { params: { lang: langsType } }) => {
  const dicts=await getDictionary(params?.lang)
  return (
    <main className="container mx-auto grid grid-cols-1 lg:grid-cols-[200px_auto] gap-x-[116px] gap-y-3 px-0 lg:px-0 lg:ps-4 pt-20 lg:pt-4">
      <FilterBar dicts={dicts} />
      <CardResult dicts={dicts} />
    </main>
  );
};
export default Home;
