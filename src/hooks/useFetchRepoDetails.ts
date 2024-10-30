import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Repo } from '../types/Repo';

/**
 * Fetches details of a specific GitHub repository.
 * @param repoName - The repository name.
 * @returns Repository data.
 */
const fetchRepoDetails = async (repoName: string): Promise<Repo> => {
  const { data } = await axios.get(`${import.meta.env.VITE_REPO_DETAIL_URL}/${repoName}`);
  return data;
};

/**
 * Hook to fetch and cache GitHub repository details using react-query.
 * @param repoName - The repository name.
 * @returns Query object with data, loading, and error states.
 */
export const useFetchRepoDetails = (repoName: string) => {
  return useQuery({
    queryKey: ['repo', repoName], // Cache key based on repo name
    queryFn: () => fetchRepoDetails(repoName),
    enabled: !!repoName, // Runs only if repoName is provided
  });
};
