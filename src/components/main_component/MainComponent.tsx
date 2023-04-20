import React, { useState } from 'react';
import { Repository } from '../../interfaces/repository.interface';
import '../main_component/MainComponent.scss';

function MainComponent(): JSX.Element {
    const [query, setQuery] = useState<string>('');
    const [repository, setRepos] = useState<Repository[]>([]);
    const [repositoryOwner, setRepositoryOwner] = useState<string>('');
    const [repositoryToFind, setRepositoryToFind] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        const [ownerName, repoName] = query.split('/').slice(-2);
        const response = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}/issues`);
        const data = await response.json();
        setRepos(data);
        setRepositoryOwner(ownerName);
        setRepositoryToFind(repoName);
    };

    return (
        <div className="mainContentBlock">
            <header>
                <input type="text" value={query} onChange={handleInputChange} />
                <button onClick={handleSearch}>Search</button>
                {repository.length > 0 && (
                    <div>
                        <a href={`https://github.com/${repositoryOwner}`}
                           target="_blank"
                           rel="noopener noreferrer">
                            {repositoryOwner}
                        </a>
                        <span> / </span>
                        <a href={`https://github.com/${repositoryOwner}/${repositoryToFind}`}
                           target="_blank"
                           rel="noopener noreferrer">
                            {repositoryToFind}
                        </a>
                    </div>
                )}
            </header>
            <main>
                {repository.map(repo => (
                    <div key={repo.id}>
                        <a href={repo.url}>{repo.title}</a>
                    </div>
                ))}
                {repository.length === 0 && <p>No issues found.</p>}
            </main>
        </div>
    );
}

export default MainComponent;