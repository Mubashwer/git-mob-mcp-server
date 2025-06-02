import {
  type ReadResourceCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { getVersion } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "git_mob_version";

const uri = "gitmob://version";

const metadata: ResourceMetadata = {
  description: "The installed version of the Git Mob CLI.",
  mimeType: "text/plain",
};

const readCallback: ReadResourceCallback = async (uri) => {
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
  uri,
  metadata,
  readCallback,
};

export default resource;
