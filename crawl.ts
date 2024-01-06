/*
normalizeURL takes in a single URL (type string) and returns normalized version of the URL as a string. 
To be specific, it should: 
- Verify that the provided strings match a certain pattern
- If the string matches the pattern, it will return `blog.boot.dev/path
- The pattern is based on these URLs: 
    - https://blog.boot.dev/path/
    - https://blog.boot.dev/path
    - http://blog.boot.dev/path/
    - http://blog.boot.dev/path
*/
import { Url as URL } from "node:url";

export default function normalizeURL(params: string) {
  const url = new URL(params);
  const host = url.host.toLowerCase();
  const path = url.pathname.toLowerCase();
  const constructedURL = `${host}${path}`;
  if (constructedURL.length > 15 && constructedURL.slice(-1) === "/") {
    return constructedURL.slice(0, -1);
  }
  return constructedURL;
}
