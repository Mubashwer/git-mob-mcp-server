import type { GitMobResourceTemplate } from "../types/index.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export const registerGitMobResourceTemplate = (
  server: McpServer,
  resource: GitMobResourceTemplate,
) => {
  const { name, template, metadata, readCallback } = resource;
  server.resource(name, template, metadata, readCallback);
};
