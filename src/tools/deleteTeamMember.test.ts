import { z } from "zod";
import tool from "./deleteTeamMember.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { deleteTeamMember } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  deleteTeamMember: jest.fn(),
}));
const mockDeleteTeamMember = deleteTeamMember as jest.Mock;

describe("[tools] deleteTeamMember", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("delete_team_member");
  });

  it("should have correct description", () => {
    const description =
      "Deletes a team member by their key. " +
      "User can only delete a team member they have added previously. " +
      "If user did not specify a key, show them list of existing team members and ask them to select one.";
    expect(tool.description).toBe(description);
  });

  it("should have correct input schema", () => {
    const inputSchema = {
      key: z.string(),
    };
    expect(JSON.stringify(tool.inputSchema)).toEqual(
      JSON.stringify(inputSchema),
    );
  });

  it("should have correct annotations", () => {
    const annotations: ToolAnnotations = {
      title: "Delete Team Member",
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully delete team member and return success response", async () => {
      mockDeleteTeamMember.mockResolvedValueOnce({ ok: true, value: "" });

      const result = await tool.callback({ key: "leo" });

      expect(deleteTeamMember).toHaveBeenCalledWith("leo");
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: "" }],
      });
    });

    it("should return error response when team member deletion fails", async () => {
      const errorMessage = `Error: "No co-author found with key: joe"`;
      mockDeleteTeamMember.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({ key: "joe" });

      expect(deleteTeamMember).toHaveBeenCalledWith("joe");
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
