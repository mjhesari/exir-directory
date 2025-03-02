"use client";
import { Card, CardBody } from "@heroui/react";
// import { Icon } from "@iconify/react";
import { Post } from "@/types/dataTypes";
import Image from "next/image";
import { useAppSelector } from "@/redux/app/hooks";
import Link from "next/link";
import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries";
export default function ArticleCard({ dicts }: { dicts: DictsTypes }) {
  const postData = useAppSelector((state) => state.post.data);

  return (
    <>
      <div className="gap-y-3 grid mt-3">
        {postData.length > 0
          ? postData.map((postData: Post, index) => (
              <Link key={index} href={`/p/${postData.slug}/${postData.id}`}>
                <Card
                  className="max-w-4xl bg-white p-4 border"
                  key={index}
                  radius="sm"
                  shadow="none"
                >
                  {/* <CardHeader className="flex items-center gap-3">
        <Avatar src="https://v0.dev/placeholder.svg?height=40&width=40" size="sm" className="rounded-full" />
        <div className="flex flex-col">
        <div className="flex items-center gap-1 text-small text-default-500">
        <span>In</span>
        <span className="font-semibold">{publication}</span>
          <span>by</span>
          <span className="font-semibold">{name}</span>
          </div>
          </div>
          </CardHeader> */}
                  <CardBody className="flex flex-row gap-4 py-2">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold mb-2">
                        {
                          postData.title?.[
                            dicts.lang as keyof typeof postData.title
                          ]
                        }
                      </h4>
                      <p className="text-default-500">
                        {
                          postData.description?.[
                            dicts.lang as keyof typeof postData.description
                          ]
                        }
                     </p>
                </div>
                    <div className="w-48 h-32">
                      <Image
                  src={postData.image.includes("http") ? postData.image : `http://${postData.image}`}
                    alt={postData.title?.[
                      dicts.lang as keyof typeof postData.title
                    ]}
                    className="w-full h-full object-cover rounded-lg"
                    fill
                    />
                    </div>
                  </CardBody>
                  {/* <CardFooter className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-4 text-small text-default-500">
                <span>date</span>
                  <div className="flex items-center gap-1">
                  <Icon icon="mdi:eye" />
                  <span>20</span>
                  </div>
                  <div className="flex items-center gap-1">
                  <Icon icon="mdi:comment-outline" />
                  <span>4</span>
                  </div>
                </div>
                <div className="flex gap-2">
                <Button isIconOnly variant="light" aria-label="Minimize">
                <Icon icon="mdi:minus" className="text-xl" />
                </Button>
                  <Button isIconOnly variant="light" aria-label="Bookmark">
                  <Icon icon="mdi:bookmark-outline" className="text-xl" />
                  </Button>
                  <Button isIconOnly variant="light" aria-label="More options">
                  <Icon icon="mdi:dots-horizontal" className="text-xl" />
                  </Button>
                  </div>
                  </CardFooter> */}
                </Card>
              </Link>
            ))
          : ""}
      </div>
    </>
  );
}
