interface GetFilteringQueries {
  filterBySource: string;
  filterByTag: string;
  filterByPerfectSolution: string;
}

export const getFilteringQueries = (
  source: string,
  tag: string,
  perfectSolution: string
): GetFilteringQueries => {

  let filterBySource = "";
  let filterByTag = "";
  let filterByPerfectSolution = "";

  // filter by source
  if (source && source !== "undefined")
    filterBySource = `AND s.source = '${source}'`;
  
  // filter by tag
  if (tag && tag !== "undefined")
    filterByTag = `AND '${tag}' = ANY (s.tags)`;
  
  // filter by perfect solution
  if (perfectSolution === "true")
    filterByPerfectSolution = "AND s.perfect_solution IS NOT NULL";
  else if (perfectSolution === "false")
    filterByPerfectSolution = "AND s.perfect_solution IS NULL";

  return { filterBySource, filterByTag, filterByPerfectSolution };
};
