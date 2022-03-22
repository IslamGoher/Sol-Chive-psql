export function getPaginationQuery(page: number, count: number) {
  const OFFSET = (page * count) - count;
  return `OFFSET ${OFFSET} LIMIT ${count}`;
}