export type SearchResultProps = {
  title: string;
  date: string | null;
  excerpt: string;
  source: string;
};

const SearchResult = ({ title, date, excerpt, source }: SearchResultProps) => {
  return (
    <div className="py-4">
      <a
        href={source}
        className="text-[#1C76D5] text-xl font-semibold hover:underline"
        dangerouslySetInnerHTML={{ __html: title }}
      ></a>
      <div className="text-gray-500 text-sm mt-1">{date}</div>
      <p
        className="text-gray-700 mt-2"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      ></p>
      <a
        href={source}
        className="text-gray-500 text-sm mt-1 block hover:underline"
      >
        {source}
      </a>
    </div>
  );
};

export default SearchResult;
