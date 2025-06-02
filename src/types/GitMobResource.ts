import type {
  ResourceMetadata,
  ReadResourceCallback,
} from "@modelcontextprotocol/sdk/server/mcp";

export interface GitMobResource {
  name: string;
  uri: string;
  metadata: ResourceMetadata;
  readCallback: ReadResourceCallback;
}
