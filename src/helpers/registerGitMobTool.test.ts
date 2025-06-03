import { describe, it, expect, jest } from "@jest/globals";
import { registerGitMobTool } from "./registerGitMobTool.js";
import { z } from "zod";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type {
  McpServer,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GitMobTool } from "../types/GitMobTool.js";

describe("[helpers] registerGitMobTool", () => {
  it("should register given git mob tool with the given server", () => {
    const mockServer = {
      registerTool: jest.fn(),
    } as Partial<McpServer> as McpServer;

    const name = "test_tool";
    const description = "This is a tool for testing purposes.";
    const inputSchema = {
      foo: z.string(),
      bar: z.string(),
    };
    const annotations: ToolAnnotations = {
      title: "Test me",
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    };
    const callback: ToolCallback<typeof inputSchema> = async ({ foo, bar }) => {
      return { content: [{ type: "text", text: foo + bar }] };
    };

    const testTool: GitMobTool<typeof inputSchema, Record<string, never>> = {
      name,
      description,
      inputSchema,
      annotations,
      callback,
    };

    registerGitMobTool(mockServer, testTool);

    expect(mockServer.registerTool).toHaveBeenCalledWith(
      testTool.name,
      {
        description: testTool.description,
        inputSchema: testTool.inputSchema,
        outputSchema: testTool.outputSchema,
        annotations: testTool.annotations,
      },
      testTool.callback,
    );
  });
});
