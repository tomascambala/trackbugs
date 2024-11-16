import { Router } from 'express';
import { getAllIssues, createIssue, closeIssue } from '../controllers/issueController';

const router = Router();

router.get('/', getAllIssues);
router.post('/', createIssue);
router.post('/:id/close', closeIssue);

export default router;
