import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

server.resource(
  "mobSessionCoauthors",
  new ResourceTemplate("gitmob://mob-session-coauthors", { list: undefined }),
  {
    description:
      "Lists all coauthors currently included in the active mob or pairing session. " +
      "If Git Mob is setup, these coauthors will be automatically added as " +
      "Co-authored-by trailers to the commit's message when making commits during the session.",
    mimeType: "text/plain",
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
