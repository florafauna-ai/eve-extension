import { defineExtension } from "eve/extension"
import { z } from "zod"

/**
 * Two ways to authenticate, because Vercel Connect is still beta and enabled
 * per team — an extension that required it would be uninstallable for anyone
 * whose team has not had it turned on.
 *
 * `connector` is the one to prefer: each caller authorizes their own FLORA
 * account in the browser, so generations spend their own credits and there is
 * no shared secret. `token` is the escape hatch for a team without Connect and
 * for local development, and it makes every session act as one FLORA account.
 */
export default defineExtension({
  config: z
    .object({
      url: z.string().url().default("https://agents.flora.ai/mcp"),
      connector: z
        .string()
        .optional()
        .describe("Vercel Connect connector UID, e.g. agents.flora.ai/flora"),
      token: z
        .string()
        .optional()
        .describe("Static bearer token. Only staging and development accept one."),
      /**
       * User scope is the default because FLORA work lands in a real workspace
       * and spends that person's credits. App scope makes every session act as
       * one shared FLORA account, which is only right for an unattended agent.
       */
      principalType: z.enum(["user", "app"]).default("user"),
    })
    .refine((config) => (config.connector == null) !== (config.token == null), {
      message: "Set exactly one of `connector` or `token`.",
    }),
})
