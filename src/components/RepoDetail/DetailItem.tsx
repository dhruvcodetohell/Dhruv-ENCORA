import React from "react";
import styles from "./RepoDetail.module.scss"; // Importing styles for the component

// Define the props expected by the DetailItem component
interface DetailItemProps {
  label: string; // The label to display for the item
  value: string | number | null | undefined; // The value of the item, which can be a string, number, or null/undefined
  noDataPlaceholder: string; // Placeholder text to display when the value is null or undefined
}

// Functional component for rendering a detail item
const DetailItem: React.FC<DetailItemProps> = ({ label, value, noDataPlaceholder }) => (
  <li>
    <span className={styles.label}>{label}</span> 
    <span className={styles.value}>{value ?? noDataPlaceholder}</span> 
  </li>
);

// Memoize the component to prevent unnecessary re-renders
export default React.memo(DetailItem);
