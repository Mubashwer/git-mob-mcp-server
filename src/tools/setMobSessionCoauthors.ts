import { z } from "zod";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
