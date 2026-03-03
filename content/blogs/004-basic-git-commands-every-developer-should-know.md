---
title: "Basic Git commands: Every developer should know"
date: "2019-12-16"
excerpt: "A practical reference covering the essential Git commands for cloning, branching, staging, committing, pushing, and reverting changes."
category: "Git"
author: "Ramesh Kannan"
coverImage: "/images/004/basic-git-commands.png"
tags: ["git"]
---

> **Originally published** on [arasu-rrk.com](https://arasu-rrk.com/blog/basic-git-commands-every-developer-should-know).

[Git](https://en.wikipedia.org/wiki/Git) is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

Here are some basic Git commands you need to know.

## Clone the Repository

###### Syntax
`git clone {url}` — Here `{url}` represents the Git Repository URL

###### Example
```bash
git clone https://git.com/example/example-repository
```

By default, this command clones the default branch of the repository (in most cases, `master`). To clone a specific branch:

###### Syntax
```bash
git clone {url} -b {branch_name}
```

###### Example
```bash
git clone https://git.com/example/example-repository -b development
```

## Change Local Working Branch

To change the local working branch, use the `checkout` command.

###### Syntax
```bash
git checkout origin/{branch_name}
```

###### Example
```bash
git checkout origin/master
```

## Fetch Changes from Remote

To fetch all changes from remote, use the `fetch` command.

###### Syntax
```bash
git fetch --origin
```

> **NOTE:** This command will not merge the changes into the local branch.

## Pull Updates from Remote

To update the local branch:

###### Syntax
```bash
git pull
```

## Merge Changes from Another Branch

To merge changes from another remote branch:

###### Syntax
```bash
git pull --no-rebase "origin" {branch_name}
```

###### Example
```bash
git pull --no-rebase "origin" development
```

This command pulls all changes from the `development` branch and merges them locally.

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
2. Add an entire folder: `git add {folder_name}`
3. Add files by extension: `git add *.css`
4. Add all files: `git add .`

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
> - A commit message is required for all commits.
> - Changes will not be pushed to remote unless you explicitly push them.

## Push Changes to Remote

```bash
git push
```

## Revert All Local Changes

To discard all local uncommitted changes:

```bash
git reset --hard
```

## Delete Unstaged Files

To delete all untracked files:

```bash
git clean -df
```

**Options:**
- `-d` — Recurse into directories and delete.
- `-f` — Force delete.

#### References
- <https://git-scm.com/docs>
- <https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html>
