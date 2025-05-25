import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as tools from "./tools/index.js";
import * as resources from "./resources/index.js";
import {
  registerGitMobTool,
  registerGitMobResource,
  registerGtMobResourceAsTool,
} from "./helpers/index.js";
import { version } from "../package.json";

const server = new McpServer(
  {
    name: "Git Mob",
    version,
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

// Currently, Github Copilot does not support resources in MCP Server,
// so we register them as tools as well
registerGtMobResourceAsTool(server, resources.gitMobVersion);
registerGtMobResourceAsTool(server, resources.gitMobHelp);
registerGtMobResourceAsTool(server, resources.teamMembers);
registerGtMobResourceAsTool(server, resources.mobSessionCoauthors);
registerGtMobResourceAsTool(server, resources.mobSessionCoauthorTrailers);

registerGitMobTool(server, tools.addTeamMember);
registerGitMobTool(server, tools.deleteTeamMember);
registerGitMobTool(server, tools.setMobSessionCoauthors);
registerGitMobTool(server, tools.clearMobSession);

export { server };
