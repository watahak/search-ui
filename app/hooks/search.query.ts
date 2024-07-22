import { useQuery } from "@tanstack/react-query";
import { QueryResponse, getResults, getSuggestions } from "~/api/search.api";
import { highlightText } from "~/utility/helpers";

export interface SearchResults extends Omit<QueryResponse, "ResultItems"> {
  results: {
    title: string;
    date: string | null;
    excerpt: string;
    source: string;
  }[];
}

export const useGetSuggestionsQuery = (suggestionQuery: string) => {
  const query = useQuery({
    queryKey: ["suggestions", suggestionQuery],
    queryFn: async () => {
      const response = await getSuggestions();
      return response.data.suggestions.slice(0, 6);
    },
    enabled: suggestionQuery.length > 1,
  });

  return query;
};

export const useGetResultsQuery = (resultsQuery: string | null) => {
  const query = useQuery({
    queryKey: ["results"],
    queryFn: async (): Promise<SearchResults> => {
      const response = await getResults();

      const { ResultItems, ...others } = response.data;

      const results = ResultItems.map((result) => {
        return {
          title: highlightText(
            result.DocumentTitle.Text,
            result.DocumentTitle.Highlights
          ),
          date: null,
          excerpt: highlightText(
            result.DocumentExcerpt.Text,
            result.DocumentExcerpt.Highlights
          ),
          source: result.DocumentURI,
        };
      });

      return {
        ...others,
        results,
      };
    },
    enabled: !!resultsQuery,
  });

  return query;
};
