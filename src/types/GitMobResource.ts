import type {
  ResourceMetadata,
  ResourceTemplate,
  ReadResourceTemplateCallback,
} from "@modelcontextprotocol/sdk/server/mcp";

export interface GitMobResource {
  name: string;
  template: ResourceTemplate;
  metadata: ResourceMetadata;
  readCallback: ReadResourceTemplateCallback;
}
