import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RepoDetail from "./RepoDetail";
import { useFetchRepoDetails } from "../../hooks/useFetchRepoDetails";
import { useContent } from "../../hooks/useContent";
import { mockRepos } from "../../../jest-mocks/mockRepos";
import { mockLabels } from "../../../jest-mocks/mockLabels";
import { mockTitles } from "../../../jest-mocks/mockTitles";
import { mockPlaceholders } from "../../../jest-mocks/mockPlaceholder"; // Import the mock placeholders
import "@testing-library/jest-dom";

// Mock the hooks used in RepoDetail
jest.mock("../../hooks/useFetchRepoDetails", () => ({
  useFetchRepoDetails: jest.fn(),
}));

jest.mock("../../hooks/useContent", () => ({
  useContent: jest.fn(),
}));

describe("RepoDetail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock common content data to avoid repetition
    (useContent as jest.Mock).mockReturnValue({
      titles: mockTitles,
      labels: mockLabels,
      placeholders: mockPlaceholders, // Use centralized mock placeholders
    });
  });

  it("displays loading message while data is being fetched", () => {
    // Set mock for loading state
    (useFetchRepoDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(mockTitles.repoDetailsLoading)).toBeInTheDocument();
  });

  it("displays error message when data fetching fails", () => {
    // Set mock for error state
    (useFetchRepoDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <BrowserRouter>
        <RepoDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(mockTitles.repoDetailsError)).toBeInTheDocument();
  });

  it("displays repository details correctly", () => {
    // Set mock data for a successful fetch
    const mockRepo = mockRepos[0];
    (useFetchRepoDetails as jest.Mock).mockReturnValue({
      data: mockRepo,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoDetail />
      </BrowserRouter>
    );

    // Check basic repository details
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description || mockPlaceholders.noDescription)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.language)).toBeInTheDocument();
    expect(screen.getByText(mockRepo.language || mockPlaceholders.noLanguage)).toBeInTheDocument();

    // License link check if license data exists
    if (mockRepo.license) {
      const licenseLink = screen.getByText(mockRepo.license.name);
      expect(licenseLink).toHaveAttribute("href", mockRepo.license.url);
    }

    // Archived status check if repository is archived
    if (mockRepo.archived) {
      expect(screen.getByText(mockLabels.archived)).toBeInTheDocument();
    }
  });

  it("renders placeholders for missing fields", () => {
    // Set mock data with missing fields
    (useFetchRepoDetails as jest.Mock).mockReturnValue({
      data: {
        name: "Repo with Missing Fields",
        description: null,
        language: null,
        forks_count: 0,
        open_issues_count: 0,
        watchers_count: 0,
        license: null,
        archived: false,
      },
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <RepoDetail />
      </BrowserRouter>
    );

    // Check placeholder text for missing fields
    expect(screen.getByText("Repo with Missing Fields")).toBeInTheDocument();
    expect(screen.getByText(mockPlaceholders.noDescription)).toBeInTheDocument();
    expect(screen.getByText(mockPlaceholders.noLanguage)).toBeInTheDocument();
  });
});
