import tool from "./clearMobSession.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { clearMobSession } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  clearMobSession: jest.fn(),
}));
const mockClearMobSession = clearMobSession as jest.Mock;

describe("[tools] clearMobSession", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("clear_mob_session");
  });

  it("should have correct description", () => {
    const description = "Clears the active mob or pairing session.";
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
      title: "Clear Mob Session",
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully clear mob session and return success response", async () => {
      mockClearMobSession.mockResolvedValueOnce({ ok: true, value: "" });

      const result = await tool.callback({});

      expect(clearMobSession).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: "" }],
      });
    });

    it("should return error response when clearing mob session fails", async () => {
      const errorMessage = `Error: "Failed to clear mob session"`;
      mockClearMobSession.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(clearMobSession).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
