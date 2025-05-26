import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface CommandResult {
  ok: boolean;
  value: string;
}

export async function runCliCommand(
  program: string,
  args: string[],
): Promise<CommandResult> {
  try {
    const { stdout, stderr } = await execFileAsync(program, args);
    return { ok: true, value: stdout || stderr || "" };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null) {
      const { stdout, stderr, message } = error as {
        stdout?: string;
        stderr?: string;
        message?: string;
      };
      if (stderr) return { ok: false, value: stderr };
      if (stdout) return { ok: false, value: stdout };
      if (message) return { ok: false, value: message };
    }
    return { ok: false, value: String(error) || "Unknown error" };
  }
}
