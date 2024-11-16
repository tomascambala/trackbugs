import axios from 'axios';
import { Issue } from '../types/issue';

const API_URL = 'http://localhost:5000/api/issues';

export async function fetchIssues(): Promise<Issue[]> {
    const response = await axios.get(API_URL);
    return response.data;
}

export async function createIssue(issueData: Partial<Issue>): Promise<Issue> {
    const response = await axios.post(API_URL, issueData);
    return response.data;
}

export async function closeIssue(id: string): Promise<void> {
    await axios.post(`${API_URL}/${id}/close`);
}
