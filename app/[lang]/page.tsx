import {getDictionary, langsType } from "@/app/[lang]/dictionaries/dictionaries";
import CardResult from "@/components/Common/pages/SearchFilter/Result/CardResult";
import FilterBar from "@/components/Common/pages/SearchFilter/Filter";

const Home =async ({ params }: { params: { lang: langsType } }) => {
  const dicts=await getDictionary(params?.lang)
  return (
    <section className="mx-auto grid grid-cols-1 lg:grid-cols-[200px_auto] gap-x-[116px] gap-y-3 px-0 lg:px-4 pt-4">
      <FilterBar dicts={dicts} />
      <CardResult dicts={dicts} />
    </section>
  );
};
export default Home;
