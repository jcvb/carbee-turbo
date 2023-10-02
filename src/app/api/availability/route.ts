import axios from "axios";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  res: NextApiResponse
): Promise<Response> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!request.url) {
    return new Response(JSON.stringify({ error: "URL is missing" }), {
      status: 400,
    });
  }

  const url = new URL(request.url);
  const params = url.searchParams;

  let date = params.get("date");

  try {
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
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching appointments",
      }),
      {
        status: 500,
      }
    );
  }
}
