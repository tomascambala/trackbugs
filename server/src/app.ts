import express from 'express';
import cors from 'cors';
import issueRoutes from './routes/issueRoutes';
import bodyParser from 'body-parser';
import fs from 'fs';
import { notifyWebhooks } from './controllers/webhookController';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/issues', issueRoutes);

// Server instance
let server: ReturnType<typeof app.listen> | null = null;

// Watch the CSV file for changes
const csvFilePath = './data/issues.csv';
fs.watch(csvFilePath, async (eventType, filename) => {
    if (eventType === 'change') {
        console.log(`${filename} has been updated.`);
        const eventData = {
            event: 'csv_updated',
            timestamp: new Date().toISOString(),
            file: filename,
        };

        // Notify all subscribed webhooks
        await notifyWebhooks(eventData);
    }
});

// Function to start the server
export const startServer = (port: number = 5000): ReturnType<typeof app.listen> => {
    if (!server) {
        server = app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    }
    return server;
};

export const stopServer = async (): Promise<void> => {
    if (server) {
        await new Promise<void>((resolve, reject) => {
            server!.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Server closed.');
                    server = null; // Reset the server instance
                    resolve();
                }
            });
        });
    } else {
        console.warn('No server is running to close.');
    }
};


if (server === null) {
    startServer(5000);
}

