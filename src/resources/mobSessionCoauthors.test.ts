import resource from "./mobSessionCoauthors.js";
import { describe, it, expect } from "@jest/globals";
import {
  ResourceTemplate,
  type ResourceMetadata,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { listMobSessionCoauthors } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  listMobSessionCoauthors: jest.fn(),
}));
const mockListMobSessionCoauthors = listMobSessionCoauthors as jest.Mock;

describe("[resources] mobSessionCoauthors", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("mob_session_coauthors");
  });

  it("should have correct template", () => {
    const template: ResourceTemplate = new ResourceTemplate(
      "gitmob://mob-session-coauthors",
      { list: undefined },
    );
    expect(resource.template).toEqual(template);
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description:
        "List of all coauthors currently included in the active mob or pairing session. " +
        "If Git Mob is setup, these coauthors will be automatically added as " +
        "Co-authored-by trailers to the commit's message when making commits during the session.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });

  describe("resource callback", () => {
    it("should successfully list mob session coauthors and return success response", async () => {
      const coauthorsText =
        "Leo Messi <leo@example.com>\nEric Abidal <eric@example.com>";
      const uri = new URL("gitmob://mob-session-coauthors");
      mockListMobSessionCoauthors.mockResolvedValueOnce({
        ok: true,
        value: coauthorsText,
      });

      const result = await resource.readCallback(uri);

      expect(listMobSessionCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        contents: [
          {
            uri: uri.href,
            text: "Leo Messi <leo@example.com>",
          },
          {
            uri: uri.href,
            text: "Eric Abidal <eric@example.com>",
          },
        ],
      });
    });

    it("should handle empty mob session coauthors list", async () => {
      const uri = new URL("gitmob://mob-session-coauthors");
      mockListMobSessionCoauthors.mockResolvedValueOnce({
        ok: true,
        value: "",
      });

      const result = await resource.readCallback(uri);

      expect(listMobSessionCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        contents: [],
      });
    });

    it("should return error response when listing mob session coauthors fails", async () => {
      const errorMessage = "git: 'mob' is not a git command. See 'git --help'";
      const uri = new URL("gitmob://mob-session-coauthors");
      mockListMobSessionCoauthors.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await resource.readCallback(uri);

      expect(listMobSessionCoauthors).toHaveBeenCalledWith();
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
