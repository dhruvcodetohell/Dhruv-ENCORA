import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Repo } from "../types/Repo";
import { STALE_TIME_REPOS } from "../constants/queryConstants";

/**
 * Fetches a list of repositories from the API.
 * The base URL is set in the environment variables.
 * @returns A promise that resolves to an array of repositories.
 */

const fetchRepos = async (): Promise<Repo[]> => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_REPO_BASE_URL}/repos`
    );
    return data;
  } catch (error) {
    console.error("Error fetching repos:", error); // Optional logging or custom error handling
    throw error; // Ensure the error propagates to `react-query`
  }
};

/**
 * Custom hook to fetch and cache repository data.
 * Uses React Query to handle caching, background updates, and deduplication.
 *
 * @returns Query object containing:
 * - `data`: the fetched repository data.
 * - `isLoading`: loading state of the request.
 * - `error`: error object if the request fails.
 */
export const useFetchRepos = () => {
  return useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    staleTime: STALE_TIME_REPOS,
    retry: 2, // Retry failed requests twice before throwing an error
  });
};
