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
  const regex = /^(https?:\/\/)?(blog.boot.dev\/)(.*)$/;
  const match = params.match(regex);
  if (match) {
    const url = new URL(params);
    if (url.hostname.match("blog.boot.dev") == null) {
      throw new Error("Invalid URL");
    } else if (
      url.pathname.toString() !== "/path" &&
      url.pathname.toString() !== "/path/"
    ) {
      throw new Error("Invalid URL");
    } else if (
      url.protocol.toString() !== "http:" &&
      url.protocol.toString() !== "https:"
    ) {
      throw new Error("Invalid URL");
    }
    return "blog.boot.dev/path";
  } else {
    throw new Error("Invalid URL");
  }
}
