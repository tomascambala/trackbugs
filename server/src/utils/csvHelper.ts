import fs from 'fs';
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';
import { Issue } from '../models/issue';

const filePath = './data/issues.csv';

export const readCSV = async (): Promise<Issue[]> => {
    return new Promise((resolve, reject) => {
        const issues: Issue[] = [];
        fs.createReadStream(filePath)
            .pipe(parse({ columns: true }))
            .on('data', (row) => issues.push(row as Issue))
            .on('end', () => resolve(issues))
            .on('error', (err) => reject(err));
    });
};

export const writeCSV = async (issues: Issue[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        const writableStream = fs.createWriteStream(filePath);
        const columns = ['id', 'description', 'parentId', 'status', 'creationTimestamp', 'link'];
        const stringifier = stringify({ header: true, columns });

        issues.forEach((issue) => stringifier.write(issue));
        stringifier.pipe(writableStream);
        writableStream.on('finish', resolve);
        writableStream.on('error', reject);
        stringifier.end();
    });
};
