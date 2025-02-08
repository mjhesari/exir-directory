export async function GET() {
    const url = process.env.NEXT_PUBLIC_BASE_URL_POST + "/api/post";
  try {
    const posts = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_TOKEN}`,
        },
      });
      if (!posts.ok) {
        throw new Error("Failed to fetch Languages");
      }
    const data= await posts.json();
    return Response.json(data.data.data);
  } catch (error) {
    console.error("Error fetching ExchangeData:", error);
    return Response.json({ data: {}, error }, { status: 500 });
  }
}
