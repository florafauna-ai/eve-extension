---
description: Use when a FLORA job is bigger than one generation — a batch from a list or sheet, a PDP set from a product photo, a campaign deck from a creative, a video from a script, resizing into other aspect ratios, a brand audit, or an iterative refine loop.
---

# FLORA workflows

FLORA ships tested workflows for its multi-step jobs. Do not improvise one of these from
the raw tools; the skill carries the judgment — which model, what the gotchas are, what a
good result looks like, what to do when one comes back wrong — and its numbers are
measured against production rather than estimated.

1. Call `flora_discover_skills` with the name `flora-start-here`. It is FLORA's own
   router: it reads the request and names the specialised skill that fits.
2. Call `flora_discover_skills` again with that name to get the instructions, and follow
   them as written.
3. Pass `skill` and one `skill_run_id` you invent once on every subsequent FLORA call.

Call `flora_discover_skills` with no arguments when you want the full menu instead — it
lists every skill with a description. The catalogue is served by FLORA and changes as
workflows are added, so read it rather than assuming what exists.

Remember that these tools arrive namespaced, so call the tool whose name ends with
`flora_discover_skills`.

If nothing matches, say so and fall back to the individual tools — but quote the credit
cost first, and prefer one concurrent batch over a sequence of single calls.
