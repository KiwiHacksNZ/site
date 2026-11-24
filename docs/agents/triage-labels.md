# Triage roles

The `triage` skill speaks in terms of seven canonical roles: two **category** roles and five **state** roles. This file maps them onto how the KiwiHacksNZ org tracks work. The five state roles are options of the **Status** field on org project 3 (https://github.com/orgs/KiwiHacksNZ/projects/3), which is the source of truth for every repo. `KiwiHacksNZ/site` also mirrors them as labels. The two category roles are repo labels.

## State roles: Status field on project 3

| Role in mattpocock/skills | Status option on project 3 | Meaning                                  |
| ------------------------- | -------------------------- | ---------------------------------------- |
| `needs-triage`            | `needs-triage`             | Maintainer needs to evaluate this issue  |
| `needs-info`              | `needs-info`               | Waiting on reporter for more information |
| `ready-for-agent`         | `ready-for-agent`          | Fully specified, ready for an AFK agent  |
| `ready-for-human`         | `ready-for-human`          | Requires human implementation            |
| `wontfix`                 | `wontfix`                  | Will not be actioned                     |

Status is a single-select field, so an issue holds exactly one state at a time, which is what triage expects.

**Apply a state.** Read the field and option ids at runtime (never hardcode them), then set it:

```bash
env -u GITHUB_TOKEN gh project item-add 3 --owner KiwiHacksNZ --url <issue-url> --format json   # returns the item id, safe to repeat
env -u GITHUB_TOKEN gh project view 3 --owner KiwiHacksNZ --format json --jq .id                 # project id
env -u GITHUB_TOKEN gh project field-list 3 --owner KiwiHacksNZ --format json                    # Status field id and option ids
env -u GITHUB_TOKEN gh project item-edit --id <item-id> --project-id <project-id> \
  --field-id <status-field-id> --single-select-option-id <option-id>
```

In PowerShell, use `Remove-Item Env:GITHUB_TOKEN -ErrorAction SilentlyContinue;` in place of `env -u GITHUB_TOKEN`.

**Read states.** `gh project item-list 3 --owner KiwiHacksNZ --limit 200 --format json` returns each item with `status`, `repository`, `labels` and `content.url`. Filter on `status`.

**Triage buckets on this board:**

- **Unlabeled (never triaged)**: on the board with Status `Backlog`, or with no Status. `dev-create-github-issue` puts every new issue in `Backlog`, so `Backlog` is the entry point, not `needs-triage`.
- **`needs-triage`**: evaluation in progress.
- **`needs-info` with reporter activity since the last triage notes**: read the issue's comments to check.

**Shared field.** Status also holds the board's workflow columns: `Backlog`, `Ready`, `In progress`, `In review`, `Done`. An issue has one value at a time, so a triage state ends when work starts and the workflow column takes over. `ready-for-agent` and `ready-for-human` are the hand-off out of triage; move the issue to `In progress` when someone picks it up.

**`wontfix`.** Set the Status option, post the explanation comment, then close the issue. The Status option is the source of truth. Repos also carry a default `wontfix` label, which is only applied on `KiwiHacksNZ/site` (see the mirror section below); elsewhere, leave it alone.

## Mirror labels on `KiwiHacksNZ/site`

The `site` repo also carries labels named `needs-triage`, `needs-info`, `ready-for-agent` and `ready-for-human`, so its issue list can be filtered by state. `wontfix` is the repo's default label. No other repo has them.

The Status field stays the source of truth. For an issue in `KiwiHacksNZ/site` only, whenever triage sets a state, also apply the matching label and remove the previous state's label, so the two never disagree:

```bash
gh issue edit <n> -R KiwiHacksNZ/site --add-label "needs-info" --remove-label "needs-triage"
```

For `wontfix`, apply the `wontfix` label, set the Status option, comment, then close. On any other repo, set Status only. If a label is missing on `site`, tell the developer and carry on with Status alone.

## Category roles: repo labels

| Role in mattpocock/skills | Label in our repos | Meaning                       |
| ------------------------- | ------------------ | ----------------------------- |
| `bug`                     | `bug`              | Something is broken           |
| `enhancement`             | `enhancement`      | New feature or improvement    |

Both are GitHub default labels and exist on the KiwiHacksNZ repos checked so far. Apply with `gh issue edit <n> -R KiwiHacksNZ/<repo> --add-label "bug"`. Check with `gh label list -R KiwiHacksNZ/<repo>` first, and never create labels: if one is missing, tell the developer. The org Feature template applies a `feature` label that these repos do not have; for triage, a feature request is `enhancement`.

## Rules

- Triage only issues on project 3. Add an issue to the board first (`gh project item-add`, safe to repeat).
- Wayfinder maps and their tickets carry no triage state. They are decision tickets, not implementation work. Leave them in `Backlog`.
- Every comment triage posts starts with the disclaimer line the `triage` skill requires.
- Safety rules from `docs/agents/issue-tracker.md` apply to every triage comment, including agent briefs.
