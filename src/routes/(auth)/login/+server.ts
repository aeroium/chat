import { json } from "@sveltejs/kit";
import axios from "axios";

export async function POST({ request, locals, cookies }) {
  const login = await request.json();

  try {
    const res = await axios.post("https://api.wasteof.money/session", {
      username: login.username,
      password: login.password,
    });

    cookies.set("wom_token", res.data.token, {
      path: "/",
      expires: new Date(new Date().setDate(new Date().getDate() + 14)),
    });

    return json({ success: true, message: "Successfully logged in" });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return json(
        {
          success: false,
          message: error.response?.data?.error ?? "API error",
        },
        { status: 200 },
      );
    }

    console.error(error);
    return json({ success: false, message: "Unknown error" }, { status: 200 });
  }
}
