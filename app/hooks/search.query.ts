import { useQuery } from "@tanstack/react-query";
import { QueryResponse, getResults, getSuggestions } from "~/api/search.api";
import { highlightTextByQuery } from "~/utility/helpers";

export interface SearchResults extends Omit<QueryResponse, "ResultItems"> {
  results: {
    title: string;
    date: string | null;
    excerpt: string;
    source: string;
  }[];
}

export const useGetSuggestionsQuery = (suggestionQuery: string) => {
  suggestionQuery = suggestionQuery.trim();

  const query = useQuery({
    queryKey: ["suggestions", suggestionQuery],
    queryFn: async () => {
      const response = await getSuggestions();
      return response.data.suggestions
        .filter((s) => s.toLowerCase().includes(suggestionQuery.toLowerCase()))
        .slice(0, 6)
        .map((s) => {
          return { text: highlightTextByQuery(s, suggestionQuery), value: s };
        });
    },
    enabled: suggestionQuery.length > 2,
  });

  return query;
};

export const useGetResultsQuery = (resultsQuery: string) => {
  resultsQuery = resultsQuery.trim();

  const query = useQuery({
    queryKey: ["results", resultsQuery],
    queryFn: async (): Promise<SearchResults> => {
      const response = await getResults();

      const { ResultItems, ...others } = response.data;

      const results = ResultItems.filter((s) =>
        s.DocumentExcerpt.Text.toLowerCase().includes(
          resultsQuery.toLowerCase()
        )
      ).map((result) => {
        return {
          title: highlightTextByQuery(result.DocumentTitle.Text, resultsQuery),
          date: null,
          excerpt: highlightTextByQuery(
            result.DocumentExcerpt.Text,
            resultsQuery
          ),
          source: result.DocumentURI,
        };
      });

      return {
        ...others,
        results,
      };
    },
    enabled: !!resultsQuery.length,
  });

  return query;
};
