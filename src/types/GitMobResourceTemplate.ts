import type {
  ResourceMetadata,
  ReadResourceTemplateCallback,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp";

export interface GitMobResourceTemplate {
  name: string;
  template: ResourceTemplate;
  metadata: ResourceMetadata;
  readCallback: ReadResourceTemplateCallback;
}
