import { describe, it, expect, jest } from "@jest/globals";
import { registerGtMobResourceAsTool } from "./registerGitMobResourceAsTool";
import type { GitMobResource } from "../types/GitMobResource.js";
import {
  ResourceTemplate,
  type ResourceMetadata,
  type ReadResourceTemplateCallback,
  type McpServer,
  type ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import type {
  ServerRequest,
  ServerNotification,
} from "@modelcontextprotocol/sdk/types";

describe("[helpers] registerGtMobResourceAsTool", () => {
  const RESOURCE_CALLBACK_CONTENT = "hello world";

  const arrangeMockServerAndTestResource = () => {
    const mockServer = {
      registerTool: jest.fn(),
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
            text: RESOURCE_CALLBACK_CONTENT,
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
    return { mockServer, testResource };
  };

  it("should register a resource as a tool with the given server", async () => {
    const { mockServer, testResource } = arrangeMockServerAndTestResource();

    registerGtMobResourceAsTool(mockServer, testResource);

    expect(mockServer.registerTool).toHaveBeenCalledWith(
      `get_${testResource.name}`,
      {
        description: String(testResource.metadata.description),
        inputSchema: {},
        annotations: {
          title: `get_${testResource.name}`,
          readOnlyHint: true,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      expect.any(Function),
    );
  });

  it("should have registered tool callback return the resource callback content when invoked", async () => {
    const { mockServer, testResource } = arrangeMockServerAndTestResource();
    const readCallBackSpy = jest.spyOn(testResource, "readCallback");

    registerGtMobResourceAsTool(mockServer, testResource);

    const toolCallback = (mockServer.registerTool as jest.Mock).mock
      .calls[0][2] as ToolCallback<Record<string, never>>;

    const result = await toolCallback(
      {},
      {} as RequestHandlerExtra<ServerRequest, ServerNotification>,
    );

    expect(readCallBackSpy).toHaveBeenCalled();
    expect(result).toEqual({
      content: [{ type: "text", text: RESOURCE_CALLBACK_CONTENT }],
    });
  });
});
