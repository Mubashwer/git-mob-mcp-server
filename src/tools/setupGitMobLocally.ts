import { setupLocal } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/index.js";

const name = "setup_git_mob_locally";
const description =
  "Sets up the Git Mob CLI for the current repository by installing a local " +
  "prepare-commit-msg git hook. This hook delegates to the global " +
  "prepare-commit-msg hook configured by setupGitMob tool. Use this tool " +
  "only if your repository overrides the core.hooksPath git " +
  "configuration (e.g., when using Husky). Note: You must run " +
  "setupGitMob tool at least once before using this tool.";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "Setup Git Mob Locally",
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: false,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const { ok, value } = await setupLocal();
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
