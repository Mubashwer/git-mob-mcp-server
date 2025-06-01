import resource from "./teamMembers.js";
import { describe, it, expect } from "@jest/globals";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { listCoauthors } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  listCoauthors: jest.fn(),
}));
const mockListCoauthors = listCoauthors as jest.Mock;

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
        "List of all the team members that have been added to Git Mob. " +
        "The team members can then be used in pairing / mobbing sessions as coauthors." +
        "Each entry is formatted as: <key> <name> <email>." +
        "Ask the user which team member(s) they want to pair or mob with.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });

  describe("resource callback", () => {
    it("should successfully list team members and return success response", async () => {
      const teamMembersText =
        "leo Leo Messi <leo@example.com>\neric Eric Abidal <eric@example.com>";

      const uri = new URL("gitmob://team-members");
      mockListCoauthors.mockResolvedValueOnce({
        ok: true,
        value: teamMembersText,
      });

      const result = await resource.readCallback(uri);

      expect(listCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        contents: [
          {
            uri: uri.href,
            text: "leo Leo Messi <leo@example.com>",
          },
          {
            uri: uri.href,
            text: "eric Eric Abidal <eric@example.com>",
          },
        ],
      });
    });

    it("should handle empty team members list", async () => {
      const uri = new URL("gitmob://team-members");
      mockListCoauthors.mockResolvedValueOnce({ ok: true, value: "" });

      const result = await resource.readCallback(uri);

      expect(listCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        contents: [],
      });
    });

    it("should return error response when listing team members fails", async () => {
      const errorMessage = "git: 'mob' is not a git command. See 'git --help'";
      const uri = new URL("gitmob://team-members");
      mockListCoauthors.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await resource.readCallback(uri);

      expect(listCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        contents: [
          {
            uri: uri.href,
            text: errorMessage,
          },
        ],
      });
    });
  });
});
