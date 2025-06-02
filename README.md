# Git Mob MCP Server

![NPM Version](https://img.shields.io/npm/v/git-mob-mcp-server)
![CI Release](https://github.com/Mubashwer/git-mob-mcp-server/actions/workflows/ci-release.yml/badge.svg)
[![codecov](https://codecov.io/gh/Mubashwer/git-mob-mcp-server/graph/badge.svg?token=21GJOEYQGG)](https://codecov.io/gh/Mubashwer/git-mob-mcp-server)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Node.js server implementing Model Context Protocol (MCP) for [`git mob` CLI app](https://github.com/Mubashwer/git-mob)

Built using [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)

## Features

- Setup git mob CLI globally or locally
- Add / delete / list team members
- Choose team members for pairing / mobbing session
- Automatic appending of Co-authored-by  in for co-authors in commit messages during pairing / mobbing session

## API

### Resources
- `git_mob_help`: Displays general help and usage information for the Git Mob CLI.
- `git_mob_version`: The installed version of the Git Mob CLI.
- `team_members`: List of all the team members that have been added to Git Mob.
- `mob_session_coauthors`: List of all coauthors currently included in the active mob or pairing session.
- `mob_session_coauthors` (trailers): List of the git Co-authored-by trailers for the coauthors currently included in the active mob or pairing session.

### Tools
- `add_team_member`: Adds a new team member using their key, name, and email.
- `clear_mob_session`: Clears the active mob or pairing session.
- `delete_team_member`: Deletes a team member by their key.
- `set_mob_session_coauthors`: Sets the active pairing or mob session by specifying the keys of the team members to include as coauthors.
- `setup_git_mob_globally`: Sets up git-mob globally for the user.
- `setup_git_mob_locally`: Sets up git-mob locally for the current repository.

Because resources may not be fully supported in GitHub Copilot Agent mode yet, the some of them are also available as tools:
- `get_git_mob_version`: The installed version of the Git Mob CLI.
- `get_team_members`: List of all the team members that have been added to Git Mob.
- `get_mob_session_coauthors`: List of all coauthors currently included in the active mob or pairing session.
- `get_mob_session_coauthors` (trailers): List of the git Co-authored-by trailers for the coauthors currently included in the active mob or pairing session.

## Usage with Claude Desktop
Add this to your `claude_desktop_config.json`:


### NPX

```json
{
  "mcpServers": {
    "gitMob": {
      "command": "npx",
      "args": [
        "-y",
        "git-mob-mcp-server"
      ]
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
      "gitMob": {
        "command": "npx",
        "args": [
          "-y",
          "git-mob-mcp-server",
        ]
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.