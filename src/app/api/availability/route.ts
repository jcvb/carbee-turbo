import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export async function GET(request: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!request.url) {
    res.status(400).send({ error: "URL is missing" });
    return;
  }

  const url = new URL(request.url);
  const params = url.searchParams;

  let date = params.get("date");

  const response: any = await axios.get(
    `${process.env.NEXT_API_URL}/api/availability/${date}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data) {
    return new Response(JSON.stringify({ availability: response.data }));
  } else {
    return new Response(JSON.stringify({ error: "No appointments found" }), {
      status: 404,
    });
  }
}
