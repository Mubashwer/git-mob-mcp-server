import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import * as tools from "./tools/index.js";
import * as resources from "./resources/index.js";
import * as resourceTemplates from "./resourceTemplates/index.js";
import {
  registerGitMobTool,
  registerGitMobResource,
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

  registerGitMobTool(server, tools.getGitMobHelp);
  registerGitMobTool(server, tools.setupGitMobGlobally);
  registerGitMobTool(server, tools.setupGitMobLocally);
  registerGitMobTool(server, tools.addTeamMember);
  registerGitMobTool(server, tools.deleteTeamMember);
  registerGitMobTool(server, tools.listTeamMembers);
  registerGitMobTool(server, tools.setMobSessionCoauthors);
  registerGitMobTool(server, tools.clearMobSession);
  registerGitMobTool(server, tools.listMobSessionCoauthors);
  registerGitMobTool(server, tools.listMobSessionCoauthorTrailers);

  return server;
};
