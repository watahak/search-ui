import axios from "axios";

export type SuggestionResponse = {
  stemmedQueryTerm: string;
  suggestions: string[];
};

export type QueryResponse = {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: ResultItem[];
};

export type ResultItem = {
  DocumentId: string;
  DocumentTitle: DocumentContent;
  DocumentExcerpt: DocumentContent;
  DocumentURI: string;
};

export type DocumentContent = {
  Text: string;
  Highlights: Highlight[];
};

export type Highlight = {
  BeginOffset: number;
  EndOffset: number;
};

export async function getSuggestions() {
  return await axios.get<SuggestionResponse>(
    `https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json`
  );
}

export async function getResults() {
  return await axios.get<QueryResponse>(
    `https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json`
  );
}
