import { describe, expect, it, jest } from "@jest/globals";
import { createGitMobServer } from "./gitMobServerFactory.js";

// Mock StdioServerTransport from the MCP SDK
const transport = {};
const mockConnect = jest.fn();
const mockStdioServerTransport = jest.fn().mockImplementation(() => transport);

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: mockStdioServerTransport,
}));

// Mock createGitMobServer to return a mock server with a connect method
jest.mock("./gitMobServerFactory.js", () => ({
  createGitMobServer: jest.fn(() => ({ connect: mockConnect })),
}));

describe("index.ts", () => {
  it("should create a server, transport, and connect them", async () => {
    // Dynamically import index.ts to run its top-level code
    await import("./index.js");

    expect(createGitMobServer).toHaveBeenCalled();
    expect(mockStdioServerTransport).toHaveBeenCalled();
    expect(mockConnect).toHaveBeenCalledWith(transport);
  });
});
