// import MainBanner from "@/components/Banner/MainBanner";
// import CompanyItemsCard from "@/components/CompanyCard/FeaturesExchange/CompanyItemsCard";
// import AdsCard from "@/components/CompanyCard/Ads/AdsCard";
// import CompanyProduct from "@/components/CompanyCard/Products/CompanyProduct";
// import CompanyCuntributes from "@/components/CompanyCard/Cuntributes/CompanyCuntributes";
// import CompanyPartners from "@/components/CompanyCard/Partners/CompanyPartners";
// import CompanyComments from "@/components/Common/CompanyCard/Comments/CompanyComments";
import { CompanyDetails } from "@/components/Common/CompanyCard/DetailsExchange/CompanyDetails";
import { CompanyOverview } from "@/components/Common/CompanyCard/Overview/CompanyOverview";
import { getDictionary, langsType } from "../../dictionaries/dictionaries";
import CompanyContact from "@/components/Common/CompanyCard/Contact/CompanyContact";
import { CompanyLocCard } from "@/components/Common/CompanyCard/Locaition/CompanyLoccard";
import CompanyGallary from "@/components/Common/CompanyCard/Gallery/CompanyGallary";
import CompanySocialMedia from "@/components/Common/CompanyCard/SocialMedia/CompanySocialMedia";
// import CompanyHoldApp from "@/components/Common/CompanyCard/HoldingApp/CompanyHoldApp";
import { Business } from "@/types/dataTypes";
import { generateLocalBusinessSchema } from "@/utils/data";
import Comment from "@/components/Common/Comment/Comment";
import CompanyHero from "@/components/Common/CompanyCard/hero/CompanyHero";

const getSinglePageData = async (id: string) => {
  try {
    const data = await fetch(`${process.env.BASE_URL}api/business/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error fetching ExchangeData in SinglePage:", error);
    return { data: { Data: {} } };
  }
};

//* Getting business data
export default async function Home({
  params,
}: {
  params: { identifiers: string[]; lang: langsType };
}) {
  const dicts = await getDictionary(params?.lang);
  const publicId = params.identifiers[1];
  const exchangeData: Business = await getSinglePageData(publicId);
  const localBusinessSchema = await generateLocalBusinessSchema(
    exchangeData,
    params.lang
  );
  if (!exchangeData) {
    return <div>Data not found</div>;
  }

  return (
    <>
      <main className="mx-auto pt-4 grid grid-cols-1 lg:grid-cols-[auto_400px] max-w-[1100px] gap-4 pb-4">
        <section className="space-y-4 mx-5 lg:mx-0">
          <CompanyHero dicts={dicts} exchangeData={exchangeData}/>
          <CompanyOverview exchangeData={exchangeData} dicts={dicts} />
          <div className="lg:hidden block">
            <CompanyContact exchangeData={exchangeData} dicts={dicts} />
          </div>
          {process.env.NEXT_PUBLIC_DIRECTORY === "exchange" && (
            <CompanyDetails exchangeData={exchangeData} dicts={dicts} />
          )}
          <CompanyGallary exchangeData={exchangeData} />
          <CompanySocialMedia exchangeData={exchangeData} dicts={dicts} />
          <CompanyLocCard exchangeData={exchangeData} dicts={dicts} />
          {/* <div className="grid xl:grid-cols-2 gap-4 grid-cols-1"> */}
          {/* <CompanyHoldApp dicts={dicts} exchangeData={exchangeData} /> */}
          {/* </div> */}
          {/* <CompanyComments/> */}
        </section>
        {/* <MainBanner /> */}
        <section className="space-y-4 mx-5 lg:mx-0 lg:block hidden">
          <div className="h-screen !overflow-hidden lg:sticky lg:top-20 grid grid-rows-[max-content_auto] gap-4">
            <CompanyContact exchangeData={exchangeData} dicts={dicts} />
            <Comment />
          </div>
          {/* <CompanyItemsCard exchangeData={exchangeData} dicts={dicts} /> */}
          {/* <CompanyProduct dicts={dicts} /> */}
          {/* <CompanyCuntributes dicts={dicts} /> */}
          {/* <CompanyPartners  /> */}
          {/* <AdsCard /> */}
        </section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
          defer
        />
      </main>
    </>
  );
}
