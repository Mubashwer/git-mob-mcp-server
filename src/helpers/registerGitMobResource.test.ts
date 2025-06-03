import { describe, it, expect, jest } from "@jest/globals";
import { registerGitMobResource } from "./registerGitMobResource.js";
import type { GitMobResource } from "../types/index.js";
import type {
  McpServer,
  ReadResourceCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { type ResourceMetadata } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[helpers] registerGitMobResource", () => {
  it("should register given git mob resource with the given server", () => {
    const mockServer = {
      resource: jest.fn(),
    } as Partial<McpServer> as McpServer;

    const name = "test_resource";
    const uri = "gitmob://test-resource";
    const metadata: ResourceMetadata = {
      description: "This is a test resource for testing purposes.",
      mimeType: "text/plain",
    };
    const readCallback: ReadResourceCallback = async (uri) => {
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
      uri,
      metadata,
      readCallback,
    };

    registerGitMobResource(mockServer, testResource);

    expect(mockServer.resource).toHaveBeenCalledWith(
      testResource.name,
      testResource.uri,
      testResource.metadata,
      testResource.readCallback,
    );
  });
});
