import { startServer, stopServer } from '../src/app';
import request from 'supertest';

let address: string;

beforeAll(async () => {
    const server = startServer(0); // Dynamic port
    const { port } = server.address() as { port: number };
    address = `http://localhost:${port}`;
});

afterAll(async () => {
    await stopServer(); // Await server shutdown
});

describe('Issue Controller', () => {
    it('should fetch all issues', async () => {
        const response = await request(address).get('/api/issues');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Expect an array of issues
    });

    it('should create a new issue', async () => {
        const newIssue = {
            description: 'Test Issue',
            parentId: 'I-0',
            link: 'http://example.com/log',
        };

        const response = await request(address)
            .post('/api/issues')
            .send(newIssue)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.description).toBe(newIssue.description);
    });
});
