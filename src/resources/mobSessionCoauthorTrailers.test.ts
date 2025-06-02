import resource from "./mobSessionCoauthorTrailers.js";
import { describe, it, expect } from "@jest/globals";
import { type ResourceMetadata } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listMobSessionCoauthorTrailers } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  listMobSessionCoauthorTrailers: jest.fn(),
}));
const mockListMobSessionCoauthorTrailers =
  listMobSessionCoauthorTrailers as jest.Mock;

describe("[resources] mobSessionCoauthorTrailers", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("mob_session_coauthor_trailers");
  });

  it("should have correct uri", () => {
    expect(resource.uri).toEqual("gitmob://mob-session-coauthor-trailers");
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

  describe("resource readCallback", () => {
    it("should successfully list mob session coauthor trailers and return success response", async () => {
      const trailersText =
        "Co-authored-by: Leo Messi <leo@example.com>\nCo-authored-by: Eric Abidal <eric@example.com>";
      const uri = new URL("gitmob://mob-session-coauthor-trailers");
      mockListMobSessionCoauthorTrailers.mockResolvedValueOnce({
        ok: true,
        value: trailersText,
      });

      const result = await resource.readCallback(uri);

      expect(listMobSessionCoauthorTrailers).toHaveBeenCalledWith();
      expect(result).toEqual({
        contents: [
          {
            uri: uri.href,
            text: "Co-authored-by: Leo Messi <leo@example.com>",
          },
          {
            uri: uri.href,
            text: "Co-authored-by: Eric Abidal <eric@example.com>",
          },
        ],
      });
    });

    it("should handle empty mob session coauthor trailers list", async () => {
      const uri = new URL("gitmob://mob-session-coauthor-trailers");
      mockListMobSessionCoauthorTrailers.mockResolvedValueOnce({
        ok: true,
        value: "",
      });

      const result = await resource.readCallback(uri);

      expect(listMobSessionCoauthorTrailers).toHaveBeenCalledWith();
      expect(result).toEqual({
        contents: [],
      });
    });

    it("should return error response when listing mob session coauthor trailers fails", async () => {
      const errorMessage = "git: 'mob' is not a git command. See 'git --help'";
      const uri = new URL("gitmob://mob-session-coauthor-trailers");
      mockListMobSessionCoauthorTrailers.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await resource.readCallback(uri);

      expect(listMobSessionCoauthorTrailers).toHaveBeenCalledWith();
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
