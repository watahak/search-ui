import { Highlight } from "~/api/search.api";

export function highlightText(text: string, highlights: Highlight[]): string {
  // Sort highlights by BeginOffset to ensure they are processed in the correct order
  highlights.sort((a, b) => a.BeginOffset - b.BeginOffset);

  let highlightedText = "";
  let lastIndex = 0;

  highlights.forEach(({ BeginOffset, EndOffset }) => {
    // Append the text before the highlighted part
    highlightedText += text.slice(lastIndex, BeginOffset);
    // Wrap the highlighted part in <mark> tags
    highlightedText += `<strong>${text.slice(BeginOffset, EndOffset)}</strong>`;
    // Update the last index to the end of the highlighted part
    lastIndex = EndOffset;
  });

  // Append the remaining text after the last highlighted part
  highlightedText += text.slice(lastIndex);

  return highlightedText;
}
