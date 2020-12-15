import { context } from '@actions/github';
import { error, getInput, setFailed, setOutput } from '@actions/core'

function splitUsernameList(text: string): string[] {
    return text.split(/\s+/).filter((el) => el != '');
}

export async function run(): Promise<void> {
    try {
        const members = getInput('members', { required: true });
        const prNumber = context.issue.number;

        const usernames = splitUsernameList(members);
        const memberCount = usernames.length;

        const nextAssigneeIndex = prNumber % memberCount;
        const nextAssignee = usernames[nextAssigneeIndex];

        setOutput('next', nextAssignee);
    } catch (e) {
        error(e);
        setFailed(e.message);
    }
}

run();
