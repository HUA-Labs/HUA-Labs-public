// Helper function to split Markdown text into text and code blocks
export function splitMarkdownBlocks(text: string): { type: 'text' | 'code'; content: string }[] {
  const codeBlockRegex = /```[a-zA-Z]*[\s\S]*?```/g;
  // Ensure an odd number of backticks is handled by appending a closing set if necessary
  // This helps in scenarios where a code block might be unterminated in the input.
  let fixedText = text;
  const codeBlockCount = (text.match(/```/g) || []).length;
  if (codeBlockCount % 2 !== 0) {
    fixedText += '\n```';
  }

  const blocks: { type: 'text' | 'code'; content: string }[] = [];
  let lastIndex = 0;
  let match;

  // Iterate through the text to find all code blocks
  while ((match = codeBlockRegex.exec(fixedText)) !== null) {
    // Add preceding text block if any
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', content: fixedText.slice(lastIndex, match.index) });
    }
    // Add the found code block
    blocks.push({ type: 'code', content: match[0] });
    lastIndex = codeBlockRegex.lastIndex;
  }

  // Add any remaining text after the last code block
  if (lastIndex < fixedText.length) {
    blocks.push({ type: 'text', content: fixedText.slice(lastIndex) });
  }
  return blocks;
}

// Helper function to ensure there are blank lines around Markdown tables
export function ensureTableSpacing(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''; // Return empty string if input is not valid
  }
  // Add a newline before a table if it's not preceded by one and not at the start
  let spacedText = text.replace(/([^\n])(\n\|[^\n]*\|.*\n)/g, '$1\n$2');
  // Add a newline before a table if it's at the very start of the text
  spacedText = spacedText.replace(/^(\|[^\n]*\|.*\n)/, '\n$1');
  // Add a newline after a table if it's not followed by one and not at the end
  spacedText = spacedText.replace(/(\|[^\n]*\|.*\n)([^\n])/g, '$1\n$2');
  // Add a newline after a table if it's at the very end of the text
  spacedText = spacedText.replace(/(\|[^\n]*\|.*\n)$/m, '$1\n');
  return spacedText;
}
