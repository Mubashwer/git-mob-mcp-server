import { z } from "zod";
import tool from "./addTeamMember.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { addTeamMember } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  addTeamMember: jest.fn(),
}));
const mockAddTeamMember = addTeamMember as jest.Mock;

describe("[tools] addTeamMember", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("add_team_member");
  });

  it("should have correct description", () => {
    const description =
      "Adds a new team member using their key, name, and email. " +
      "This member can then be used in a pairing or mobbing sessions as a cauthor. " +
      "The first name is a good choice for the key." +
      "Ask the user if they want mob or pair with this team member.";
    expect(tool.description).toBe(description);
  });

  it("should have correct input schema", () => {
    const inputSchema = {
      key: z.string(),
      name: z.string(),
      email: z.string(),
    };
    expect(JSON.stringify(tool.inputSchema)).toEqual(
      JSON.stringify(inputSchema),
    );
  });

  it("should have correct annotations", () => {
    const annotations: ToolAnnotations = {
      title: "Add Team Member",
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    };

    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully add team member and return success response", async () => {
      const successMessage = "Leo <leo@example.com>";
      mockAddTeamMember.mockResolvedValueOnce({
        ok: true,
        value: successMessage,
      });

      const result = await tool.callback({
        key: "leo",
        name: "Leo",
        email: "leo@example.com",
      });

      expect(addTeamMember).toHaveBeenCalledWith(
        "leo",
        "Leo",
        "leo@example.com",
      );
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: successMessage }],
      });
    });

    it("should return error response when team member addition fails", async () => {
      const errorMessage = `error: 3 values required for '--add <COAUTHOR_KEY> <COAUTHOR_NAME> <COAUTHOR_EMAIL>' but 2 were provided`;
      mockAddTeamMember.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({
        key: "leo",
        name: "Leo",
        email: "",
      });

      expect(addTeamMember).toHaveBeenCalledWith("leo", "Leo", "");
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
