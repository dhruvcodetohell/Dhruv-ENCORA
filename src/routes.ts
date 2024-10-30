// Define all route paths as constants
export const ROUTES = {
  REPO_DETAIL: (repoName: string = ":repoName") => `/repo/${repoName}`, // Dynamic route
};
