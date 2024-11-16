import { Issue } from '../models/issue';
import { readCSV, writeCSV } from '../utils/csvHelper';
import { v4 as uuidv4 } from 'uuid';

export class IssueService {
    async getAllIssues(): Promise<Issue[]> {
        // can be later google spreadsheet, office 365, etc.
        return readCSV();
    }

    async createIssue(description: string, parentId: string, link: string): Promise<Issue> {
        const issues = await readCSV();
        const newIssue: Issue = {
            id: `I-${uuidv4()}`,
            description,
            parentId,
            status: 'Open',
            creationTimestamp: new Date().toISOString(),
            link,
        };
        issues.push(newIssue);
        await writeCSV(issues);
        return newIssue;
    }

    async closeIssue(id: string): Promise<Issue | null> {
        const issues = await readCSV();
        const issueIndex = issues.findIndex((issue) => issue.id === id);
        if (issueIndex === -1) return null;
        issues[issueIndex].status = 'Closed';
        await writeCSV(issues);
        return issues[issueIndex];
    }
}
