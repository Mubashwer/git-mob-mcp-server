import {
  type ReadResourceCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { listMobSessionCoauthors } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "mob_session_coauthors";

const uri = "gitmob://mob-session-coauthors";

const metadata: ResourceMetadata = {
  description:
    "List of all coauthors currently included in the active mob or pairing session. " +
    "If Git Mob is setup, these coauthors will be automatically added as " +
    "Co-authored-by trailers to the commit's message when making commits during the session.",
  mimeType: "text/plain",
};

const readCallback: ReadResourceCallback = async (uri) => {
  const { ok, value } = await listMobSessionCoauthors();
  if (!ok) {
    return {
      isError: true,
      contents: [
        {
          uri: uri.href,
          text: value,
        },
      ],
    };
  }
  const lines = value.split("\n").filter((line) => line.trim() !== "");
  return {
    contents: lines.map((line) => ({
      uri: uri.href,
      text: line,
    })),
  };
};

const resource: GitMobResource = {
  name,
  uri,
  metadata,
  readCallback,
};

export default resource;
