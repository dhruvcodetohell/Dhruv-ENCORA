import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./RepoList.module.scss";

interface Repo {
  id: number;
  name: string;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  html_url: string;
}

interface RepoTableRowProps {
  repo: Repo;
  baseRoute: (repoName: string) => string;
}

/**
 * Renders a row in the repository table, displaying repo details and a link to the repo detail page.
 */
const RepoTableRow: React.FC<RepoTableRowProps> = ({ repo, baseRoute }) => (
  <TableRow key={repo.id} className={styles.tableRow}>
    {/* Repo name with link to detailed page */}
    <TableCell>
      <Link to={baseRoute(repo.name)} className={styles.repoLink}>
        {repo.name}
      </Link>
    </TableCell>
    {/* Display forks, open issues, and watchers count */}
    <TableCell>{repo.forks_count ?? 0}</TableCell>
    <TableCell>{repo.open_issues_count ?? 0}</TableCell>
    <TableCell>{repo.watchers_count ?? 0}</TableCell>
  </TableRow>
);

export default React.memo(RepoTableRow);
