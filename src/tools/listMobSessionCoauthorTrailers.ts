import { listMobSessionCoauthorTrailers } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "list_mob_session_coauthor_trailers";

const description =
  "Lists the git Co-authored-by trailers for the coauthors " +
  "currently included in the active mob or pairing session. " +
  "If Git Mob is setup, these Co-authored-by trailers will be automatically " +
  "added to the commit's message when making commits during the session.";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "List Mob Session Coauthor Trailers",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const { ok, value } = await listMobSessionCoauthorTrailers();
  return { isError: !ok, content: [{ type: "text", text: value || "" }] };
};

const tool: GitMobTool<typeof inputSchema, Record<string, never>> = {
  name,
  description,
  inputSchema,
  annotations,
  callback,
};

export default tool;
