import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IssueList from '../issueList/IssueList';
import { Issue } from '../../types/issue';

describe('IssueList Component', () => {
    const mockOnClose = jest.fn();

    const mockIssues: Issue[] = [
        {
            id: '1', description: 'Bug in login page', status: 'Open', link: 'http://example.com/log1',
            parentId: '',
            creationTimestamp: ''
        },
        {
            id: '2', description: 'Profile picture not loading', status: 'Closed', link: 'http://example.com/log2',
            parentId: '',
            creationTimestamp: ''
        },
    ];

    afterEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks after each test
    });

    it('renders the list of issues', () => {
        render(<IssueList issues={mockIssues} onClose={mockOnClose} />);

        // Check table headers
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();

        // Check issue descriptions
        expect(screen.getByText('Bug in login page')).toBeInTheDocument();
        expect(screen.getByText('Profile picture not loading')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked for an open issue', () => {
        render(<IssueList issues={mockIssues} onClose={mockOnClose} />);

        // Find the "Close" button for the first issue
        const closeButton = screen.getByText('Close');
        fireEvent.click(closeButton);

        // Check that onClose was called with the correct issue ID
        expect(mockOnClose).toHaveBeenCalledTimes(1);
        expect(mockOnClose).toHaveBeenCalledWith('1');
    });
});
