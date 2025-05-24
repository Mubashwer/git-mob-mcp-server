import { z } from "zod";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
