import { gitMobClient } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

const name = "setup_git_mob_globally";

const description =
  "Configures the Git Mob CLI globally for all repositories on your system. " +
  "This one-time setup installs a global prepare-commit-msg git hook, which automatically " +
  "appends Co-authored-by trailers to commit messages during mob or pairing sessions. " +
  "If a repository overrides the core.hooksPath git configuration (e.g., when using " +
  "Husky), the setupGitMobLocally tool needs to be invoked in addition to this. ";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "Setup Git Mob Globally",
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: false,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const result = await gitMobClient.setupGlobal();
  return {
    content: [{ type: "text", text: result }],
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
