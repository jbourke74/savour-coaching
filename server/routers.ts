import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

async function subscribeToMailchimp(email: string, tags: string[]): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    throw new Error("Mailchimp credentials not configured");
  }

  // Extract datacenter from API key (e.g. "us14" from "xxx-us14")
  const dc = apiKey.split("-")[1];
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      tags,
    }),
  });

  const data = await response.json() as { status: number | string; title?: string };

  if (response.ok) {
    return { success: true, message: "Subscribed successfully" };
  }

  // Handle already-subscribed case gracefully
  if (data.title === "Member Exists") {
    return { success: true, message: "Already subscribed" };
  }

  throw new Error((data.title as string) || "Failed to subscribe");
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  notify: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email("Please enter a valid email address"),
          interest: z.enum(["retreats", "workshops", "both"]).default("both"),
        })
      )
      .mutation(async ({ input }) => {
        const tags = input.interest === "both"
          ? ["notify-retreats", "notify-workshops"]
          : input.interest === "retreats"
          ? ["notify-retreats"]
          : ["notify-workshops"];

        return await subscribeToMailchimp(input.email, tags);
      }),
  }),
});

export type AppRouter = typeof appRouter;
