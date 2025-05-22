import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { GitMobClient } from "./gitMobClient.js";

// Create an MCP server
const server = new McpServer({
  name: "Git Mob",
  version: "1.0.0",
});

const gitMobClient = new GitMobClient();

server.tool(
  "addTeamMember",
  {
    key: z.string(),
    name: z.string(),
    email: z.string(),
    title: "Add Team Member",
    description:
      "Adds a new team member using their key, name, and email. " +
      "This member then be used in a pairing / mobbing session. " +
      "The key is usually the first name.",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: false,
  },
  async ({ key, name, email }) => {
    const result = await gitMobClient.addCoauthor(key, name, email);
    return {
      content: [{ type: "text", text: result }],
    };
  },
);

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Ciao, ${name}!`,
      },
    ],
  }),
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("Server started");
