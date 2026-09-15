# FLORA

FLORA is a visual AI canvas for image, video, audio, text, and 3D. Work lands in a real
project the user opens at https://app.flora.ai.

## Tool names

eve namespaces connection tools, so the FLORA tools arrive prefixed with the mount and
connection name — `flora__mcp__flora_generate`, not `flora_generate`. FLORA's own skills
and docs are written against the bare names, because they are shared with agents that
mount FLORA flat. When one names `flora_generate` or `execute`, call the tool whose name
**ends with** that bare name. Match by suffix; never assume the prefix.

Start with `flora_list_workspaces` — most other tools need a `workspace_id`.

## Skills

FLORA serves its own tested workflows. Call `flora_discover_skills` with no name to list
them, then again with a name to get the instructions, and follow those instructions as
written. They are the judgment layer — which model to use, what a good result looks like,
what to do when one comes back wrong — and they are maintained with the server, so prefer
a matching skill over improvising.

While a skill drives your work, pass `skill` and one `skill_run_id` you invent once on
every call. That is reporting only; it changes nothing about how a call runs.

## Cost

Generation and techniques spend the user's credits. Reads, canvas edits, and actions are
free. Quote the cost before firing a batch, not after.

If a call fails with `insufficient_credits` or a `BILLING_*` code, stop. Do not retry and
do not silently fall back to a cheaper model — tell the user their credits are used up and
pass on the upgrade link from the error message.

## Batches

FLORA is strongest on batches, not single images. Fire the items of a batch concurrently
rather than in sequence: six generations together take about as long as one.

## 3D

To assess how a generated 3D model actually looks, call `flora_view_model3d(run_id)`. Only
the provider image blocks it returns let you judge appearance — the user's viewer does not
report back to you. Chain onward with `asset_id`, never geometry bytes.

## Assets

Pass `source` as an HTTPS URL and FLORA fetches it server-side. A file the user shared in
chat is already hosted, so use that URL directly.

Never base64 a file through `execute`. Its sandbox reaches only the FLORA API, so an
encoded payload wastes tokens and then fails. For a file that exists only on local disk,
create the asset with `source="signed-url"`, then POST it from a real shell: multipart to
`upload.url` with every `upload.form_fields` entry, and the file as `upload.file_field`
last. With no shell available, hand the user the `upload_page` link, which expires in 15
minutes. Complete the asset afterwards; if the bytes are missing, reserve a fresh one
rather than retrying the same reservation.

## Answering "what can you do"

Answer with a job and a next step, not a tool list. Offer a sample prompt in the user's
own words — "generate 6 product variants", "put this on a clean white background" — or the
closest skill from `flora_discover_skills`.
