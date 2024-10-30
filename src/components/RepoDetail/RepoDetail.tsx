import React from "react";
import { useParams } from "react-router-dom";
import { useFetchRepoDetails } from "../../hooks/useFetchRepoDetails";
import { useContent } from "../../hooks/useContent";
import styles from "./RepoDetail.module.scss";
import DetailItem from "./DetailItem";
import LicenseLink from "./LicenseLink";

/**
 * Displays detailed information about a GitHub repository.
 * Handles loading, error, and data display states.
 */
const RepoDetail: React.FC = () => {
  const { repoName } = useParams<{ repoName: string }>();
  const { data: repo, isLoading, error } = useFetchRepoDetails(repoName || "");
  const { titles, labels, placeholders } = useContent();

  if (isLoading) return <div>{titles.repoDetailsLoading}</div>;
  if (error) return <div>{titles.repoDetailsError}</div>;

  return (
    <div className={styles.repoDetailContainer}>
      <h1>{repo?.name}</h1>
      <p>{repo?.description || placeholders.noDescription}</p>

      {/* Link to the repository on GitHub */}
      <a href={repo?.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {labels.goToGitHub}
      </a>

      <ul>
        {/* Pass placeholders.noLanguage as noDataPlaceholder */}
        <DetailItem label={labels?.language} value={repo?.language} noDataPlaceholder={placeholders.noLanguage} />
        <DetailItem label={labels?.forks} value={repo?.forks_count ?? 0} noDataPlaceholder={placeholders.noData} />
        <DetailItem label={labels?.openIssues} value={repo?.open_issues_count ?? 0} noDataPlaceholder={placeholders.noData} />
        <DetailItem label={labels?.watchers} value={repo?.watchers_count ?? 0} noDataPlaceholder={placeholders.noData} />
        {repo?.license && <LicenseLink name={repo?.license?.name} url={repo?.license.url} />}

        {/* Display archived status if applicable */}
        {repo?.archived && (
          <li className={styles.archived}>
            <span className={styles.value}>{labels.archived}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RepoDetail;
