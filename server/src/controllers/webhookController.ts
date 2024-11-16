import { Request, Response } from 'express';

let webhookSubscribers: string[] = []; // Stores webhook URLs

// Subscribe an external webhook URL
export const subscribeWebhook = (req: Request, res: Response): void => {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: 'Webhook URL is required' });
        return;
    }

    // Add URL to subscribers if not already added
    if (!webhookSubscribers.includes(url)) {
        webhookSubscribers.push(url);
        res.status(200).json({ message: 'Webhook subscribed successfully.' });
    } else {
        res.status(200).json({ message: 'Webhook already subscribed.' });
    }
};

// Notify all subscribers
export const notifyWebhooks = async (eventData: any): Promise<void> => {
    for (const url of webhookSubscribers) {
        try {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });
            console.log(`Webhook notified: ${url}`);
        } catch (err) {
            console.error(`Failed to notify webhook: ${url}`, err);
        }
    }
};
