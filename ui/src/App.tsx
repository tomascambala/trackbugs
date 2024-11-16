import React from 'react';
import { Container } from 'react-bootstrap';
import { useIssues } from './hooks/useIssues';
import IssueForm from './components/issueForm/IssueForm';
import IssueList from './components/issueList/IssueList';

const App: React.FC = () => {
  const { issues, loading, addIssue, closeIssueById } = useIssues();

  return (
    <Container>
      <h1>Bug Tracker</h1>
      <IssueForm onSubmit={addIssue} />
      {loading ? <p>Loading...</p> : <IssueList issues={issues} onClose={closeIssueById} />}
    </Container>
  );
};

export default App;