import tool from "./listTeamMembers.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { listCoauthors } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  listCoauthors: jest.fn(),
}));
const mockListCoauthors = listCoauthors as jest.Mock;

describe("[tools] listTeamMembers", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("list_team_members");
  });

  it("should have correct description", () => {
    const description =
      "Lists all team members that have been added to Git Mob. " +
      "The team members can then be used in pairing / mobbing sessions as coauthors." +
      "Each entry is formatted as: <key> <name> <email>." +
      "Ask the user which team member(s) they want to pair or mob with.";
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
      title: "List Team Members",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully list team members and return success response", async () => {
      const teamMembers =
        "john John Doe john@example.com\njane Jane Smith jane@example.com";
      mockListCoauthors.mockResolvedValueOnce({ ok: true, value: teamMembers });

      const result = await tool.callback({});

      expect(listCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [
          { type: "text", text: "john John Doe john@example.com" },
          { type: "text", text: "jane Jane Smith jane@example.com" },
        ],
      });
    });

    it("should return error response when listing team members fails", async () => {
      const errorMessage = `Error: "Failed to list team members"`;
      mockListCoauthors.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(listCoauthors).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
