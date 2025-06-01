import resource from "./gitMobHelp.js";
import { describe, it, expect } from "@jest/globals";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[resources] gitMobHelp", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("git_mob_help");
  });

  it("should have correct template", () => {
    const template: ResourceTemplate = new ResourceTemplate(
      "gitmob://help{?command}",
      {
        list: undefined,
        complete: {
          command: () => ["setup", "coauthor", "help"],
        },
      },
    );
    expect(resource.template.uriTemplate).toEqual(template.uriTemplate);
    expect(resource.template.listCallback).toEqual(template.listCallback);
    expect(resource.template.completeCallback).toEqual(
      template.completeCallback,
    );
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description:
        "Displays general help and usage information for the Git Mob CLI. " +
        "You can optionally provide a command ('setup', 'coauthor', or 'help') " +
        "to get detailed help for that specific command.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });
});
