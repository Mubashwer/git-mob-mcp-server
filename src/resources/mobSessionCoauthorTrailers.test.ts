import resource from "./mobSessionCoauthorTrailers";
import { describe, it, expect } from "@jest/globals";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";

describe("[resources] mobSessionCoauthorTrailers", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("mob_session_coauthors");
  });

  it("should have correct template", () => {
    const template: ResourceTemplate = new ResourceTemplate(
      "gitmob://mob-session-coauthor-trailers",
      { list: undefined },
    );
    expect(resource.template).toEqual(template);
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description:
        "List of the git Co-authored-by trailers for the coauthors " +
        "currently included in the active mob or pairing session. " +
        "If Git Mob is setup, these Co-authored-by trailers will be automatically " +
        "added to the commit's message when making commits during the session.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });
});
