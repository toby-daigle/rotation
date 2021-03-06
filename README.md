# Action rotation

Github action to get next team member in rotation based on issue (PR) number

## Inputs

|      NAME      |                                             DESCRIPTION                                             |   TYPE   | REQUIRED |
| -------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| `members`      | Team members (Github usernames), separated with space                                               | `string` | `true`   |

## Example

```yaml
name: "Add Assignee"
on:
  pull_request:
    types: [opened, ready_for_review, reopened]

jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - name: 'Last assignee'
        uses: toby-daigle/rotation@v1.0.2
        with:
          members: toby-daigle jeremilc JsGarneau Pierregagne julienchouinard
        id: rotation
      - name: 'Add assignee'
        uses: actions-ecosystem/action-add-assignees@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          assignees: ${{ steps.rotation.outputs.next }}

```

