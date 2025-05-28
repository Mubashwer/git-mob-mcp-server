import resource from "./teamMembers";
import { describe, it, expect } from "@jest/globals";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[resources] teamMembers", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("team_members");
  });

  it("should have correct template", () => {
    const template: ResourceTemplate = new ResourceTemplate(
      "gitmob://team-members",
      { list: undefined },
    );
    expect(resource.template).toEqual(template);
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description:
        "List of all the team members that has been added to Git Mob. " +
        "The team members can then be used in pairing / mobbing sessions as coauthors." +
        "Each entry is formatted as: <key> <name> <email>." +
        "Ask the user which team member(s) they want to pair or mob with.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });
});
