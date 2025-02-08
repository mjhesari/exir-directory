import { DictsTypes } from "@/app/[lang]/dictionaries/dictionaries"
import { Post } from "@/types/dataTypes"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "@nextui-org/react"
import Image from "next/image"
// import Link from "next/link"
const post:BlogPost = {
    title: "My Simple Content Formula That Generates $9,500 Monthly From Writing",
    subtitle: "This is the exact process I use to turn ordinary life problems into profitable content that sells itself",
    content: `
      <p>I messed up badly when I first started writing online. My bank account was empty, and I spent hours writing articles nobody read.</p>
      <p>But after lots of trial and error (and too much coffee), I stumbled onto a content formula that now brings in $9,500 monthly.</p>
      <p>The secret? Writing stuff people want to read. <em>Mind-blowing, right?</em></p>
      <h2>Here's my exact process, no fluff:</h2>
      <h3>1. Pick Problems That Pay</h3>
      <p>I grab my phone and write down every annoying problem I face.</p>
      <p>Last week, I couldn't figure out how to remove coffee stains from my favorite shirt, so that became an article.</p>
      <p class="font-medium">Your daily struggles are content gold.</p>
      <p><strong>Money tip:</strong> Search "[your problem] + affiliate program" to find products that solve these issues. Companies pay good money when you recommend their solutions.</p>
    `,
    readingTime: "4 min read",
    publishedDate: "Nov 16, 2024",
    views: 11200,
    responses: 303,
    memberOnly: true,
    image: {
      url: "https://images.unsplash.com/photo-1234",
      photographer: "Joshua Mayo",
      source: "Unsplash",
    },
  }
  interface BlogPost {
    memberOnly?: boolean
    title: string
    subtitle: string
    readingTime: string
    publishedDate: string
    image?: {
      url?: string
      caption?: string
      photographer?: string
      source?: string
    }
    content: string
    views: number
    responses: number
  }
function SinglePost({singlePost,dicts}:{ singlePost:Post;dicts:DictsTypes}) {

  return (
    <article className="max-w-[728px] mx-auto px-6 py-8">
    <h1 className="text-4xl font-bold tracking-tight mb-4">{singlePost.title?.[dicts.lang]}</h1>

    <h2 className="text-xl text-default-600 mb-8">{singlePost.description?.[dicts.lang]}</h2>

    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <Button isIconOnly variant="light" aria-label="Save">
          <Icon icon="mdi:bookmark-outline" className="text-xl" />
        </Button>
        <Button isIconOnly variant="light" aria-label="Listen">
          <Icon icon="mdi:play-circle-outline" className="text-xl" />
        </Button>
        <Button isIconOnly variant="light" aria-label="Share">
          <Icon icon="mdi:share-outline" className="text-xl" />
        </Button>
        <Button isIconOnly variant="light" aria-label="More">
          <Icon icon="mdi:dots-horizontal" className="text-xl" />
        </Button>
      </div>
    </div>
    {post.image && (
      <figure className="mb-8">
        <div className="relative aspect-[4/3] w-full mb-2">
          <Image src={"https://s2.webstatic.net/local-business/kakh-clinic-f46/1729939115859cc5-1920x780.webp"} alt={singlePost.title?.[dicts.lang]} fill className="object-cover" />
        </div>
        {/* {(post.image.caption || post.image.photographer) && (
          <figcaption className="text-center text-sm text-default-500">
            {post.image.caption && <span>{post.image.caption} </span>}
            {post.image.photographer && (
              <>
                Photo by{" "}
                <Link href="#" className="underline">
                  {post.image.photographer}
                </Link>
                {post.image.source && (
                  <>
                    {" "}
                    on{" "}
                    <Link href="#" className="underline">
                      {post.image.source}
                    </Link>
                  </>
                )}
              </>
            )}
          </figcaption>
        )} */}
      </figure>
    )}

    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>

    <div className="flex items-center gap-4 mt-8 border-t pt-8">
      <div className="flex items-center gap-2">
        <Icon icon="mdi:eye-outline" className="text-xl text-default-500" />
        <span className="text-default-500">{post.views}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="mdi:message-outline" className="text-xl text-default-500" />
        <span className="text-default-500">{post.responses}</span>
      </div>
    </div>
  </article>
  )
}

export default SinglePost