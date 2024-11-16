import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Issue } from '../../types/issue';

interface IssueListProps {
    issues: Issue[];
    onClose: (id: string) => void;
}

const IssueList: React.FC<IssueListProps> = ({ issues, onClose }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {issues.map((issue) => (
                    <tr key={issue.id}>
                        <td>{issue.id}</td>
                        <td>{issue.description}</td>
                        <td>{issue.status}</td>
                        <td>
                            {issue.status === 'Open' && (
                                <Button variant="danger" onClick={() => onClose(issue.id)}>
                                    Close
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default IssueList;
