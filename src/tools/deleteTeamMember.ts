import { z } from "zod";
import { deleteTeamMember } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/index.js";

const name = "delete_team_member";

const description =
  "Deletes a team member by their key. " +
  "User can only delete a team member they have added previously. " +
  "If user did not specify a key, show them list of existing team members and ask them to select one.";

const inputSchema = {
  key: z.string(),
};

const annotations: ToolAnnotations = {
  title: "Delete Team Member",
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async ({ key }) => {
  const { ok, value } = await deleteTeamMember(key);
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
