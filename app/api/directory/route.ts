
import { NextResponse } from "next/server";
// Utility function to handle filter conversion
import {filterConvertor} from '@/utils/api/index'
export interface RequestBody {
  industry?: string[];
}
export async function POST(request :Request) {
  try {
    const {pageIndex,pageSize,filters} = await request.json();

    let defaultSet: RequestBody = {};
    if (process?.env?.NEXT_PUBLIC_DIRECTORY === "iranarabic") {
      defaultSet = {};
    } else if (process?.env?.NEXT_PUBLIC_DIRECTORY === "dubai") {
      defaultSet = {};
    } else if(process?.env?.NEXT_PUBLIC_DIRECTORY === "drziba"){
      defaultSet = {
        industry: ["c259aa45-0a0f-49ac-be33-eade1392e136"]
      };
    }else if(process?.env?.NEXT_PUBLIC_DIRECTORY === "exchange"){
      defaultSet = {
        industry: ["0615cf73-9438-4801-9b8d-cc5cdce2da6b"]
      };
      
    }

    const body = JSON.stringify(filters ? filterConvertor(filters)? { ...defaultSet, ...filterConvertor(filters) }: defaultSet: defaultSet );
    const response = await fetch(
      `${process.env.BASE_URL}api/business/filter?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching ExchangeData:", error);
    return NextResponse.json({ data: { Data: {} }, error }, { status: 500 });
  }
}
