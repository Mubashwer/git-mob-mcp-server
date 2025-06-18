import { z } from "zod";
import { addTeamMember } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/index.js";

const name = "add_team_member";

const description =
  "Adds a new team member using their key, name, and email. " +
  "This member can then be used in a pairing or mobbing sessions as a cauthor. " +
  "The first name is a good choice for the key." +
  "Ask the user if they want mob or pair with this team member.";

const inputSchema = {
  key: z.string(),
  name: z.string(),
  email: z.string(),
};

const annotations: ToolAnnotations = {
  title: "Add Team Member",
  readOnlyHint: false,
  destructiveHint: false,
  idempotentHint: false,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async ({
  key,
  name,
  email,
}) => {
  const { ok, value } = await addTeamMember(key, name, email);
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
