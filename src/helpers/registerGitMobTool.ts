import type { ZodRawShape } from "zod";
import type { GitMobTool } from "../types/index.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export const registerGitMobTool = <
  InputArgs extends ZodRawShape,
  OutputArgs extends ZodRawShape,
>(
  server: McpServer,
  tool: GitMobTool<InputArgs, OutputArgs>,
) => {
  const {
    name,
    description,
    inputSchema,
    outputSchema,
    annotations,
    callback,
  } = tool;
  server.registerTool(
    name,
    {
      description,
      inputSchema,
      outputSchema,
      annotations,
    },
    callback,
  );
};
