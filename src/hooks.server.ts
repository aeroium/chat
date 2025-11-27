import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = {};

  const session = event.cookies.get("wom_token");

  if (session) {
    const res = await fetch("https://api.wasteof.money/session", {
      headers: {
        Authorization: session,
      },
    });

    const data = await res.json();
    if (data.user) {
      event.locals.user.name = data.user.name;
    } else {
      event.cookies.delete("wom_token", { path: "/" })
    }
  } else {
    event.locals.user = {};
  }

  if (event.url.pathname.startsWith("/app") && !event.locals.user.name) {
    throw redirect(303, "/login");
  }

  if (event.url.pathname.startsWith("/settings") && !event.locals.user.name) {
    throw redirect(303, "/login");
  }

  if (event.url.pathname.startsWith("/login") && event.locals.user.name) {
    throw redirect(303, "/app");
  }

  return await resolve(event);
};
