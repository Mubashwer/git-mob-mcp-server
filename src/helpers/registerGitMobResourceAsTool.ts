import type {
  ServerNotification,
  ServerRequest,
  ToolAnnotations,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types";
import type { GitMobResource } from "../types/GitMobResource";
import type {
  McpServer,
  ToolCallback,
} from "@modelcontextprotocol/sdk/server/mcp";
import { URL } from "node:url";
import type { Variables } from "@modelcontextprotocol/sdk/shared/uriTemplate";
import type { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";

export const registerGtMobResourceAsTool = (
  server: McpServer,
  resource: GitMobResource,
) => {
  const { name, uri, metadata, readCallback } = resource;

  const toolName = `get_${name}`;

  const annotations: ToolAnnotations = {
    title: toolName,
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };

  const toolCallback: ToolCallback<Record<string, never>> = async (
    _args: Variables,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ) => {
    const resourceResult = await readCallback(new URL(uri), extra);
    const toolResult: CallToolResult = {
      content: resourceResult.contents
        .filter((content) => typeof content.text === "string")
        .map((content) => ({
          type: "text",
          text: content.text as string,
        })),
    };

    return toolResult;
  };

  server.registerTool(
    toolName,
    {
      description: String(metadata.description),
      inputSchema: {},
      annotations,
    },
    toolCallback,
  );
};
