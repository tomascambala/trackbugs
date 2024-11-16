import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Issue } from '../../types/issue';

import './issueForm.css'

interface IssueFormProps {
    onSubmit: (issueData: Partial<Issue>) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ description, parentId, link });
        setDescription('');
        setParentId('');
        setLink('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formParentId">
                <Form.Label>Parent ID</Form.Label>
                <Form.Control
                    type="text"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formLink">
                <Form.Label>Log Link</Form.Label>
                <Form.Control
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            </Form.Group>

            <div className='container-button'>
                <Button variant="primary" type="submit">
                    Create Issue
                </Button>
            </div>

        </Form>
    );
};

export default IssueForm;
