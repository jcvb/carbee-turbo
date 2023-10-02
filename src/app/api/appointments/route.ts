import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

interface QueryParams {
  size: number;
  before?: string | null;
  after?: string | null;
}

export async function GET(request: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!request.url) {
    res.status(400).send({ error: "URL is missing" });
    return;
  }
  const url = new URL(request.url);
  const params = url.searchParams;
  const queryParams: QueryParams = {
    size: parseInt(params.get("size") ?? "10", 10),
    before: params.get("before") ?? undefined,
    after: params.get("after") ?? undefined,
  };

  if (isNaN(queryParams.size) || queryParams.size <= 0) {
    return new Response(JSON.stringify({ error: "Invalid size parameter" }), {
      status: 400,
    });
  }

  const response: any = await axios.get(
    `${process.env.NEXT_API_URL}/api/appointments`,
    {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.data) {
    return new Response(
      JSON.stringify({ appointments: response.data })
    );
  } else {
    return new Response(JSON.stringify({ error: "No appointments found" }), {
      status: 404,
    });
  }
}
