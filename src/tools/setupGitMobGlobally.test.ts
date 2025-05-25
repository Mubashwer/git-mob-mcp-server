import tool from "./setupGitMobGlobally.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

describe("[tools] setupGitMobGlobally", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("setup_git_mob_globally"); 
  });

  it("should have correct description", () => {
    const description =
      "Configures the Git Mob CLI globally for all repositories on your system. " +
      "This one-time setup installs a global prepare-commit-msg git hook, which automatically " +
      "appends Co-authored-by trailers to commit messages during mob or pairing sessions. " +
      "If a repository overrides the core.hooksPath git configuration (e.g., when using " +
      "Husky), the setupGitMobLocally tool needs to be invoked in addition to this. ";
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
      title: "Setup Git Mob Globally",
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });
});
