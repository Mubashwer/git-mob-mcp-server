import { describe, it, expect, jest } from "@jest/globals";
import { registerGtMobResourceAsTool } from "./registerGitMobResourceAsTool.js";
import type { GitMobResource } from "../types/GitMobResource.js";
import {
  type ResourceMetadata,
  type ReadResourceTemplateCallback,
  type McpServer,
  type ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol.js";
import type {
  ServerRequest,
  ServerNotification,
} from "@modelcontextprotocol/sdk/types.js";

describe("[helpers] registerGtMobResourceAsTool", () => {
  const arrangeMockServerAndTestResource = (textContents: string[]) => {
    const mockServer = {
      registerTool: jest.fn(),
    } as Partial<McpServer> as McpServer;

    const name = "test_resource";
    const uri = "gitmob://test-resource";
    const metadata: ResourceMetadata = {
      description: "This is a test resource for testing purposes.",
      mimeType: "text/plain",
    };
    const readCallback: ReadResourceTemplateCallback = async (uri) => {
      return {
        contents: textContents.map((text) => ({
          uri: uri.href,
          text,
        })),
      };
    };
    const testResource: GitMobResource = {
      name,
      uri,
      metadata,
      readCallback,
    };
    return { mockServer, testResource };
  };

  it("should register a resource as a tool with the given server", async () => {
    const { mockServer, testResource } = arrangeMockServerAndTestResource([
      "foo",
    ]);

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

  describe("tool callback", () => {
    it("should return the resource callback content", async () => {
      const { mockServer, testResource } = arrangeMockServerAndTestResource([
        "foo",
        "bar",
      ]);
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
        content: [
          { type: "text", text: "foo" },
          { type: "text", text: "bar" },
        ],
      });
    });

    it("should handle undefined text content in resource callback", async () => {
      const { mockServer, testResource } = arrangeMockServerAndTestResource([
        // @ts-expect-error testing for undefined text content
        undefined,
        "bar",
      ]);

      registerGtMobResourceAsTool(mockServer, testResource);

      const toolCallback = (mockServer.registerTool as jest.Mock).mock
        .calls[0][2] as ToolCallback<Record<string, never>>;

      const result = await toolCallback(
        {},
        {} as RequestHandlerExtra<ServerRequest, ServerNotification>,
      );

      expect(result).toEqual({
        content: [{ type: "text", text: "bar" }],
      });
    });
  });
});
