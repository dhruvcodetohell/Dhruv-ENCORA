import React from 'react';
import RepoDetail from '../components/RepoDetail/RepoDetail';

/**
 * Page component for displaying detailed information about a specific repository.
 * Wraps the RepoDetail component.
 */
const RepoDetailPage: React.FC = () => {
    return (
        <div>
            <RepoDetail />
        </div>
    );
};

export default RepoDetailPage;
