import { Given, When, Then } from '@cucumber/cucumber';
import fetch from 'node-fetch';

interface Issue {
    id: string;
    description: string;
    parentId: string;
    status: 'Open' | 'Closed';
    creationTimestamp: string;
    link: string;
}

const BASE_URL = 'http://localhost:5000/api/issues'; // Adjust based on your app's config

let createdIssue: Issue | null = null;

Given('there are issues in the system', async function () {
    const response = await fetch(BASE_URL, { method: 'GET' });
    const issues = (await response.json()) as Issue[]; // Explicitly cast response to Issue[]
    if (issues.length === 0) {
        await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: 'Sample issue',
                parentId: 'I-0',
                link: 'http://example.com',
            }),
        });
    }
});

When('I fetch all issues', async function () {
    const response = await fetch(BASE_URL, { method: 'GET' });
    this.issues = (await response.json()) as Issue[]; // Explicitly cast response to Issue[]
});

Then('I should see a list of issues', function () {
    const issues = this.issues as Issue[];
    if (!issues || issues.length === 0) {
        throw new Error('No issues found');
    }
});

Given('I have a bug description {string} and a log link {string}', function (description: string, link: string) {
    this.issueData = { description, link };
});

When('I create the issue', async function () {
    const { description, link } = this.issueData;
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, parentId: 'I-0', link }),
    });

    createdIssue = (await response.json()) as Issue; // Explicitly cast response to Issue
});

Then('the issue should appear in the list of issues', async function () {
    const response = await fetch(BASE_URL, { method: 'GET' });
    const issues = (await response.json()) as Issue[]; // Explicitly cast response to Issue[]
    const exists = issues.some((issue: Issue) => issue.id === createdIssue?.id);
    if (!exists) {
        throw new Error('Created issue not found');
    }
});
