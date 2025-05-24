import { z } from "zod";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
