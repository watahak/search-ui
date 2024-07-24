import { useEffect, useState } from "react";
import { useGetSuggestionsQuery } from "~/hooks/search.query";

const SearchBar = ({ onSubmit }: { onSubmit: (query: string) => void }) => {
  const [query, setQuery] = useState("");
  const [suggestionQuery, setSuggestionQuery] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputInFocus, setInputInFocus] = useState(false);
  const [searchCallBackCount, setSearchCallBackCount] = useState(0); // trigger handleSearch if setQuery done in same action

  const { data: suggestions, isLoading } =
    useGetSuggestionsQuery(suggestionQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSuggestionQuery(event.target.value);
    setSelectedSuggestionIndex(-1); // Reset selected suggestion when input changes
  };

  const handleSearch = () => {
    setInputInFocus(false);
    onSubmit(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setInputInFocus(true);

    if (event.key === "Enter") {
      handleSearch();
    } else if (event.key === "ArrowDown") {
      setSelectedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions!.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      setSelectedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  useEffect(() => {
    if (
      suggestions &&
      selectedSuggestionIndex >= 0 &&
      selectedSuggestionIndex < suggestions.length
    ) {
      setQuery(suggestions[selectedSuggestionIndex].value);
    }
  }, [selectedSuggestionIndex, suggestions]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCallBackCount]);

  return (
    <div className="relative w-full max-w-4xl m-auto">
      <div className="flex">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setInputInFocus(true)}
        />

        {query && (
          <button
            className="absolute right-[114px] top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => {
              setQuery("");
              setSuggestionQuery("");
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center gap-1"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            ></path>
          </svg>
          Search
        </button>
      </div>
      {inputInFocus && !isLoading && !!suggestions?.length && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
          {suggestions.map((suggestion, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer ${
                index === selectedSuggestionIndex
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => {
                setQuery(suggestion.value);
                setSearchCallBackCount(searchCallBackCount + 1);
              }}
              dangerouslySetInnerHTML={{ __html: suggestion.text }}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
