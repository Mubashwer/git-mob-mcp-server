import {
  ResourceTemplate,
  type ReadResourceTemplateCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { getVersion } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "git_mob_version";

const template = new ResourceTemplate("gitmob://version", { list: undefined });

const metadata: ResourceMetadata = {
  description: "The installed version of the Git Mob CLI.",
  mimeType: "text/plain",
};

const readCallback: ReadResourceTemplateCallback = async (uri) => {
  const { ok, value } = await getVersion();
  return {
    isError: !ok,
    contents: [
      {
        uri: uri.href,
        text: value,
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
