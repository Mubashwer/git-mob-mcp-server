import tool from "./setupGitMob.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { setup } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  setup: jest.fn(),
}));
const mockSetup = setup as jest.Mock;

describe("[tools] setupGitMob", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("setup_git_mob");
  });

  it("should have correct description", () => {
    const description =
      "Configures the Git Mob CLI globally for all repositories on your system. This one-time " +
      "setup installs a global prepare-commit-msg git hook, which automatically appends " +
      "Co-authored-by trailers to commit messages during mob or pairing sessions. If a repository " +
      "overrides the core.hooksPath git configuration (e.g., when using Husky), the " +
      "setupGitMobLocally tool needs to be invoked in addition to this. " +
      "If Git Mob isn't working as expected, ask the user if they have completed this initial setup.";
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
      title: "Setup Git Mob",
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully setup Git Mob and return success response", async () => {
      const successMessage = "Git Mob setup completed";
      mockSetup.mockResolvedValueOnce({
        ok: true,
        value: successMessage,
      });

      const result = await tool.callback({});

      expect(setup).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: successMessage }],
      });
    });

    it("should return error response when setup fails", async () => {
      const errorMessage = `Error: "Failed to setup Git Mob"`;
      mockSetup.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(setup).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
