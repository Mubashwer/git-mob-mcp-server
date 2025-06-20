import type { GitMobResource } from "../types/index.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export const registerGitMobResource = (
  server: McpServer,
  resource: GitMobResource,
) => {
  const { name, uri, metadata, readCallback } = resource;
  server.resource(name, uri, metadata, readCallback);
};
