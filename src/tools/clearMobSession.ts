import { gitMobClient } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "clearMobSession";

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
  const result = await gitMobClient.clearMobSession();
  return { content: [{ type: "text", text: result }] };
};

const tool: GitMobTool<typeof inputSchema, Record<string, never>> = {
  name,
  description,
  inputSchema,
  annotations,
  callback,
};

export default tool;
