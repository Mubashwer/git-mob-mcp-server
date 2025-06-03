import resource from "./gitMobHelp.js";
import { describe, it, expect } from "@jest/globals";
import { type ResourceMetadata } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getHelp } from "../clients/gitMobClient.js";
import { UriTemplate } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";

jest.mock("../clients/gitMobClient.js", () => ({
  getHelp: jest.fn(),
}));
const mockGetHelp = getHelp as jest.Mock;

describe("[resourceTemplates] gitMobHelp", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("git_mob_help");
  });

  it("should have correct template", () => {
    expect(resource.template.uriTemplate).toEqual(
      new UriTemplate("gitmob://help{?command}"),
    );
    expect(resource.template.listCallback).toEqual(undefined);
  });

  it("should have template complete callback return correct commands", () => {
    const completeCallback = resource.template.completeCallback("command");
    const commands = completeCallback();
    expect(commands).toEqual(["setup", "coauthor", "help"]);
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description:
        "General help and usage information for the Git Mob CLI. " +
        "You can optionally provide a command ('setup', 'coauthor', or 'help') " +
        "to get detailed help for that specific command.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });

  describe("resource callback", () => {
    it("should successfully get help and return success response", async () => {
      const helpText =
        "A CLI app which can help users automatically add co-author(s) to git commits for pair/mob programming.";
      const uri = new URL("gitmob://help");
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await resource.readCallback(uri, {});

      expect(getHelp).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: helpText,
          },
        ],
      });
    });

    it("should successfully get help for given valid command and return success response", async () => {
      const helpText =
        "Create prepare-commit-msg githook which append Co-authored-by trailers to commit message";
      const uri = new URL("gitmob://help?command=setup");
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await resource.readCallback(uri, { command: "setup" });

      expect(getHelp).toHaveBeenCalledWith("setup");
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: helpText,
          },
        ],
      });
    });

    it("should return error response when getting help fails", async () => {
      const errorMessage = "error: unrecognized subcommand 'foo'";
      const uri = new URL("gitmob://help?command=foo");
      mockGetHelp.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await resource.readCallback(uri, { command: "foo" });

      expect(getHelp).toHaveBeenCalledWith("foo");
      expect(result).toEqual({
        isError: true,
        contents: [
          {
            uri: uri.href,
            text: errorMessage,
          },
        ],
      });
    });

    it("should successfully get help for 'coauthor' command", async () => {
      const helpText = "Manage co-authors for git commits";
      const uri = new URL("gitmob://help?command=coauthor");
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await resource.readCallback(uri, { command: "coauthor" });

      expect(getHelp).toHaveBeenCalledWith("coauthor");
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: helpText,
          },
        ],
      });
    });

    it("should successfully get help for 'help' command", async () => {
      const helpText = "Display help information";
      const uri = new URL("gitmob://help?command=help");
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await resource.readCallback(uri, { command: "help" });

      expect(getHelp).toHaveBeenCalledWith("help");
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: helpText,
          },
        ],
      });
    });

    it("should handle empty parameters object", async () => {
      const helpText = "Default help text";
      const uri = new URL("gitmob://help");
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await resource.readCallback(uri, {});

      expect(getHelp).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: helpText,
          },
        ],
      });
    });

    it("should handle explicit undefined command", async () => {
      const helpText = "Default help text";
      const uri = new URL("gitmob://help");
      mockGetHelp.mockResolvedValueOnce({ ok: true, value: helpText });

      const result = await resource.readCallback(uri, { command: undefined });

      expect(getHelp).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: helpText,
          },
        ],
      });
    });
  });
});
