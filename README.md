# @flora-ai/eve-extension

[FLORA](https://flora.ai) for [eve](https://eve.dev) agents. Generate and transform image,
video, audio, text, and 3D on a real FLORA canvas.

The extension gives an agent three things: a connection to the hosted FLORA MCP server,
the operating rules for using it well, and routing into FLORA's own tested workflows.

## Install

```bash
npm install @flora-ai/eve-extension
```

Create a Vercel Connect connector for FLORA, once per team, from your agent's directory:

```bash
vercel connect create https://agents.flora.ai/mcp --name flora
```

It opens a browser to authorize FLORA and prints a connector UID shaped
`agents.flora.ai/flora`. Mount the extension with it:

```ts
// agent/extensions/flora.ts
import flora from "@flora-ai/eve-extension"

export default flora({ connector: process.env.FLORA_CONNECTOR! })
```

Each person who talks to the agent authorizes their own FLORA account on first use, so
there is no shared key and each generation spends that person's credits.

## Configuration

| Option          | Default                       | Notes                                                          |
| --------------- | ----------------------------- | -------------------------------------------------------------- |
| `connector`     | —                             | Vercel Connect connector UID. Set this or `token`.             |
| `token`         | —                             | Static bearer token. Development only; production rejects one. |
| `url`           | `https://agents.flora.ai/mcp` | Point at a staging worker when developing.                     |
| `principalType` | `"user"`                      | `"app"` makes every session act as one shared FLORA account.   |

## What it contributes

Mounted as `flora`, the extension adds:

- **`flora__mcp`** — the FLORA MCP connection. Its tools arrive as
  `flora__mcp__flora_generate` and so on.
- **`flora__workflows`** — a skill that routes into FLORA's server-served workflows
  (`flora_discover_skills`), so they are never stale in your project.
- **instructions** — cost and batching rules, asset upload handling, 3D inspection.

FLORA's own skills are written against bare tool names like `flora_generate`, because they
are shared with agents that mount FLORA flat. The extension's instructions tell the model
to match tool names by suffix, so those skills work unmodified here.

## Links

- [FLORA](https://flora.ai) · [app.flora.ai](https://app.flora.ai)
- [FLORA MCP skills](https://github.com/florafauna-ai/flora-mcp-skills)
- [Template agent built on this extension](https://github.com/florafauna-ai/flora-eve-agent)
- [eve documentation](https://eve.dev/docs)

## License

Apache-2.0
