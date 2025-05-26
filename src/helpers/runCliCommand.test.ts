import { describe, it, expect } from "@jest/globals";
import { runCliCommand } from "./runCliCommand";

describe("[helpers] runCliCommand", () => {
  it("returns ok and stdout for a successful command", async () => {
    const result = await runCliCommand("node", ["-e", "console.log('hello')"]);
    expect(result.ok).toBe(true);
    expect(result.value.trim()).toBe("hello");
  });

  it("returns ok and stderr for a command that writes to stderr but exits 0", async () => {
    const result = await runCliCommand("node", [
      "-e",
      "console.error('err'); process.exit(0)",
    ]);
    expect(result.ok).toBe(true);
    expect(result.value.trim()).toBe("err");
  });

  it("returns ok: false and stderr for a command that fails with stderr", async () => {
    const result = await runCliCommand("node", [
      "-e",
      "console.error('fail'); process.exit(1)",
    ]);
    expect(result.ok).toBe(false);
    expect(result.value.trim()).toBe("fail");
  });

  it("returns ok: false and stdout for a command that fails with stdout only", async () => {
    const result = await runCliCommand("node", [
      "-e",
      "console.log('failout'); process.exit(1)",
    ]);
    expect(result.ok).toBe(false);
    expect(result.value.trim()).toBe("failout");
  });

  it("returns ok: false and message for a non-existent command", async () => {
    const result = await runCliCommand("nonexistent-cmd-xyz", []);
    expect(result.ok).toBe(false);
    expect(result.value.trim()).toBe("spawn nonexistent-cmd-xyz ENOENT");
  });
});
