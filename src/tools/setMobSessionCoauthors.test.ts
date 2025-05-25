import { z, type ZodRawShape } from "zod";
import tool from "./setMobSessionCoauthors.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

describe("[tools] setMobSessionCoauthorsUsingTeamMembers", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("setMobSessionCoauthorsUsingTeamMembers");
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
});
