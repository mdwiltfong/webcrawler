import { test, describe, expect } from "@jest/globals";
import normalizeURL from "../crawl";
describe("Boot.dev Tests - normalizeURL", () => {
  test("normalizeURL protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL capitals", () => {
    const input = "https://BLOG.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL http", () => {
    const input = "http://BLOG.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
  });
});
