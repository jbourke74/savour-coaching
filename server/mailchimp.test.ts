import { describe, expect, it } from "vitest";

describe("Mailchimp credentials", () => {
  it("should have MAILCHIMP_API_KEY set", () => {
    expect(process.env.MAILCHIMP_API_KEY).toBeDefined();
    expect(process.env.MAILCHIMP_API_KEY).toMatch(/-us\d+$/);
  });

  it("should have MAILCHIMP_AUDIENCE_ID set", () => {
    expect(process.env.MAILCHIMP_AUDIENCE_ID).toBeDefined();
    expect(process.env.MAILCHIMP_AUDIENCE_ID!.length).toBeGreaterThan(0);
  });

  it("should be able to reach the Mailchimp API", async () => {
    const apiKey = process.env.MAILCHIMP_API_KEY!;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;
    const dc = apiKey.split("-")[1];

    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
      }
    );

    expect(response.ok).toBe(true);
    const data = await response.json() as { id: string };
    expect(data.id).toBe(audienceId);
  });
});
