import tool from "./clearMobSession.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

describe("[tools] clearMobSession", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("clearMobSession");
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
});
