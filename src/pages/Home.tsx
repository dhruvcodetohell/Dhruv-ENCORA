import React, { Suspense } from 'react';
import content from '../assets/content.json'
// Lazy load RepoList component
const RepoList = React.lazy(() => import('../components/RepoList/RepoList'));


const Home: React.FC = () => {
    return (
        <div>
            <Suspense fallback={<div>{content?.titles?.loadingMessage}</div>}>
                <RepoList />
            </Suspense>
        </div>
    );
};

export default Home;
