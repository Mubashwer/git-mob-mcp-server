import { listMobSessionCoauthors } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/index.js";

const name = "list_mob_session_coauthors";

const description =
  "Lists all coauthors currently included in the active mob or pairing session. " +
  "If Git Mob is setup, these coauthors will be automatically added as " +
  "Co-authored-by trailers to the commit's message when making commits during the session.";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "List Mob Session Coauthors",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const { ok, value } = await listMobSessionCoauthors();

  if (!ok) {
    return { isError: true, content: [{ type: "text", text: value }] };
  }

  const lines = value.split("\n").filter((line) => line.trim() !== "");
  return {
    isError: false,
    content: lines.map((line) => ({ type: "text", text: line })),
  };
};

const tool: GitMobTool<typeof inputSchema, Record<string, never>> = {
  name,
  description,
  inputSchema,
  annotations,
  callback,
};

export default tool;
