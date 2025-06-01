import { z, type ZodRawShape } from "zod";
import tool from "./setMobSessionCoauthors.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { setMobSession } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  setMobSession: jest.fn(),
}));
const mockSetMobSession = setMobSession as jest.Mock;

describe("[tools] setMobSessionCoauthors", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("set_mob_session_coauthors");
  });

  it("should have correct description", () => {
    const description =
      "Sets the active pairing or mob session by specifying the " +
      "keys of the team members to include as coauthors. " +
      "If Git Mob is setup, these coauthors will be automatically added as " +
      "Co-authored-by trailers to the commit's message when making commits during the session.";
    expect(tool.description).toBe(description);
  });

  it("should have correct input schema", () => {
    const inputSchema: ZodRawShape = {
      coauthorKeys: z.array(z.string()).min(1),
    };
    expect(JSON.stringify(tool.inputSchema)).toEqual(
      JSON.stringify(inputSchema),
    );
  });

  it("should have correct annotations", () => {
    const annotations: ToolAnnotations = {
      title: "Set Mob or Pairing Session Coauthors using Team Members",
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully set mob session coauthors and return success response", async () => {
      const coauthorKeys = ["leo", "eric"];
      const successMessage = "Leo <leo@example.com>\nEric <eric@example.com>";
      mockSetMobSession.mockResolvedValueOnce({
        ok: true,
        value: successMessage,
      });

      const result = await tool.callback({ coauthorKeys });

      expect(setMobSession).toHaveBeenCalledWith(coauthorKeys);
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: successMessage }],
      });
    });

    it("should return error response when setting mob session fails", async () => {
      const coauthorKeys = ["joe"];
      const errorMessage = `Error: "No co-author found with key: joe"`;
      mockSetMobSession.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({ coauthorKeys });

      expect(setMobSession).toHaveBeenCalledWith(coauthorKeys);
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
