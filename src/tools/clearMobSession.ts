import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
