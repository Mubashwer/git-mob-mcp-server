import resource from "./gitMobVersion.js";
import { describe, it, expect } from "@jest/globals";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[resources] gitMobVersion", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("git_mob_version");
  });

  it("should have correct template", () => {
    const template: ResourceTemplate = new ResourceTemplate(
      "gitmob://version",
      { list: undefined },
    );
    expect(resource.template).toEqual(template);
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description: "The installed version of the Git Mob CLI.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });
});
