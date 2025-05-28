import { describe, it, expect, jest, beforeAll } from "@jest/globals";
import * as helpers from "./helpers/index.js";
import * as resources from "./resources/index.js";
import * as tools from "./tools/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

jest.mock("./helpers/index.js", () => ({
  registerGitMobTool: jest.fn(),
  registerGitMobResource: jest.fn(),
  registerGtMobResourceAsTool: jest.fn(),
}));
jest.mock("@modelcontextprotocol/sdk/server/mcp.js", () => {
  const actual = jest.requireActual("@modelcontextprotocol/sdk/server/mcp.js");
  return {
    ...(actual as object),
    McpServer: jest.fn().mockImplementation((meta, opts) => ({ meta, opts })),
  };
});
jest.mock("../package.json", () => ({ version: "1.2.3" }), { virtual: true });

describe("gitMobServer", () => {
  let server: McpServer;
  const mockServer = McpServer as jest.MockedClass<typeof McpServer>;

  beforeAll(async () => {
    const serverModule = await import("./gitMobServer.js");
    server = serverModule.server;
  });

  it("should create an instance of McpServer for Git Mob", () => {
    expect(mockServer).toHaveBeenCalledWith(
      { name: "Git Mob", version: "1.2.3" },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      },
    );
  });

  it("should register all resources", async () => {
    const { registerGitMobResource } = helpers;

    expect(registerGitMobResource).toHaveBeenCalledWith(
      server,
      resources.gitMobVersion,
    );
    expect(registerGitMobResource).toHaveBeenCalledWith(
      server,
      resources.gitMobHelp,
    );
    expect(registerGitMobResource).toHaveBeenCalledWith(
      server,
      resources.teamMembers,
    );
    expect(registerGitMobResource).toHaveBeenCalledWith(
      server,
      resources.mobSessionCoauthors,
    );
    expect(registerGitMobResource).toHaveBeenCalledWith(
      server,
      resources.mobSessionCoauthorTrailers,
    );
  });

  it("should register all resources as tools", async () => {
    const { registerGtMobResourceAsTool } = helpers;

    expect(registerGtMobResourceAsTool).toHaveBeenCalledWith(
      server,
      resources.gitMobVersion,
    );
    expect(registerGtMobResourceAsTool).toHaveBeenCalledWith(
      server,
      resources.gitMobHelp,
    );
    expect(registerGtMobResourceAsTool).toHaveBeenCalledWith(
      server,
      resources.teamMembers,
    );
    expect(registerGtMobResourceAsTool).toHaveBeenCalledWith(
      server,
      resources.mobSessionCoauthors,
    );
    expect(registerGtMobResourceAsTool).toHaveBeenCalledWith(
      server,
      resources.mobSessionCoauthorTrailers,
    );
  });

  it("should register all tools", async () => {
    const { registerGitMobTool } = helpers;

    expect(registerGitMobTool).toHaveBeenCalledWith(
      server,
      tools.setupGitMobGlobally,
    );
    expect(registerGitMobTool).toHaveBeenCalledWith(
      server,
      tools.setupGitMobLocally,
    );
    expect(registerGitMobTool).toHaveBeenCalledWith(
      server,
      tools.addTeamMember,
    );
    expect(registerGitMobTool).toHaveBeenCalledWith(
      server,
      tools.deleteTeamMember,
    );
    expect(registerGitMobTool).toHaveBeenCalledWith(
      server,
      tools.setMobSessionCoauthors,
    );
    expect(registerGitMobTool).toHaveBeenCalledWith(
      server,
      tools.clearMobSession,
    );
  });
});
