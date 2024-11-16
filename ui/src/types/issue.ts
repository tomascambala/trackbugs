export interface Issue {
    id: string;
    description: string;
    parentId: string;
    status: 'Open' | 'Closed';
    creationTimestamp: string;
    link: string;
}