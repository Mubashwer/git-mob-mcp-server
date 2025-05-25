import {
  ResourceTemplate,
  type ReadResourceTemplateCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "git_mob_version";

const template = new ResourceTemplate("gitmob://version", { list: undefined });

const metadata: ResourceMetadata = {
  description: "The installed version of the Git Mob CLI.",
  mimeType: "text/plain",
};

const readCallback: ReadResourceTemplateCallback = async (uri) => {
  const result = await gitMobClient.getVersion();
  return {
    contents: [
      {
        uri: uri.href,
        text: result,
      },
    ],
  };
};

const resource: GitMobResource = {
  name,
  template,
  metadata,
  readCallback,
};

export default resource;
