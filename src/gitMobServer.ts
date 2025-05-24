import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
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
    description:
      "A list of all the team members that has been added to Git Mob. " +
      "The team members can then be used in pairing / mobbing sessions as coauthors." +
      "Each entry is formatted as: <key> <name> <email>",
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
  "Adds a new team member using their key, name, and email. " +
    "This member can then be used in a pairing or mobbing sessions as a cauthor. " +
    "The first name is a good choice for the key." +
    "Ask user if they want mob or pair with this team member.",
  {
    key: z.string(),
    name: z.string(),
    email: z.string(),
  },
  {
    title: "Add Team Member",
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
  "Deletes a team member by their key.",
  {
    key: z.string(),
  },
  {
    title: "Delete Team Member",
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

// =====================
// Mob Session
// =====================
server.resource(
  "mobSessionCoauthors",
  new ResourceTemplate("gitmob://mob-session-coauthors", { list: undefined }),
  {
    description:
      "Lists all coauthors currently included in the active mob or pairing session. " +
      "If Git Mob is setup, these coauthors will be automatically added as " +
      "Co-authored-by trailers to the commit's message when making commits during the session.",
  },
  async (uri) => {
    const result = await gitMobClient.listMobSessionCoauthors();
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
server.resource(
  "mobSessionCoauthorTrailers",
  new ResourceTemplate("gitmob://mob-session-coauthor-trailers", {
    list: undefined,
  }),
  {
    description:
      "Lists the git Co-authored-by trailers for the coauthors " +
      "currently included in the active mob or pairing session. " +
      "If Git Mob is setup, these Co-authored-by trailers will be automatically " +
      "added to the commit's message when making commits during the session.",
    mimeType: "text/plain",
  },
  async (uri) => {
    const result = await gitMobClient.listMobSessionCoauthorTrailers();
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
  "setMobSessionCoauthorsUsingTeamMembers",
  "Sets the active pairing or mob session by specifying the " +
    "keys of the team members to include as coauthors. " +
    "If Git Mob is setup, these coauthors will be automatically added as " +
    "Co-authored-by trailers to the commit's message when making commits during the session.",
  {
    coauthorKeys: z.array(z.string()).min(1),
  },
  {
    title: "Set Mob or Pairing Session Coauthors using Team Members",
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  async ({ coauthorKeys }) => {
    const result = await gitMobClient.setMobSession(coauthorKeys);
    return { content: [{ type: "text", text: result }] };
  },
);
server.tool(
  "clearMobSessionCoauthors",
  "Clears the active mob or pairing session.",
  {
    title: "Clear Mob Session Coauthors",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  async () => {
    const result = await gitMobClient.clearMobSession();
    return { content: [{ type: "text", text: result }] };
  },
);

// =====================
// System/Meta
// =====================
server.resource(
  "gitMobVersion",
  new ResourceTemplate("gitmob://version", { list: undefined }),
  {
    description: "The installed version of the Git Mob CLI.",
    mimeType: "text/plain",
  },
  async (uri) => {
    const result = await gitMobClient.getVersion();
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
server.resource(
  "gitMobHelp",
  new ResourceTemplate("gitmob://help", { list: undefined }),
  {
    description:
      "Displays general help and usage information for the Git Mob CLI. " +
      "You can optionally provide a command ('setup', 'coauthor', or 'help') " +
      "to get detailed help for that specific command.",
    mimeType: "text/plain",
  },
  async (uri, { command }: { command?: "setup" | "coauthor" | "help" }) => {
    const result = await gitMobClient.getHelp(command);
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

export { server };
