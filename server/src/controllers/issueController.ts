import { Request, Response } from 'express';
import { IssueService } from '../services/issueService';

const issueService = new IssueService();

export const getAllIssues = async (req: Request, res: Response): Promise<void> => {
    const issues = await issueService.getAllIssues();
    res.json(issues);
};

export const createIssue = async (req: Request, res: Response): Promise<void> => {
    const { description, parentId, link } = req.body;
    const newIssue = await issueService.createIssue(description, parentId, link);
    res.status(201).json(newIssue);
};

export const closeIssue = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedIssue = await issueService.closeIssue(id);
    if (!updatedIssue) {
        res.status(404).json({ error: 'Issue not found' });
    } else {
        res.json(updatedIssue);
    }
};
