import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types";
import type { ZodRawShape } from "zod";

export interface GitMobTool<
  InputArgs extends ZodRawShape,
  OutputArgs extends ZodRawShape,
> {
  name: string;
  description?: string;
  inputSchema?: InputArgs;
  outputSchema?: OutputArgs;
  annotations?: ToolAnnotations;
  callback: ToolCallback<InputArgs>;
}
