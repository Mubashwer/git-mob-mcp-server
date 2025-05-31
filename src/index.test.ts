import { describe, expect, it, jest } from "@jest/globals";
import { createGitMobServer } from "./gitMobServerFactory.js";

// Mock StdioServerTransport from the MCP SDK
const transport = {};
const mockConnect = jest.fn();
const mockStdioServerTransport = jest.fn().mockImplementation(() => transport);

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: mockStdioServerTransport,
}));

jest.mock("./gitMobServerFactory.js", () => ({
  createGitMobServer: jest.fn(() => ({ connect: mockConnect })),
}));

describe("index.ts", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("should create a server, transport, and connect them", async () => {
    // Dynamically import index.ts to run its top-level code
    await import("./index.js");

    expect(createGitMobServer).toHaveBeenCalled();
    expect(mockStdioServerTransport).toHaveBeenCalled();
    expect(mockConnect).toHaveBeenCalledWith(transport);
  });

  it("should log error and exit process with code 1 on error", async () => {
    const testError = new Error("Test server creation error");
    mockConnect.mockImplementationOnce(() => {
      throw testError;
    });

    const mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const mockProcessExit = jest
      .spyOn(process, "exit")
      // @ts-expect-error Neede to mock process.exit without actually exiting
      .mockImplementation(() => {});

    await import("./index.js");

    expect(mockConsoleError).toHaveBeenCalledWith("Server error:", testError);
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });
});
