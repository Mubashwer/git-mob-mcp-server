import { describe, it, expect, jest } from "@jest/globals";
import { registerGitMobResourceTemplate } from "./registerGitMobResourceTemplate.js";
import type { GitMobResourceTemplate } from "../types/GitMobResourceTemplate.js";
import type {
  McpServer,
  ReadResourceTemplateCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[helpers] registerGitMobResourceTemplate", () => {
  it("should register given git mob resource template with the given server", () => {
    const mockServer = {
      resource: jest.fn(),
    } as Partial<McpServer> as McpServer;

    const name = "test_resource";
    const template = new ResourceTemplate("gitmob://test-resource", {
      list: undefined,
    });
    const metadata: ResourceMetadata = {
      description: "This is a test resource for testing purposes.",
      mimeType: "text/plain",
    };
    const readCallback: ReadResourceTemplateCallback = async (uri) => {
      return {
        contents: [
          {
            uri: uri.href,
            text: "hello world",
          },
        ],
      };
    };
    const testResourceTemplate: GitMobResourceTemplate = {
      name,
      template,
      metadata,
      readCallback,
    };

    registerGitMobResourceTemplate(mockServer, testResourceTemplate);

    expect(mockServer.resource).toHaveBeenCalledWith(
      testResourceTemplate.name,
      testResourceTemplate.template,
      testResourceTemplate.metadata,
      testResourceTemplate.readCallback,
    );
  });
});
