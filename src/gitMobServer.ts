import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as tools from "./tools/index.js";
import * as resources from "./resources/index.js";
import { registerGitMobTool } from "./helpers/registerGitMobTool.js";
import { registerGitMobResource } from "./helpers/registerGitMobResource.js";

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

registerGitMobResource(server, resources.gitMobVersion);
registerGitMobResource(server, resources.gitMobHelp);
registerGitMobResource(server, resources.teamMembers);
registerGitMobResource(server, resources.mobSessionCoauthors);
registerGitMobResource(server, resources.mobSessionCoauthorTrailers);

registerGitMobTool(server, tools.addTeamMember);
registerGitMobTool(server, tools.deleteTeamMember);
registerGitMobTool(server, tools.setMobSessionCoauthors);
registerGitMobTool(server, tools.clearMobSession);

export { server };
