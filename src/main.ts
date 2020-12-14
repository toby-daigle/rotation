import { context } from '@actions/github';
import { debug, error, getInput, setFailed, setOutput } from '@actions/core'

export function splitUsernameList(text: string): string[] {
    return text.split(/\s+/).filter((el) => el != '');
}

export async function run(): Promise<void> {
    try {
        const members = getInput('members', { required: true });
        const prNumber = context.issue.number;

        const usernames = splitUsernameList(members);

        debug(`Pr Number: ${prNumber}`);

        const nextAssigneeIndex = prNumber % usernames.length;
        const nextAssignee = usernames[nextAssigneeIndex];
        debug(`Next assignee: ${usernames}`);

        setOutput('next', nextAssignee);
    } catch (e) {
        error(e);
        setFailed(e.message);
    }
}

run();
