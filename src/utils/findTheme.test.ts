import assert from "node:assert";
import { describe, it } from "node:test";
import { findTheme } from "./findTheme";
import { file, theme } from "./mocks";

describe("findTheme", () => {
  it("returns the theme in the provided config file", () => {
    const foundTheme = findTheme(file)
    const expectedTheme = theme
    assert.deepStrictEqual(foundTheme, expectedTheme)
  });
  it("throws an error if no theme is found", () => {
    assert.throws(() => findTheme(""), Error, "No tailwind theme was found in config file.");
  })
});


