export function dateFormatter(dateData) {
  const dataString = dateData;

  const date = new Date(dataString);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formattedDate;
}