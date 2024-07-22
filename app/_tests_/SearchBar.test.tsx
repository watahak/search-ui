import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import SearchBar from "~/components/SearchBar";
import "@testing-library/jest-dom"; // So we can use toBeInTheDocument assertion

// Mock the hook
jest.mock("~/hooks/search.query", () => ({
  useGetSuggestionsQuery: jest.fn().mockImplementation(() => ({
    data: [
      "Suggestion 1",
      "Suggestion 2",
      "Suggestion 3",
      "Suggestion 4",
      "Suggestion 5",
      "Suggestion 6",
    ],
    isLoading: false,
  })),
}));

test("when on load, then render search bar", () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <SearchBar onSubmit={() => {}} />
    </QueryClientProvider>
  );
  expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
});

test("when input is typed, shows 6 suggestions are shown", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <SearchBar onSubmit={() => {}} />
    </QueryClientProvider>
  );

  const inputElement = screen.getByPlaceholderText("Search...");

  act(() => {
    inputElement.focus();
  });

  fireEvent.change(inputElement, {
    target: { value: "test" },
  });

  await waitFor(
    () => {
      const suggestions = screen.queryAllByRole("listitem");
      expect(suggestions.length).toEqual(6);
    },
    { timeout: 2000 }
  );
});

// todo test cases below
test("when enter is pressed on suggestion, show selected suggestion in input", () => {});
test("when mouse click on suggestion, show selected suggestion in input", () => {});
test("when >1 char is typed, x is rendered", () => {});
test("when x is clicked, search query is removed ", () => {});
test("when search button is pressed, show search results", () => {});
test("when enter is pressed, show search results", () => {});
