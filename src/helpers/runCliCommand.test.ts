import { describe, it, expect, jest } from "@jest/globals";
import { runCliCommand } from "./runCliCommand.js";

describe("[helpers] runCliCommand", () => {
  it("should return ok and stdout for a successful command", async () => {
    const result = await runCliCommand("node", ["-e", "console.log('hello')"]);
    expect(result.ok).toBe(true);
    expect(result.value.trim()).toBe("hello");
  });

  it("should return ok and stderr for a command that writes to stderr but exits 0", async () => {
    const result = await runCliCommand("node", [
      "-e",
      "console.error('err'); process.exit(0)",
    ]);
    expect(result.ok).toBe(true);
    expect(result.value.trim()).toBe("err");
  });

  it("should return ok: false and stderr for a command that fails with stderr", async () => {
    const result = await runCliCommand("node", [
      "-e",
      "console.error('fail'); process.exit(1)",
    ]);
    expect(result.ok).toBe(false);
    expect(result.value.trim()).toBe("fail");
  });

  it("should return ok: false and stdout for a command that fails with stdout only", async () => {
    const result = await runCliCommand("node", [
      "-e",
      "console.log('failout'); process.exit(1)",
    ]);
    expect(result.ok).toBe(false);
    expect(result.value.trim()).toBe("failout");
  });

  it("should return ok: false and message for a non-existent command", async () => {
    const result = await runCliCommand("nonexistent-cmd-xyz", []);
    expect(result.ok).toBe(false);
    expect(result.value.trim()).toBe("spawn nonexistent-cmd-xyz ENOENT");
  });

  it("should return ok and empty string for a command with no output", async () => {
    const result = await runCliCommand("node", ["-e", "/* no output */"]);
    expect(result.ok).toBe(true);
    expect(result.value).toBe("");
  });

  it("should handle non-object errors", async () => {
    const mockExecFile = jest.fn();
    jest.doMock("child_process", () => ({
      execFile: mockExecFile,
    }));
    // Reset modules to apply the mock
    jest.resetModules();

    mockExecFile.mockImplementationOnce((_program, _args, callback) => {
      // @ts-expect-error - Intentionally passing a string instead of Error object
      callback("string error");
      return {} as unknown;
    });

    // Re-import the module to include the mock
    const { runCliCommand: runCliCommandWithMockedExec } = await import(
      "./runCliCommand.js"
    );

    const result = await runCliCommandWithMockedExec("test", []);
    expect(result.ok).toBe(false);
    expect(result.value).toBe("string error");

    // Reset modules to remove the mock
    jest.resetModules();
  });
});
