import { runCliCommand, type CommandResult } from "../helpers/index.js";

const GIT_MOB_CLI = "git-mob";

export async function setupGlobal(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["setup", "--global"]);
}

export async function setupLocal(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["setup", "--local"]);
}

export async function addCoauthor(
  key: string,
  name: string,
  email: string,
): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["coauthor", "--add", key, name, email]);
}

export async function deleteCoauthor(key: string): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["coauthor", "--delete", key]);
}

export async function listCoauthors(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["coauthor", "--list"]);
}

export async function setMobSession(
  coauthorKeys: string[],
): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["--with", ...coauthorKeys]);
}

export async function clearMobSession(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["--clear"]);
}

export async function listMobSessionCoauthors(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["--list"]);
}

export async function listMobSessionCoauthorTrailers(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["--trailers"]);
}

export async function getVersion(): Promise<CommandResult> {
  return runCliCommand(GIT_MOB_CLI, ["--version"]);
}

export async function getHelp(
  command?: "setup" | "coauthor" | "help",
): Promise<CommandResult> {
  const args = ["help"];
  if (command) args.push(command);
  return runCliCommand(GIT_MOB_CLI, args);
}
