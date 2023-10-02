import axios from "axios";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  let params = await request.json();
  const body: RequestBody = {
    username: params.username,
    password: params.password,
  };

  const response: any = await axios.post(
    `${process.env.NEXT_API_URL}/api/auth`,
    body
  );

  if (response.data.token) {
    return new Response(JSON.stringify({ token: response.data.token }));
  } else {
    return new Response(JSON.stringify(null));
  }
}
