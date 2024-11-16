import { Router } from 'express';
import { getAllIssues, createIssue, closeIssue } from '../controllers/issueController';
import { subscribeWebhook } from '../controllers/webhookController';

const router = Router();

router.get('/', getAllIssues);
router.post('/', createIssue);
router.post('/:id/close', closeIssue);

// Webhook subscription endpoint
router.post('/subscribe-webhook', subscribeWebhook);

export default router;
