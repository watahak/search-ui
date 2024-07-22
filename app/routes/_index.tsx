import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import SearchBar from "~/components/SearchBar";
import SearchResult from "~/components/SearchResult";
import { useGetResultsQuery } from "~/hooks/search.query";

export const meta: MetaFunction = () => {
  return [
    { title: "Search UI" },
    { name: "Search UI", content: "Search Assignment" },
  ];
};

export default function Index() {
  const [query, setQuery] = useState<string | null>(null);

  const {
    data: results,
    isLoading,
  } = useGetResultsQuery(query);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  return (
    <div>
      <div className="h-[24px] flex bg-[#F0F0F0]  flex-row p-1 pl-40 gap-3">
        <div className="">
          <svg
            height="16"
            width="16"
            viewBox="0 0 16 16"
            version="1.1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82a7.56 7.56 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        </div>
        <a href={"https://github.com/watahak/search-ui"} className="text-xs text-[#5B5B5B]  hover:underline">
          Check out Ping&apos;s source code here
        </a>
      </div>
      <div className="px-40 h-[152px] w-full shadow-[rgba(0,0,0,0.05)_10px_5px_4px_0px] flex">
        <SearchBar onSubmit={handleSearch} />
      </div>

      {!isLoading && results && (
        <div className="px-40 pb-40">
          <div className="h-[116px] w-full text-xl flex flex-col justify-center">
            <span>
              Showing {(results.Page - 1) * results.PageSize + 1}-
              {results.Page * results.PageSize} of{" "}
              {results.TotalNumberOfResults} results
            </span>
          </div>

          {results.results.map((result, index) => (
            <SearchResult key={index} {...result} />
          ))}
        </div>
      )}
    </div>
  );
}
