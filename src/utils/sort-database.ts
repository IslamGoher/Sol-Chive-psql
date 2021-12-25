export function getSortingQuery(query: string): string {

  const SORT_BY_DATE_ASC = "ORDER BY s.created_on ASC";
  
  const SORT_BY_DATE_DESC = "ORDER BY s.created_on DESC";
  
  // sort DESC by default
  if (query === "asc") return SORT_BY_DATE_ASC;
  
  else return SORT_BY_DATE_DESC;
}