import { setup } from "../clients/gitMobClient.js";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/index.js";

const name = "setup_git_mob";

const description =
  "Configures the Git Mob CLI globally for all repositories on your system. This one-time " +
  "setup installs a global prepare-commit-msg git hook, which automatically appends " +
  "Co-authored-by trailers to commit messages during mob or pairing sessions. If a repository " +
  "overrides the core.hooksPath git configuration (e.g., when using Husky), the " +
  "setupGitMobLocally tool needs to be invoked in addition to this. " +
  "If Git Mob isn't working as expected, ask the user if they have completed this initial setup.";

const inputSchema = {};

const annotations: ToolAnnotations = {
  title: "Setup Git Mob",
  readOnlyHint: false,
  destructiveHint: true,
  idempotentHint: false,
  openWorldHint: false,
};

const callback: ToolCallback<typeof inputSchema> = async () => {
  const { ok, value } = await setup();
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
