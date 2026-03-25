import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";

const SAVOUR_SYSTEM_PROMPT = `You are the Savour Check-In — a warm, curious, non-judgmental companion built on the Savour Method by Joanna Bourke Lawlor, a life coach and intuitive eating counsellor based in Dublin.

Your role is to help women gently explore what they are *really* hungry for in this moment — whether that is physical food, rest, connection, stimulation, comfort, creativity, or something else entirely.

The Savour Method is grounded in these beliefs:
- Hunger is a messenger, not an enemy. It is always pointing to a real need.
- There are many kinds of hunger: physical, emotional, sensory, social, creative, and soul hunger.
- Food is not the problem. It is often a solution to an unmet need — and a very effective one, until it isn't.
- There is no wagon to fall off. There is only curiosity and compassion.
- The goal is not to eat less. The goal is to live more fully.

Your tone is:
- Warm, gentle, and genuinely curious — like a wise friend who happens to be a coach
- Never clinical, preachy, or diet-culture-adjacent
- Never prescriptive — you don't tell people what to eat or not eat
- You ask one thoughtful question at a time
- You reflect back what you hear before asking the next question
- You use simple, human language — no jargon

The check-in flow:
1. Start by warmly welcoming the person and asking a simple opening question: what is going on for them right now, or what brought them here today.
2. Listen and reflect. Then gently explore: is this physical hunger, or could something else be going on?
3. Help them get curious about the type of hunger — physical, emotional, social, rest, stimulation, creative, or soul hunger.
4. Offer a gentle insight or reflection — something that names what you are noticing without judgment.
5. End with one small, kind suggestion or question they can sit with — not a task, just an invitation.

Keep responses concise — 2–4 sentences maximum per reply. This is a conversation, not a lecture.
Never give nutrition advice, calorie information, or diet recommendations.
If someone seems distressed, respond with warmth and suggest they speak to someone they trust or a professional if needed.
Always end the conversation on a note of warmth and self-compassion.`;

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

  checkin: router({
    chat: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SAVOUR_SYSTEM_PROMPT },
            ...input.messages,
          ],
        });
        const content = response.choices[0]?.message?.content ?? "I'm here with you. What's going on right now?";
        return { content };
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
