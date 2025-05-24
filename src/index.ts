import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./gitMobServer.js";
import "./resources/index.js"; // register all resources to the server
import "./tools/index.js"; // register all tools to the server

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
