import tool from "./listMobSessionCoauthorTrailers.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { listMobSessionCoauthorTrailers } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  listMobSessionCoauthorTrailers: jest.fn(),
}));
const mockListMobSessionCoauthorTrailers =
  listMobSessionCoauthorTrailers as jest.Mock;

describe("[tools] listMobSessionCoauthorTrailers", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("list_mob_session_coauthor_trailers");
  });

  it("should have correct description", () => {
    const description =
      "Lists the git Co-authored-by trailers for the coauthors " +
      "currently included in the active mob or pairing session. " +
      "If Git Mob is setup, these Co-authored-by trailers will be automatically " +
      "added to the commit's message when making commits during the session.";
    expect(tool.description).toBe(description);
  });

  it("should have correct input schema", () => {
    const inputSchema = {};
    expect(JSON.stringify(tool.inputSchema)).toEqual(
      JSON.stringify(inputSchema),
    );
  });

  it("should have correct annotations", () => {
    const annotations: ToolAnnotations = {
      title: "List Mob Session Coauthor Trailers",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully list mob session coauthor trailers and return success response", async () => {
      const trailers =
        "Co-authored-by: John Doe <john@example.com>\nCo-authored-by: Jane Smith <jane@example.com>";
      mockListMobSessionCoauthorTrailers.mockResolvedValueOnce({
        ok: true,
        value: trailers,
      });

      const result = await tool.callback({});

      expect(listMobSessionCoauthorTrailers).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [
          { type: "text", text: "Co-authored-by: John Doe <john@example.com>" },
          {
            type: "text",
            text: "Co-authored-by: Jane Smith <jane@example.com>",
          },
        ],
      });
    });

    it("should return error response when listing mob session coauthor trailers fails", async () => {
      const errorMessage = `Error: "Failed to list mob session coauthor trailers"`;
      mockListMobSessionCoauthorTrailers.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(listMobSessionCoauthorTrailers).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
