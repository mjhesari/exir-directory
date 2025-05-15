export async function GET() {
    const url = process.env.NEXT_PUBLIC_COUNTRY_BASE_URL + "api/language";
  try {
    const countries = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!countries.ok) {
        throw new Error("Failed to fetch Languages");
      }
    const data = await countries.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching language:", error);
    return Response.json({ data: {}, error }, { status: 500 });
  }
}
