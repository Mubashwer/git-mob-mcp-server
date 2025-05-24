import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
