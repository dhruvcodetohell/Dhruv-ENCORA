import React from "react";
import { TableRow, TableCell } from "@mui/material";
import styles from "./RepoList.module.scss";

interface NoDataProps {
  message: string;
}

/**
 * Displays a message when there is no data available in the table.
 */
const NoData: React.FC<NoDataProps> = ({ message }) => (
  <TableRow>
    {/* Full-width cell to display no data message */}
    <TableCell colSpan={4} className={styles.noData}>
      {message}
    </TableCell>
  </TableRow>
);

export default NoData;
