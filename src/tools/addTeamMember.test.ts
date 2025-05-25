import { z, type ZodRawShape } from "zod";
import tool from "./addTeamMember.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

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
    const inputSchema: ZodRawShape = {
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
});
