import type { GitMobResource } from "../types/GitMobResource";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export const registerGitMobResource = (
  server: McpServer,
  resource: GitMobResource,
) => {
  const { name, template, metadata, readCallback } = resource;
  server.resource(name, template, metadata, readCallback);
};
