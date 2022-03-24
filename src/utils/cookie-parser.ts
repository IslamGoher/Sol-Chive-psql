export function parseCookie(cookie: string) {
  let cookiesObj: {
    [index: string]: string;
  } = {};

  const cookies = cookie.split("; ");
  
  cookies.forEach((el: string) => {
    const singleCookie = el.split("=");
    
    const key = singleCookie[0];
    const value = singleCookie[1];

    cookiesObj[key] = value;
  });

  return cookiesObj;
}