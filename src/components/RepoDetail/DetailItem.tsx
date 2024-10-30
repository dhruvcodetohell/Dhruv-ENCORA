// DetailItem.tsx
import React from "react";
import styles from "./RepoDetail.module.scss";

interface DetailItemProps {
  label: string;
  value: string | number | null | undefined;
  noDataPlaceholder: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, noDataPlaceholder }) => (
  <li>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value ?? noDataPlaceholder}</span>
  </li>
);

export default React.memo(DetailItem);
