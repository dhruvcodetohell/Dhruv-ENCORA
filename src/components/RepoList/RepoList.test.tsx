import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RepoList from "./RepoList";
import { useFetchRepos } from "../../hooks/useFetchRepos";
import { useContent } from "../../hooks/useContent";
import { mockRepos } from "../../../jest-mocks/mockRepos";
import { mockLabels } from "../../../jest-mocks/mockLabels";
import { mockTitles } from "../../../jest-mocks/mockTitles";
import "@testing-library/jest-dom";

// Mock the hooks used in RepoList to simulate data fetching and content
jest.mock("../../hooks/useFetchRepos", () => ({
  useFetchRepos: jest.fn(),
}));
jest.mock("../../hooks/useContent", () => ({
  useContent: jest.fn(),
}));

describe("RepoList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup common mock return values for useContent hook
    (useContent as jest.Mock).mockReturnValue({
      titles: mockTitles,
      labels: mockLabels,
    });
  });

  it("renders loading message when data is being fetched", () => {
    // Mock loading state for useFetchRepos
    (useFetchRepos as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoList />
      </BrowserRouter>
    );

    // Assert that loading message is displayed during data fetch
    expect(screen.getByText(mockTitles.loadingMessage)).toBeInTheDocument();
  });

  it("renders error message if there's an error fetching data", () => {
    // Mock error state for useFetchRepos
    (useFetchRepos as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <BrowserRouter>
        <RepoList />
      </BrowserRouter>
    );

    // Assert that error message is displayed when data fetching fails
    expect(screen.getByText(mockTitles.errorMessage)).toBeInTheDocument();
  });

  it("displays table headers correctly based on JSON content", () => {
    // Mock successful fetch with data
    (useFetchRepos as jest.Mock).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoList />
      </BrowserRouter>
    );

    // Verify that table headers are displayed as per mock labels
    expect(screen.getByText(mockLabels.repositoryName)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.forks)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.openIssues)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.watchers)).toBeInTheDocument();
  });

  it("displays a list of repositories correctly", () => {
    // Mock data to simulate repository list display
    (useFetchRepos as jest.Mock).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoList />
      </BrowserRouter>
    );

    // Assert that each repository from mock data is displayed with correct information
    mockRepos.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      expect(screen.getByText(repo.forks_count.toString())).toBeInTheDocument();
      expect(screen.getByText(repo.open_issues_count.toString())).toBeInTheDocument();
      expect(screen.getByText(repo.watchers_count.toString())).toBeInTheDocument();
    });
  });

  it("navigates to the correct link when a repository name is clicked", () => {
    // Mock data for navigation testing
    (useFetchRepos as jest.Mock).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoList />
      </BrowserRouter>
    );

    // Check that the link for each repository name leads to the correct detail page
    const repoLink = screen.getByText(mockRepos[0].name);
    expect(repoLink.closest("a")).toHaveAttribute("href", `/repo/${mockRepos[0].name}`);
  });

  it("paginates to the next page when the next button is clicked", async () => {
    // Mock data to test pagination functionality
    (useFetchRepos as jest.Mock).mockReturnValue({
      data: [...mockRepos],
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoList />
      </BrowserRouter>
    );

    // Verify initial page displays first 10 repositories
    mockRepos.slice(0, 10).forEach((repo) => {
      const elements = screen.getAllByText(repo.name);
      expect(elements).toHaveLength(1); // Ensures each name appears only once per page
    });

    // Click the next page button to navigate
    const nextButton = screen.getByLabelText("Go to next page");
    fireEvent.click(nextButton);

    // Use waitFor to handle async pagination update and verify second page content
    await waitFor(() => {
      mockRepos.slice(10, 20).forEach((repo) => {
        const elements = screen.getAllByText(repo.name);
        expect(elements).toHaveLength(1);
      });
    });
  });
});
