import ArticleCard from "@/components/Common/pages/Post/article-card";
import NavCategories from "@/components/Common/pages/Post/nav-categories";
import { getDictionary, langsType } from '../dictionaries/dictionaries';

const Page = async ({ params }: { params: { lang: langsType } }) => {
  const dicts=await getDictionary(params?.lang)

  return (
    <main className="mx-auto pt-4 grid grid-cols-1 lg:grid-cols-[auto_400px] max-w-[900px] gap-4 pb-4">
      <div>
        <NavCategories dicts={dicts}/>
        <ArticleCard dicts={dicts}/>
      </div>
    </main>
  );
};

export default Page;
