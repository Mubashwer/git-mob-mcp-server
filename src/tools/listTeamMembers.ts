import { listCoauthors } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "list_team_members";

const description =
  "Lists all team members that have been added to Git Mob. " +
  "The team members can then be used in pairing / mobbing sessions as coauthors." +
  "Each entry is formatted as: <key> <name> <email>." +
  "Ask the user which team member(s) they want to pair or mob with.";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "List Team Members",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const { ok, value } = await listCoauthors();
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
