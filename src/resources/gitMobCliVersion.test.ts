import resource from "./gitMobCliVersion.js";
import { describe, it, expect } from "@jest/globals";
import { type ResourceMetadata } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getVersion } from "../clients/gitMobClient.js";

jest.mock("../clients/gitMobClient.js", () => ({
  getVersion: jest.fn(),
}));
const mockGetVersion = getVersion as jest.Mock;

describe("[resources] gitMobCliVersion", () => {
  it("should have correct name", () => {
    expect(resource.name).toBe("git_mob_cli_version");
  });

  it("should have correct uri", () => {
    expect(resource.uri).toEqual("gitmob://version");
  });

  it("should have correct metadata", () => {
    const metadata: ResourceMetadata = {
      description: "The installed version of the Git Mob CLI.",
      mimeType: "text/plain",
    };
    expect(resource.metadata).toEqual(metadata);
  });

  describe("resource callback", () => {
    it("should successfully get version and return success response", async () => {
      const versionText = "git-mob-tool 1.6.2";
      const uri = new URL("gitmob://version");
      mockGetVersion.mockResolvedValueOnce({ ok: true, value: versionText });

      const result = await resource.readCallback(uri);

      expect(getVersion).toHaveBeenCalledWith();
      expect(result).toEqual({
        isError: false,
        contents: [
          {
            uri: uri.href,
            text: versionText,
          },
        ],
      });
    });

    it("should return error response when getting version fails", async () => {
      const errorMessage = "git: 'mob' is not a git command. See 'git --help'";
      const uri = new URL("gitmob://version");
      mockGetVersion.mockResolvedValueOnce({
        ok: false,
        value: errorMessage,
      });

      const result = await resource.readCallback(uri);

      expect(getVersion).toHaveBeenCalledWith();
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
  });
});
