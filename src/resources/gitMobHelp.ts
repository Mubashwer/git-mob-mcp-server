import {
  ResourceTemplate,
  type ReadResourceTemplateCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { gitMobClient } from "../clients/gitMobClient.js";
import type { GitMobResource } from "../types/GitMobResource.js";

const name = "gitMobHelp";

const template = new ResourceTemplate("gitmob://help", { list: undefined });

const metadata: ResourceMetadata = {
  description:
    "Displays general help and usage information for the Git Mob CLI. " +
    "You can optionally provide a command ('setup', 'coauthor', or 'help') " +
    "to get detailed help for that specific command.",
  mimeType: "text/plain",
};

const readCallback: ReadResourceTemplateCallback = async (
  uri,
  { command }: { command?: "setup" | "coauthor" | "help" },
) => {
  const result = await gitMobClient.getHelp(command);
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
