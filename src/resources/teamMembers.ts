import {
  type ReadResourceCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { listCoauthors } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "team_members";

const uri = "gitmob://team-members";

const metadata: ResourceMetadata = {
  description:
    "List of all the team members that have been added to Git Mob. " +
    "The team members can then be used in pairing / mobbing sessions as coauthors." +
    "Each entry is formatted as: <key> <name> <email>." +
    "Ask the user which team member(s) they want to pair or mob with.",
  mimeType: "text/plain",
};
const readCallback: ReadResourceCallback = async (uri) => {
  const { ok, value } = await listCoauthors();
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
  const lines = (value || "").split("\n").filter((line) => line.trim() !== "");
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
