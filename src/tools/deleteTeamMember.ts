import { z } from "zod";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

server.tool(
  "deleteTeamMember",
  "Deletes a team member by their key. " +
    "User can only delete a team member they have added previously. " +
    "If user did not specify a key, show them list of existing team members and ask them to select one.",
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
