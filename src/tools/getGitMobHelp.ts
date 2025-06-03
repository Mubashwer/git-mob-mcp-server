import { z } from "zod";
import { getHelp } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "get_git_mob_help";

const description =
  "Displays general help and usage information for the Git Mob CLI. " +
  "You can optionally provide a command ('setup', 'coauthor', or 'help') " +
  "to get detailed help for that specific command.";

const inputSchema = {
  command: z.enum(["setup", "coauthor", "help"]).optional(),
};

const annotations: ToolAnnotations = {
  title: "Git Mob Help",
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async ({ command }) => {
  const { ok, value } = await getHelp(command);
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
