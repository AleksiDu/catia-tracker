export const calculatePadding = (maxWidth: number, content: string): string => {
  const paddingLength = Math.max(0, maxWidth - content.length);
  return " ".repeat(paddingLength);
};
