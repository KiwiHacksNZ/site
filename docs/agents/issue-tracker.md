# Issue tracker: KiwiHacksNZ org board

Issues for KiwiHacks work live on GitHub in the **KiwiHacksNZ** org, one repo per product, and every issue goes on the org project board: project 3 (https://github.com/orgs/KiwiHacksNZ/projects/3). This repo is `KiwiHacksNZ/site`, the public website, and its issues live in its own GitHub Issues.

## Creating issues

Always create issues through the `dev-create-github-issue` skill. It owns the rules: org templates word for word, at least two checkable acceptance criteria, existing labels only, the PII safety pass, the duplicate check, confirm before create, and adding the issue to project 3 with a Status. Do not call `gh issue create` directly.

## Picking the repo

- Use the KiwiHacksNZ repo the work belongs to: `KiwiHacksNZ/<name>`. Work on the website itself goes in `KiwiHacksNZ/site` (this repo).
- If the work belongs to another product repo, or the repo is unclear, ask.

## Other operations

Run every `gh` command with the stale token unset: `env -u GITHUB_TOKEN gh ...` in bash, or `Remove-Item Env:GITHUB_TOKEN -ErrorAction SilentlyContinue; gh ...` in PowerShell. Always pass `-R KiwiHacksNZ/<repo>`, so commands never depend on which repo `gh` infers from `git remote`.

- **Read an issue**: `gh issue view <n> -R KiwiHacksNZ/<repo> --json number,title,body,labels,comments`
- **List issues**: `gh issue list -R KiwiHacksNZ/<repo> --state open --json number,title,labels` with `--label` and `--search` filters. Across the whole board: `gh project item-list 3 --owner KiwiHacksNZ --format json`.
- **Comment**: `gh issue comment <n> -R KiwiHacksNZ/<repo> --body "..."`
- **Apply / remove labels**: `gh issue edit <n> -R KiwiHacksNZ/<repo> --add-label "..."` / `--remove-label "..."`. Only labels that already exist (`gh label list -R KiwiHacksNZ/<repo>`). Never create labels.
- **Triage state**: not a label. The five triage states are options of the Status field on project 3. See `docs/agents/triage-labels.md`.
- **Sub-issues**: `gh issue edit <parent> -R KiwiHacksNZ/<repo> --add-sub-issue <child>` (`gh` 2.94+). Fallback: `Part of #<parent>` at the top of the child body.
- **Blocking**: `gh issue edit <child> -R KiwiHacksNZ/<repo> --add-blocked-by <blocker>` (`gh` 2.94+). Fallback: `Blocked by: #<n>, #<n>` at the top of the child body. Across repos, write the full `KiwiHacksNZ/<repo>#<n>`.
- **Close**: post the explanation with `gh issue comment`, then `gh issue close <n> -R KiwiHacksNZ/<repo>`.
- **Board Status**: read field and option ids at runtime (`gh project field-list 3 --owner KiwiHacksNZ --format json`), never hardcode them. Set with `gh project item-edit`.

Comments, label changes and closes are outward-facing. Confirm with the developer before each one, the same as creation.

## Safety

This repo is public and readable by anyone, and other KiwiHacksNZ repos hold real user data, including minors' details. Never put names, emails, phone numbers or schools of attendees, guardians or users, or tokens, keys, `.env` values or unredacted logs, in an issue or comment. Never file into `mattpocock/skills`.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

## When a skill says "publish to the issue tracker"

Create the issue with the `dev-create-github-issue` skill, in the KiwiHacksNZ repo the work belongs to, and add it to project 3.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above, with `-R KiwiHacksNZ/<repo>`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as decision tickets.

**Home repo: `KiwiHacksNZ/site`.** Every wayfinder map and its tickets live there, whichever product the effort is about. The other repos do not carry the `wayfinder:*` labels, so do not chart a map anywhere else. This repo is that home.

### Required before charting a map

1. **Five labels on `KiwiHacksNZ/site`.** They exist (confirmed 2026-11-25). Re-check with `gh label list -R KiwiHacksNZ/site --limit 100`:
   - `wayfinder:map`
   - `wayfinder:research`
   - `wayfinder:prototype`
   - `wayfinder:grilling`
   - `wayfinder:task`

   Never create these labels yourself. If one has gone missing, stop and tell the developer which one, and have them create it in the site repo's label settings.
2. **Pick the repo for the work, not the map.** Because maps live in `site`, an effort about another repo (for example `nest`) still has its map in `site`. Its eventual implementation tickets, from `/to-tickets`, go in the repo the code lives in, through `dev-create-github-issue`.
3. **`gh` 2.94 or newer** for native sub-issues and blocking (`gh --version`; 2.103.3 is installed).
4. **Token scope `project`** to put issues on the board (`gh auth status`).

### Operations

- **Create the map and tickets.** This is the one exception to "always use `dev-create-github-issue`". Maps and decision tickets are not Bug or Feature issues, so the org templates and the two-acceptance-criteria rule do not apply. Create them with `gh issue create -R KiwiHacksNZ/site --label wayfinder:map` (or `--label wayfinder:<type>` for a ticket), using the body shapes from the `wayfinder` skill. Show the charted map and tickets to the developer and get a yes before creating them. Never file into `mattpocock/skills`.
- **Map**: a single issue labelled `wayfinder:map`, holding the Destination / Notes / Decisions so far / Not yet specified / Out of scope body.
- **Child ticket**: a GitHub sub-issue of the map: `gh issue create -R KiwiHacksNZ/site ... --parent <map>`, or `gh issue edit <map> -R KiwiHacksNZ/site --add-sub-issue <child>`. Labels: `wayfinder:<type>` only, one of `research`, `prototype`, `grilling`, `task`. Never a triage Status or the `bug` / `enhancement` labels.
- **Board**: add the map and every ticket to project 3 with Status `Backlog` (same steps as `dev-create-github-issue`, step 9). Never a triage state.
- **Blocking**: native, wired in a second pass once every ticket has a number: `gh issue edit <child> -R KiwiHacksNZ/site --add-blocked-by <blocker>`.
- **Frontier query**: the map's open sub-issues that have no open blocker and no assignee, first in map order:

  ```bash
  gh api repos/KiwiHacksNZ/site/issues/<map>/sub_issues --paginate \
    --jq '.[] | select(.state=="open") | {number, title, assignees: [.assignees[].login], open_blockers: .issue_dependencies_summary.blocked_by}'
  ```

  Keep the ones with `open_blockers == 0` and an empty `assignees`.
- **Claim**: `gh issue edit <n> -R KiwiHacksNZ/site --add-assignee @me`, before any work.
- **Resolve**: `gh issue comment <n> -R KiwiHacksNZ/site --body "<answer>"`, then `gh issue close <n> -R KiwiHacksNZ/site`, then append a one-line pointer to the map's "Decisions so far" with `gh issue edit <map> -R KiwiHacksNZ/site --body-file ...`.
- **Research branch**: research tickets resolve on a throwaway `research/<name>` branch in the `site` repo. Push it and open no PR. Ask first, since pushing is outward-facing.

### The home repo is public

`KiwiHacksNZ/site` is a public repo, so every map and ticket is readable by anyone: grilling notes, decisions, prototype links, and research findings. Treat each one as published. The safety rules above apply in full, plus:

- Nothing private or unannounced: no sponsor names or deal terms, no budget figures, no personal details of the team, attendees, guardians or users.
- Efforts that cannot be planned in public (sponsorship, finance, anything about a named person) do not get a map in `site`. Tell the developer and plan them in a session instead.
- Say so once when charting starts: "the map will be public on KiwiHacksNZ/site".
