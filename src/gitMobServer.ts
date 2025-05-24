import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer(
  {
    name: "Git Mob",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: { listChanged: false, subscribe: false },
      resources: { listChanged: false, subscribe: false },
    },
  },
);

export { server };
