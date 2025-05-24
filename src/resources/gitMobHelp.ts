import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import { server } from "../gitMobServer.js";

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
