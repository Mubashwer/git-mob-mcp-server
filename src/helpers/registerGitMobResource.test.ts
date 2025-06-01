import { describe, it, expect, jest } from "@jest/globals";
import { registerGitMobResource } from "./registerGitMobResource.js";
import type { GitMobResource } from "../types/GitMobResource.js";
import type {
  McpServer,
  ReadResourceTemplateCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[helpers] registerGitMobResource", () => {
  it("should register given git mob resource with the given server", () => {
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
    const testResource: GitMobResource = {
      name,
      template,
      metadata,
      readCallback,
    };

    registerGitMobResource(mockServer, testResource);

    expect(mockServer.resource).toHaveBeenCalledWith(
      testResource.name,
      testResource.template,
      testResource.metadata,
      testResource.readCallback,
    );
  });
});
