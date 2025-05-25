import type {
  ServerNotification,
  ServerRequest,
  ToolAnnotations,
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
  const { name, template, metadata, readCallback } = resource;

  const toolName = `get_${name}`;

  const annotations: ToolAnnotations = {
    title: toolName,
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  };

  const toolCallback: ToolCallback<Record<string, never>> = async (
    args: Variables,
    extra: RequestHandlerExtra<ServerRequest, ServerNotification>,
  ) => {
    const result = await readCallback(
      new URL(template.uriTemplate),
      args,
      extra,
    );
    const text = result.contents
      .map((content) => (typeof content.text === "string" ? content.text : ""))
      .join("\n");
    return { content: [{ type: "text", text }] };
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
