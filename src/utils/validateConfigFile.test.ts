import { rename } from "fs";
import assert from "node:assert";
import { describe, it } from "node:test";
import { validateConfigFile } from "./validateConfigFile";

describe("validateConfigFile", () => {
  it("returns true if the config file is valid", () => {
    const isValid = validateConfigFile()
    assert(isValid)
  })
  it("throws an error if no config file is found", () => {
    rename("tailwind.config.cjs", "tailwind.config.cjs.bak", () => {
      assert.throws(() => validateConfigFile(), Error, "No tailwind config file was found.");
      rename("tailwind.config.cjs.bak", "tailwind.config.cjs", () => {})
    })
  })
})
