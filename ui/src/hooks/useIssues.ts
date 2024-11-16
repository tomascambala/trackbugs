import { useState, useEffect } from 'react';
import { fetchIssues, createIssue, closeIssue } from '../services/api';
import { Issue } from '../types/issue';

export function useIssues() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadIssues() {
            const data = await fetchIssues();
            setIssues(data);
            setLoading(false);
        }
        loadIssues();
    }, []);

    const addIssue = async (issueData: Partial<Issue>) => {
        const newIssue = await createIssue(issueData);
        setIssues([...issues, newIssue]);
    };

    const closeIssueById = async (id: string) => {
        await closeIssue(id);
        setIssues(issues.map(issue => (issue.id === id ? { ...issue, status: 'Closed' } : issue)));
    };

    return { issues, loading, addIssue, closeIssueById };
}
