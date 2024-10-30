// Defines custom environment variable types for Vite in TypeScript.
// This allows TypeScript to recognize and type-check the environment variables set up in the Vite project.

interface ImportMetaEnv {
  // Base URL for repository API requests
  readonly VITE_REPO_BASE_URL: string; 

  // URL for fetching detailed information about a specific repository
  readonly VITE_REPO_DETAIL_URL: string;

  // Add other environment variables as needed, following the same pattern
}

interface ImportMeta {
  // Extends the ImportMeta interface to include the typed env object
  readonly env: ImportMetaEnv;
}
