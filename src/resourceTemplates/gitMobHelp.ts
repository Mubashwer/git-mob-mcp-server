import {
  ResourceTemplate,
  type ReadResourceTemplateCallback,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { getHelp } from "../clients/gitMobClient.js";
import { UriTemplate } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";
import type { GitMobResourceTemplate } from "../types/GitMobResourceTemplate.js";

const name = "git_mob_help";

const template = new ResourceTemplate(
  new UriTemplate("gitmob://help{?command}"),
  {
    list: undefined,
    complete: {
      command: () => ["setup", "coauthor", "help"],
    },
  },
);

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
  const { ok, value } = await getHelp(command);
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

const resource: GitMobResourceTemplate = {
  name,
  template,
  metadata,
  readCallback,
};

export default resource;
