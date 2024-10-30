import React from "react";
import styles from "./RepoDetail.module.scss";

interface LicenseLinkProps {
  name: string;
  url: string;
}

/**
 * Renders a link to the repository's license.
 */
const LicenseLink: React.FC<LicenseLinkProps> = ({ name, url }) => (
  <li>
    <span className={styles.label}>License</span>
    <span className={styles.value}>
      {/* Link to the license URL, opens in a new tab */}
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {name}
      </a>
    </span>
  </li>
);

export default React.memo(LicenseLink);
