import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

server.resource(
  "teamMembers",
  new ResourceTemplate("gitmob://team-members", { list: undefined }),
  {
    description:
      "A list of all the team members that has been added to Git Mob. " +
      "The team members can then be used in pairing / mobbing sessions as coauthors." +
      "Each entry is formatted as: <key> <name> <email>",
    mimeType: "text/plain",
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
