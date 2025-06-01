import tool from "./setupGitMobGlobally.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { setupGlobal } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  setupGlobal: jest.fn(),
}));
const mockSetupGlobal = setupGlobal as jest.Mock;

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

  describe("tool callback", () => {
    it("should successfully setup Git Mob globally and return success response", async () => {
      const successMessage = "Git Mob setup locally completed";
      mockSetupGlobal.mockResolvedValueOnce({
        ok: true,
        value: successMessage,
      });

      const result = await tool.callback({});

      expect(setupGlobal).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: successMessage }],
      });
    });

    it("should return error response when global setup fails", async () => {
      const errorMessage = `Error: "Failed to setup Git Mob globally"`;
      mockSetupGlobal.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(setupGlobal).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
