import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import * as gitMobClient from "./gitMobClient";
import { runCliCommand } from "../helpers/index.js";

jest.mock("../helpers/index.js", () => ({
  runCliCommand: jest.fn(),
}));

const mockRunCmd = runCliCommand as jest.MockedFunction<typeof runCliCommand>;

describe("[clients] gitMobClient", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("setupGlobal", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "Setup complete" });

    const result = await gitMobClient.setupGlobal();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", [
      "setup",
      "--global",
    ]);
    expect(result).toEqual({ ok: true, value: "Setup complete" });
  });

  test("setupLocal", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "Setup complete" });

    const result = await gitMobClient.setupLocal();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["setup", "--local"]);
    expect(result).toEqual({ ok: true, value: "Setup complete" });
  });

  test("addCoauthor", async () => {
    mockRunCmd.mockResolvedValue({
      ok: true,
      value: "Alice Bob <alice@example.com>",
    });

    const result = await gitMobClient.addCoauthor(
      "ab",
      "Alice Bob",
      "alice@example.com",
    );
    expect(runCliCommand).toHaveBeenCalledWith("git-mob", [
      "coauthor",
      "--add",
      "ab",
      "Alice Bob",
      "alice@example.com",
    ]);
    expect(result).toEqual({
      ok: true,
      value: "Alice Bob <alice@example.com>",
    });
  });

  test("deleteCoauthor", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "" });

    const result = await gitMobClient.deleteCoauthor("ab");

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", [
      "coauthor",
      "--delete",
      "ab",
    ]);
    expect(result).toEqual({ ok: true, value: "" });
  });

  test("listCoauthors", async () => {
    const coauthorList =
      "leo Leo Messi <leo.messi@arg.com>\nab Alice Bob <alice@example.com>";
    mockRunCmd.mockResolvedValue({ ok: true, value: coauthorList });

    const result = await gitMobClient.listCoauthors();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", [
      "coauthor",
      "--list",
    ]);
    expect(result).toEqual({ ok: true, value: coauthorList });
  });

  test("setMobSession", async () => {
    const session =
      "leo Leo Messi <leo.messi@arg.com>\nab Alice Bob <alice@example.com>";
    mockRunCmd.mockResolvedValue({ ok: true, value: session });

    const result = await gitMobClient.setMobSession(["ab", "cd"]);

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", [
      "--with",
      "ab",
      "cd",
    ]);
    expect(result).toEqual({ ok: true, value: session });
  });

  test("clearMobSession", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "" });

    const result = await gitMobClient.clearMobSession();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["--clear"]);
    expect(result).toEqual({ ok: true, value: "" });
  });

  test("listMobSessionCoauthors", async () => {
    const coauthors =
      "leo Leo Messi <leo.messi@arg.com>\nab Alice Bob <alice@example.com>";
    mockRunCmd.mockResolvedValue({ ok: true, value: coauthors });

    const result = await gitMobClient.listMobSessionCoauthors();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["--list"]);
    expect(result).toEqual({ ok: true, value: coauthors });
  });

  test("listMobSessionCoauthorTrailers", async () => {
    const trailers =
      "Co-authored-by: Leo Messi <leo.messi@arg.com>\nCo-authored-by: Alice Bob <alice@example.com>";
    mockRunCmd.mockResolvedValue({ ok: true, value: trailers });

    const result = await gitMobClient.listMobSessionCoauthorTrailers();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["--trailers"]);
    expect(result).toEqual({ ok: true, value: trailers });
  });

  test("getVersion", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "git-mob-tool 1.6.2" });

    const result = await gitMobClient.getVersion();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["--version"]);
    expect(result).toEqual({ ok: true, value: "git-mob-tool 1.6.2" });
  });

  test("getHelp (no command)", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "help" });

    const result = await gitMobClient.getHelp();

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["help"]);
    expect(result).toEqual({ ok: true, value: "help" });
  });

  test("getHelp (with command)", async () => {
    mockRunCmd.mockResolvedValue({ ok: true, value: "help setup" });

    const result = await gitMobClient.getHelp("setup");

    expect(runCliCommand).toHaveBeenCalledWith("git-mob", ["help", "setup"]);
    expect(result).toEqual({ ok: true, value: "help setup" });
  });
});
