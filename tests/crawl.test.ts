import { test, describe, expect } from "@jest/globals";
import normalizeURL from "../crawl";
describe("Crawl.ts", () => {
  test("smoke test", () => {
    expect(1).toBe(1);
  });
  test("normalizeURL", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path"
    );
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path"
    );
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path"
    );
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path"
    );
  });
  test("normalizeURL - invalid URL", () => {
    expect(() =>
      normalizeURL("https://blog.boot.dev/path/blah/blah")
    ).toThrowError(new Error("Invalid URL"));
  });
});
