// Defines the schema for a GitHub repository
export interface Repo {
    id: number;                        // Unique identifier for the repository
    name: string;                      // Repository name
    description: string | null;        // Description of the repository (nullable)
    html_url: string;                  // URL to the repository on GitHub
    language: string | null;           // Primary programming language (nullable)
    forks_count: number;               // Number of forks
    open_issues_count: number;         // Number of open issues
    watchers_count: number;            // Number of watchers (subscribers)
    archived: boolean;                 // Archived status of the repository
    license: {                         // License information (nullable)
        key: string;                   // License key
        name: string;                  // License name
        url: string;                   // URL to the license details
    } | null;
}
