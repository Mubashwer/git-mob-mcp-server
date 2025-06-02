import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as tools from "./tools/index.js";
import * as resources from "./resources/index.js";
import * as resourceTemplates from "./resourceTemplates/index.js";
import {
  registerGitMobTool,
  registerGitMobResource,
  registerGtMobResourceAsTool,
  registerGitMobResourceTemplate,
} from "./helpers/index.js";

export const createGitMobServer = () => {
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

  registerGitMobResourceTemplate(server, resourceTemplates.gitMobHelp);

  registerGitMobResource(server, resources.gitMobVersion);
  registerGitMobResource(server, resources.teamMembers);
  registerGitMobResource(server, resources.mobSessionCoauthors);
  registerGitMobResource(server, resources.mobSessionCoauthorTrailers);

  // Currently, Github Copilot does not support dynamic resources in MCP Server,
  // so we register them as tools as well
  registerGtMobResourceAsTool(server, resources.gitMobVersion);
  registerGtMobResourceAsTool(server, resources.teamMembers);
  registerGtMobResourceAsTool(server, resources.mobSessionCoauthors);
  registerGtMobResourceAsTool(server, resources.mobSessionCoauthorTrailers);

  registerGitMobTool(server, tools.setupGitMobGlobally);
  registerGitMobTool(server, tools.setupGitMobLocally);
  registerGitMobTool(server, tools.addTeamMember);
  registerGitMobTool(server, tools.deleteTeamMember);
  registerGitMobTool(server, tools.setMobSessionCoauthors);
  registerGitMobTool(server, tools.clearMobSession);
  registerGitMobTool(server, tools.getGitMobHelp);

  return server;
};
