import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = {};

  const session = event.cookies.get("wom_token");

  if (session) {
    try {
      const res = await event.fetch("https://api.wasteof.money/session", {
        headers: {
          Authorization: session,
        },
      });

      if (res.ok) {
        const data = await res.json();
        event.locals.user.name = data.user.name;
      }
    } catch (error) {
      console.error("ERR", error);
      event.locals.user = {};
    }
  } else {
    event.locals.user = {};
  }

  console.log(event.locals);

  if (event.url.pathname.startsWith("/app") && !event.locals.user.name) {
    throw redirect(303, "/login");
  }

  if (event.url.pathname.startsWith("/login") && event.locals.user.name) {
    throw redirect(303, "/app");
  }

  return await resolve(event);
};
