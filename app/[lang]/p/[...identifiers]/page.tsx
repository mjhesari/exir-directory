import { Post } from "@/types/dataTypes";
import { getDictionary, langsType } from "../../dictionaries/dictionaries";
import SinglePost from "@/components/Common/pages/Post/SinglePost";
import Comment from "@/components/Common/Comment/Comment";
// import Comment from "@/components/Common/Comment/Comment";
// import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
// import { Icon } from "@iconify-icon/react";
// import Image from "next/image";

const getSinglePost = async (id: string) => {
  try {
    const data = await fetch(`${process.env.BASE_URL_POST}/api/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.POST_TOKEN}`,
      },
    });
    const res = await data.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching ExchangeData in SinglePage:", error);
    return { data: { Data: {} } };
  }
};

const Page = async ({
  params,
}: {
  params: { identifiers: string[]; lang: langsType };
}) => {
  const dicts = await getDictionary(params?.lang);
  const publicId = params.identifiers[1];
  const singlepost: Post = await getSinglePost(publicId);
  if (!singlepost) {
    return <div>Data not found</div>;
  }

  return (
    <div className="mx-auto pt-4 grid grid-cols-1 lg:grid-cols-[auto_400px] max-w-[1200px] gap-2 pb-4">
<SinglePost singlePost={singlepost} dicts={dicts}/>

<Comment/>
    </div>
  );
};

export default Page;
