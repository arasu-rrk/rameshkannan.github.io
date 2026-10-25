---
title: "Basic Git commands: Every developer should know"
date: "2019-12-16"
modifiedDate: "2026-10-18T23:23:38+01:00"
displayModifiedDate: "2026-10-23"
excerpt: "A practical reference covering the essential Git commands for cloning, branching, staging, committing, pushing, and reverting changes."
category: "Git"
author: "Ramesh Kannan"
coverImage: "/images/blog/004/basic-git-commands.webp"
tags: ["git"]
---

> **Originally published** on [arasu-rrk.com](https://arasu-rrk.com/blog/basic-git-commands-every-developer-should-know).

[Git](https://en.wikipedia.org/wiki/Git) is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Here are some basic Git commands you need to know.

## Clone the Repository

```bash
git clone https://github.com/OWNER/REPOSITORY.git
```

By default, Git checks out the repository's default branch. To start on a different branch while cloning, use `-b`:

```bash
git clone -b development https://github.com/OWNER/REPOSITORY.git
```

## Create and Switch Branches

After cloning, use `git switch` to change branches in the local repository:

Create a new branch and switch to it:

```bash
git switch --create {branch_name}
```

To switch to an existing local branch:

```bash
git switch {branch_name}
```

To switch to a branch that exists on the remote but not locally:

```bash
git fetch origin
git switch --create {branch_name} --track origin/{branch_name}
```

## Fetch Changes from Remote

Fetch updates from the `origin` remote without changing your current branch or working files:
```bash
git fetch origin
```

The fetched branches are available as remote-tracking branches, such as `origin/main`. Fetching does not merge changes into your current branch.

## Pull Updates from Remote

Fetch and integrate updates from the current branch's configured upstream:

```bash
git pull
```

To fetch and merge a specific remote branch into your current branch:
```bash
git fetch origin
git merge origin/{branch_name}
```

For example, `git merge origin/development` merges the fetched `development` branch into the branch you currently have checked out.

## Check the Status of Local Changes

List the files you have changed and need to stage or commit:

```bash
git status
```

## Stage Your Files

To stage your files, use the `add` command.

###### Syntax
```bash
git add {file_path}
```

###### Examples

1. Add a specific file: `git add test/file.md`
2. Add an entire folder: `git add {folder_name}/`
3. Add files by extension: `git add '*.css'`
4. Stage all changes in the repository: `git add -A`

Review what will be committed with `git status` or `git diff --cached`.

## Commit Changes

To commit the staged changes:

###### Syntax
```bash
git commit -m "{message}"
```

###### Example
```bash
git commit -m "Test commit"
```

> **NOTE:**
> - Changes will not be pushed to the remote unless you explicitly push them.

## Push Changes to Remote

Push the current branch to its configured upstream:

```bash
git push
```

For a new branch that has no upstream yet:

```bash
git push --set-upstream origin {branch_name}
```

## Discard Local Changes

Discard unstaged changes to a tracked file:

```bash
git restore {file_path}
```

Unstage a file without discarding its edits:

```bash
git restore --staged {file_path}
```

Check `git status` first. `git restore {file_path}` discards unstaged tracked edits, while `git restore --staged {file_path}` preserves edits and only unstages the file. To preview untracked files and directories that Git would delete:

```bash
git clean --dry-run -d
```

Only after reviewing the preview, delete those untracked files and directories with:

```bash
git clean -f -d
```

`git clean` permanently deletes untracked files; it does not move them to the trash. Check its preview carefully before running it.

#### References
- <https://git-scm.com/docs>
- <https://git-scm.com/docs/git-switch>
- <https://git-scm.com/docs/git-restore>
- <https://git-scm.com/docs/git-clean>
