# Git Mob MCP Server

[![NPM Version](https://img.shields.io/npm/v/git-mob-mcp-server)](https://www.npmjs.com/package/git-mob-mcp-server)
[![CI Release](https://github.com/Mubashwer/git-mob-mcp-server/actions/workflows/ci-release.yml/badge.svg)](https://github.com/Mubashwer/git-mob-mcp-server/actions/workflows/ci-release.yml)
[![codecov](https://codecov.io/gh/Mubashwer/git-mob-mcp-server/graph/badge.svg?token=21GJOEYQGG)](https://codecov.io/gh/Mubashwer/git-mob-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Mubashwer/git-mob-mcp-server/blob/main/LICENSE)

Node.js server implementing Model Context Protocol (MCP) for [`git mob` CLI app](https://github.com/Mubashwer/git-mob)

*You can attribute a git commit to more than one author by adding one or more Co-authored-by trailers to the commit's message. Co-authored commits are visible on GitHub.
For more information, see [here](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors).*

This MCP Server will help you add them automatically and also help you store and manage co-authors for pair/mob programming sessions.

Built using [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)

## Features

- Setup git mob CLI globally or locally
- Add / delete / list team members
- Choose team members for pairing / mobbing session
- Automatic appending of Co-authored-by in for co-authors in commit messages during pairing / mobbing session

## Prerequisites

### System Requirements

- **Node.js**: Version 18 or higher
- **git**: Git v2.32 or later must be installed and configured
- **git-mob CLI**: [git-mob CLI app](https://github.com/Mubashwer/git-mob?tab=readme-ov-file#installation) must be installed

## API

### Resources

- `git_mob_cli_help`: General help and usage information for the Git Mob CLI.
- `git_mob_cli_version`: The installed version of the Git Mob CLI.

### Tools

- `get_git_mob_cli_help`: Displays general help and usage information for the Git Mob CLI.
- `setup_git_mob_globally`: Sets up git-mob globally for the user.
- `setup_git_mob_locally`: Sets up git-mob locally for the current repository when it overrides `core.hooksPath` git configuration variable (e.g when using husky).
- `add_team_member`: Adds a new team member using their key, name, and email.
- `delete_team_member`: Deletes a team member by their key.
- `list_team_members`: Lists all team members that have been added to Git Mob.
- `set_mob_session_coauthors`: Sets the active pairing or mob session by specifying the keys of the team members to include as coauthors.
- `clear_mob_session`: Clears the active mob or pairing session.
- `list_mob_session_coauthors`: Lists all coauthors currently included in the active mob or pairing session.
- `list_mob_session_coauthor_trailers`: Lists the git Co-authored-by trailers for the coauthors currently included in the active mob or pairing session.

## Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "git-mob": {
      "command": "npx",
      "args": ["-y", "git-mob-mcp-server"]
    }
  }
}
```

## Usage with VS Code

For installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

### NPX

```json
{
  "mcp": {
    "servers": {
      "git-mob": {
        "command": "npx",
        "args": ["-y", "git-mob-mcp-server"]
      }
    }
  }
}
```

## Setup

Run the `setup_git_mob_globally` MCP tool once to configure git-mob globally for all repositories

## Local Development

For local development and testing of the MCP server:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Mubashwer/git-mob-mcp-server.git
   cd git-mob-mcp-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm start
   ```

   This command will:

   - Build the TypeScript source code in watch mode (automatically rebuilds on file changes)
   - Start the MCP Inspector for testing and debugging the server locally

The MCP Inspector will be available at the URL shown in the terminal output, allowing you to test the server's tools and resources interactively.

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
