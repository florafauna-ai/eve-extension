import { readFile, writeFile } from "node:fs/promises"

const toolsDeclaration = new URL("../dist/tools/index.d.ts", import.meta.url)
const source = await readFile(toolsDeclaration, "utf8")
const moduleMarker = "export {}\n"

if (!source.includes(moduleMarker)) {
  await writeFile(toolsDeclaration, `${source.trimEnd()}\n${moduleMarker}`)
}
