import tool from "./setupGitMobLocally.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { setupLocal } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  setupLocal: jest.fn(),
}));
const mockSetupLocal = setupLocal as jest.Mock;

describe("[tools] setupGitMobLocally", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("setup_git_mob_locally");
  });

  it("should have correct description", () => {
    const description =
      "Sets up the Git Mob CLI for the current repository by installing a local " +
      "prepare-commit-msg git hook. This hook delegates to the global " +
      "prepare-commit-msg hook configured by setupGitMobGlobally. Use this tool " +
      "only if your repository overrides the core.hooksPath git " +
      "configuration (e.g., when using Husky). Note: You must run " +
      "setupGitMobGlobally at least once before using this tool.";
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
      title: "Setup Git Mob Locally",
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully setup Git Mob locally and return success response", async () => {
      const successMessage = "Git Mob setup locally completed";
      mockSetupLocal.mockResolvedValueOnce({ ok: true, value: successMessage });

      const result = await tool.callback({});

      expect(setupLocal).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: successMessage }],
      });
    });

    it("should return error response when local setup fails", async () => {
      const errorMessage = `Error: "Failed to setup Git Mob locally"`;
      mockSetupLocal.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({});

      expect(setupLocal).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
