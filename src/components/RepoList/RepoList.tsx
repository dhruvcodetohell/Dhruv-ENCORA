import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { useFetchRepos } from "../../hooks/useFetchRepos";
import { useContent } from "../../hooks/useContent";
import { ROUTES } from "../../routes";
import styles from "./RepoList.module.scss";
import RepoTableRow from "./RepoListRow";
import NoData from "./NoData";
import { tableHeaders } from "../../constants/tableHeaders";

interface RepoTableProps {
  baseRoute?: (repoName: string) => string; // Accepts a function for dynamic routes
}

const RepoTable: React.FC<RepoTableProps> = ({
  baseRoute = ROUTES.REPO_DETAIL,
}) => {
  const { data: repos = [], isLoading, error } = useFetchRepos();
  const { titles, labels } = useContent();
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    setPage(0); // Reset page on data change
  }, [repos?.length]);

  // Memoized pagination of displayed repos
  const displayedRepos = useMemo(() => {
    return repos?.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [repos, page, rowsPerPage]);

  // Page change handler memoized for stable reference
  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  if (isLoading) return <div>{titles.loadingMessage}</div>;
  if (error) return <div>{titles.errorMessage}</div>;

  return (
    <Paper className={styles?.tableContainer}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeadRow}>
              {tableHeaders.map((header) => (
                <TableCell key={header.labelKey}>
                  {labels[header.labelKey as keyof typeof labels]}{" "}
                  {/* Type assertion to access labels */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>  
            {displayedRepos?.length > 0 ? (
              displayedRepos?.map((repo) => (
                <RepoTableRow key={repo.id} repo={repo} baseRoute={baseRoute} />
              ))
            ) : (
              <NoData message={titles?.noReposMessage} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={repos.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]} // Disable rows per page selection
      />
    </Paper>
  );
};

export default React.memo(RepoTable);
