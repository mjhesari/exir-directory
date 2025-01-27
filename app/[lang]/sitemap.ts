import { Business } from '@/types/dataTypes';
import { getDataSitemap } from '@/utils/api';
import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hostname = headers().get("x-forwarded-host");
  const {data}= await getDataSitemap()
  const dynamicUrls = data?.map((business:Business) => ({
    url: `https://${hostname}/b/${business?.slug}/${business?.publicId}`,
    lastModified: new Date(), 
    alternates: {
      languages: {
        en: `https://${hostname}/en/b/${business?.slug}/${business?.publicId}`,
        fa: `https://${hostname}/fa/b/${business?.slug}/${business?.publicId}`,
        ar: `https://${hostname}/ar/b/${business?.slug}/${business?.publicId}`,
      },
    },
  }));
  return [
    {
      url: `https://${hostname}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `https://${hostname}/en`,
          fa: `https://${hostname}/fa`,
          ar: `https://${hostname}/ar`,
        },
      },
    },
    ...dynamicUrls, 
  ]
}