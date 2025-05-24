import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
