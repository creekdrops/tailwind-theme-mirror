import assert from "node:assert";
import { afterEach, describe, it } from "node:test";
import { file } from "./mocks";
import { createOutputFile, getExtension, getOutputDirectory } from "./output";

describe("createOutputFile", () => {
  afterEach(() => {
    process.argv = [];
  });
  it("outputs the file to javascript", () => {
    const output = createOutputFile(file);
    assert(!output.includes("as const") && output.includes("export"));
  });
  it("outputs the file to typescript", () => {
    process.argv.push("--typescript");
    setTimeout(() => {
      const output = createOutputFile(file);
      assert(output.includes("as const"));
    });
  });
});

describe("getOutputDirectory", () => {
  let argv = process.argv;
  afterEach(() => {
    process.argv = argv;
  });
  it("will default to the current working directoru", () => {
    const output = getOutputDirectory();
    assert.strictEqual(output, process.cwd());
  });
  it("will allow user to specify a new directory", () => {
    process.argv.push("--output", "./src");
    const output = getOutputDirectory();
    assert.strictEqual(output, process.cwd() + "/./src");
  });
});

describe("getExtension", () => {
  afterEach(() => {
    process.argv = [];
  });
  it("will default to js extension", () => {
    const output = getExtension();
    assert.strictEqual(output, "js");
  });
  it("will default to return ts extension", () => {
    process.argv.push("--typescript");
    const output = getExtension();
    assert.strictEqual(output, "ts");
  });
});

describe("getCustomScriptName", () => {
  afterEach(() => {
    process.argv = [];
  });
  it("lets the user specify a custom name for the output file and script", () => {
    process.argv.push("--name", "myCustomThemeName");
    const output = createOutputFile(file);
    assert(output.includes("export const myCustomThemeName ="));
  });
  it("throws an error if the user uses invalid characters", () => {
    process.argv.push("--name", "myCustomThemeName/");
    assert.throws(() => createOutputFile(file), Error);
  })
});
