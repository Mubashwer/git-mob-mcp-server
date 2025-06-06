import { z } from "zod";
import tool from "./getGitMobCliHelp.js";
import { describe, it, expect } from "@jest/globals";
import type { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import { getHelp } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  getHelp: jest.fn(),
}));
const mockGetHelp = getHelp as jest.Mock;

describe("[tools] getGitMobCliHelp", () => {
  it("should have correct name", () => {
    expect(tool.name).toBe("git_mob_cli_help");
  });

  it("should have correct description", () => {
    const description =
      "Displays general help and usage information for the Git Mob CLI. " +
      "You can optionally provide a command ('setup', 'coauthor', or 'help') " +
      "to get detailed help for that specific command.";
    expect(tool.description).toBe(description);
  });

  it("should have correct input schema", () => {
    const inputSchema = {
      command: z.enum(["setup", "coauthor", "help"]).optional(),
    };
    expect(JSON.stringify(tool.inputSchema)).toEqual(
      JSON.stringify(inputSchema),
    );
  });

  it("should have correct annotations", () => {
    const annotations: ToolAnnotations = {
      title: "Git Mob Help",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    };
    expect(tool.annotations).toEqual(annotations);
  });

  describe("tool callback", () => {
    it("should successfully get help and return success response", async () => {
      const helpText =
        "A CLI app which can help users automatically add co-author(s) to git commits for pair/mob programming.";
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await tool.callback({});

      expect(getHelp).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: helpText }],
      });
    });

    it("should successfully get help for given valid command and return success response", async () => {
      const helpText =
        "Create prepare-commit-msg githook which append Co-authored-by trailers to commit message";
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await tool.callback({ command: "setup" });

      expect(getHelp).toHaveBeenCalledWith("setup");
      expect(result).toEqual({
        isError: false,
        content: [{ type: "text", text: helpText }],
      });
    });

    it("should return error response when getting help fails", async () => {
      const errorMessage = "error: unrecognized subcommand 'setup'";
      mockGetHelp.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await tool.callback({ command: "setup" });

      expect(getHelp).toHaveBeenCalledWith("setup");
      expect(result).toEqual({
        isError: true,
        content: [{ type: "text", text: errorMessage }],
      });
    });
  });
});
