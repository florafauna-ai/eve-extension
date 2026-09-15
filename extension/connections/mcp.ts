import { connect } from "@vercel/connect/eve"
import { defineDynamic, defineMcpClientConnection } from "eve/connections"

import extension from "../extension"

/**
 * Resolved per session rather than declared statically because an extension's
 * mount binds `config` at runtime, while the build evaluates authored modules
 * up front — a top-level `extension.config` read throws during `eve build`.
 * Keeping the read inside the handler is the supported way to reach it.
 *
 * The description is the only signal `connection_search` uses to decide whether
 * to query FLORA at all, so it names finished jobs rather than capabilities: an
 * agent that reads "visual AI canvas" does not know to reach for it when a user
 * asks for six product variants.
 */
export default defineDynamic({
  events: {
    "session.started": () => {
      const { url, connector, token, principalType } = extension.config
      return defineMcpClientConnection({
        url,
        // eve requires a stable, non-secret identity for an authenticated
        // connection. The connector UID is exactly that; the token is a secret,
        // so the static-token path keys on the endpoint instead.
        instanceKey: connector ?? url,
        description: [
          "FLORA visual AI canvas — generate and transform image, video, audio, text, and 3D.",
          "Reach for it to: produce product or campaign imagery; make many variants of one",
          "thing in parallel (SKUs, scenes, localisations, aspect ratios); relight, upscale,",
          "restyle, background-swap, or resize an existing image; animate a still into video;",
          "generate and inspect a 3D model; run a saved multi-step FLORA technique; read or",
          "write nodes on a FLORA canvas; list generation models and their cost.",
          "It also serves its own tested workflow skills — call flora_discover_skills to list",
          "them, then again by name for the instructions to follow.",
          "Work lands in a real FLORA project the user can open at https://app.flora.ai.",
          "Generation spends the user's credits; reads and canvas edits are free.",
        ].join(" "),
        auth:
          connector != null
            ? connect({ connector, principalType })
            : { getToken: async () => ({ token: token! }) },
      })
    },
  },
})
