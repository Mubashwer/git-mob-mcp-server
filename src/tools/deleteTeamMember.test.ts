import { z, type ZodRawShape } from "zod";
import tool from "./deleteTeamMember.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

describe("[tools] deleteTeamMember", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("deleteTeamMember");
  });

  it("should have correct description", () => {
    const description =
      "Deletes a team member by their key. " +
      "User can only delete a team member they have added previously. " +
      "If user did not specify a key, show them list of existing team members and ask them to select one.";
    expect(tool.description).toBe(description);
  });

  it("should have correct input schema", () => {
    const inputSchema: ZodRawShape = {
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
});
