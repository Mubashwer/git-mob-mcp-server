import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "Git Mob",
  version: "1.0.0",
});

export { server };
