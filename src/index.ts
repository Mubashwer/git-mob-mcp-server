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

// =====================
// Team Members
// =====================
server.resource(
  "teamMembers",
  new ResourceTemplate("gitmob://team-members", { list: undefined }),
  {
    title: "Team Members",
    description:
      "A list of all the team members that has been added to Git Mob. " +
      "The team members can then be used in pairing / mobbing sessions as coauthors." +
      "Each entry is formatted as: <key> <name> <email>",
    readOnlyHint: true,
  },
  async (uri) => {
    const result = await gitMobClient.listCoauthors();
    return {
      contents: [
        {
          uri: uri.href,
          text: result,
        },
      ],
    };
  },
);
server.tool(
  "addTeamMember",
  {
    key: z.string(),
    name: z.string(),
    email: z.string(),
    title: "Add Team Member",
    description:
      "Adds a new team member using their key, name, and email. " +
      "This member then be used in a pairing / mobbing sessions as a cauthor. " +
      "The first name is a good choice for the key.",
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
server.tool(
  "deleteTeamMember",
  {
    key: z.string(),
    title: "Delete Team Member",
    description: "Deletes a team member by their key.",
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  async ({ key }) => {
    const result = await gitMobClient.deleteCoauthor(key);
    return { content: [{ type: "text", text: result }] };
  },
);
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
