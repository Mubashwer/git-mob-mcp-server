import { z } from "zod";
import { gitMobClient } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "setMobSessionCoauthorsUsingTeamMembers";

const description =
  "Sets the active pairing or mob session by specifying the " +
  "keys of the team members to include as coauthors. " +
  "If Git Mob is setup, these coauthors will be automatically added as " +
  "Co-authored-by trailers to the commit's message when making commits during the session.";

const inputSchema = {
  coauthorKeys: z.array(z.string()).min(1),
};

const annotations: ToolAnnotations = {
  title: "Set Mob or Pairing Session Coauthors using Team Members",
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async ({ coauthorKeys }) => {
  const result = await gitMobClient.setMobSession(coauthorKeys);
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
