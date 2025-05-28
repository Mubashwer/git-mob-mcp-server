import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createGitMobServer } from "./gitMobServerFactory.js";

(async () => {
  const server = createGitMobServer();
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
})();
