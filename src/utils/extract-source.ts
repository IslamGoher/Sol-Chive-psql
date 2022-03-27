export function extractDomain(link: string): string {
  const urlWithoutHttp = link.split("//", 2)[1]; // result: www.example.com/asdf/
  const domainAndSubDomain = urlWithoutHttp.split("/", 1)[0]; // result: www.example.com
  const domain = domainAndSubDomain.split("."); // result: ["www", "example", "com"]

  // check if "www" exists or not
  if (domain.length === 2) return domain[0];
  else return domain[1];
}
