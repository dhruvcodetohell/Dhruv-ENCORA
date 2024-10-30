// TypeScript interface for Vite environment variables
// This interface allows TypeScript to recognize and type-check custom environment variables set up in Vite.

interface ImportMetaEnv {
  // Base URL for repository API requests (e.g., "https://api.example.com")
  readonly VITE_REPO_BASE_URL: string;

  // URL for fetching detailed information about a specific repository
  readonly VITE_REPO_DETAIL_URL: string;
}

interface ImportMeta {
  // Extends the ImportMeta interface to include a typed `env` object
  // This ensures that TypeScript is aware of the `env` properties
}
