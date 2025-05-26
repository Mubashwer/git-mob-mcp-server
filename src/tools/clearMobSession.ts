import { clearMobSession } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "clear_mob_session";

const description = "Clears the active mob or pairing session.";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "Clear Mob Session",
  readOnlyHint: false,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const { ok, value } = await clearMobSession();
  return { isError: !ok, content: [{ type: "text", text: value }] };
};

const tool: GitMobTool<typeof inputSchema, Record<string, never>> = {
  name,
  description,
  inputSchema,
  annotations,
  callback,
};

export default tool;
