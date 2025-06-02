import {
  type ReadResourceCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { listMobSessionCoauthorTrailers } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "mob_session_coauthor_trailers";

const uri = "gitmob://mob-session-coauthor-trailers";

const metadata: ResourceMetadata = {
  description:
    "List of the git Co-authored-by trailers for the coauthors " +
    "currently included in the active mob or pairing session. " +
    "If Git Mob is setup, these Co-authored-by trailers will be automatically " +
    "added to the commit's message when making commits during the session.",
  mimeType: "text/plain",
};

const readCallback: ReadResourceCallback = async (uri) => {
  const { ok, value } = await listMobSessionCoauthorTrailers();
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
