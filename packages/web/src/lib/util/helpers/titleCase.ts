export const titleCase = (input: string, delimiter = ' ') => {
  const firstToUpper = (s: string) => s[0].toUpperCase() + s.slice(1);

  return input.split(delimiter).map(firstToUpper).join(' ');
};
