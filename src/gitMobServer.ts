import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import {
  addTeamMember,
  deleteTeamMember,
  setMobSessionCoauthors,
  clearMobSession,
} from "./tools/index.js";
import { registerGitMobTool } from "./helpers/registerGitMobTool.js";

const server = new McpServer(
  {
    name: "Git Mob",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
);

registerGitMobTool(server, addTeamMember);
registerGitMobTool(server, deleteTeamMember);
registerGitMobTool(server, setMobSessionCoauthors);
registerGitMobTool(server, clearMobSession);

export { server };
