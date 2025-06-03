import tool from "./listMobSessionCoauthors.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { listMobSessionCoauthors } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  listMobSessionCoauthors: jest.fn(),
}));
const mockListMobSessionCoauthors = listMobSessionCoauthors as jest.Mock;

describe("[tools] listMobSessionCoauthors", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("list_mob_session_coauthors");
  });

  it("should have correct description", () => {
    const description =
      "Lists all coauthors currently included in the active mob or pairing session. " +
      "If Git Mob is setup, these coauthors will be automatically added as " +
      "Co-authored-by trailers to the commit's message when making commits during the session.";
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
      title: "List Mob Session Coauthors",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully list mob session coauthors and return success response", async () => {
      const coauthors =
        "john John Doe john@example.com\njane Jane Smith jane@example.com";
      mockListMobSessionCoauthors.mockResolvedValueOnce({
        ok: true,
        value: coauthors,
      });

      const result = await tool.callback({});

      expect(listMobSessionCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: coauthors }],
      });
    });

    it("should return error response when listing mob session coauthors fails", async () => {
      const errorMessage = `Error: "Failed to list mob session coauthors"`;
      mockListMobSessionCoauthors.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(listMobSessionCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });

    it("should handle null/undefined value by returning empty string", async () => {
      mockListMobSessionCoauthors.mockResolvedValueOnce({
        ok: true,
        value: null,
      });

      const result = await tool.callback({});

      expect(listMobSessionCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: "" }],
      });
    });
  });
});
