import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export class GitMobClient {
  constructor(private cli: string = "git-mob") {}

  async setupGlobal() {
    const args = ["setup", "--global"];
    return this.run(args);
  }

  async setupLocal() {
    const args = ["setup", "--local"];
    return this.run(args);
  }

  async addCoauthor(key: string, name: string, email: string) {
    const args = ["coauthor", "--add", key, name, email];
    return this.run(args);
  }

  async deleteCoauthor(key: string) {
    const args = ["coauthor", "--delete", key];
    return this.run(args);
  }

  async listCoauthors() {
    const args = ["coauthor", "--list"];
    return this.run(args);
  }

  async setMobSession(coauthorKeys: string[]) {
    const args = ["--with", ...coauthorKeys];
    return this.run(args);
  }

  async clearMobSession() {
    const args = ["--clear"];
    return this.run(args);
  }

  async listMobSessionCoauthors() {
    const args = ["--list"];
    return this.run(args);
  }

  async listMobSessionCoauthorTrailers() {
    const args = ["--trailers"];
    return this.run(args);
  }

  async getVersion() {
    const args = ["--version"];
    return this.run(args);
  }

  async getHelp(command?: "setup" | "coauthor" | "help") {
    const args = ["help"];
    if (command) args.push(command);
    return this.run(args);
  }

  private async run(args: string[]): Promise<string> {
    try {
      const { stdout, stderr } = await execFileAsync(this.cli, args);
      return stdout || stderr;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        const errorObj = error as {
          stdout?: string;
          stderr?: string;
          message?: string;
        };
        if (errorObj.stdout) return errorObj.stdout;
        if (errorObj.stderr) return errorObj.stderr;
        if (errorObj.message) return errorObj.message;
      }
      return String(error);
    }
  }
}
