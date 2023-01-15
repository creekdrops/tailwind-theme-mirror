import { argv, cwd } from "process";
import { findTheme } from "./findTheme";

/**
 * returns the output path
 */
export function createOutputPath(): string {
  return `${getOutputDirectory()}/${getCustomScriptName()}.${getExtension()}`;
}

/**
 * Creates the output file
 */
export function createOutputFile(file: string): string {
  const tag = argv.includes("--typescript") ? " as const" : "";
  const output = `export const ${getCustomScriptName()} = ${findTheme(file)}${tag}`;
  return output;
}

/**
 * Returns the output directory based on the command line arguments
 */
export function getOutputDirectory(): string {
  let output = argv.includes("--output");
  if (output) {
    return cwd() + "/" + argv[argv.indexOf("--output") + 1];
  }
  return cwd();
}

/**
 * Returns the extension from the command line arguments
 */
export function getExtension(): string {
  return argv.includes("--typescript") ? "ts" : "js";
}

/**
 * Allows the user to specify a custom name for the output file and script
 */
export function getCustomScriptName(): string {
  const rx = /[\\\/:"*?<>\|\+\s\.]+/g;
  const name = argv.includes("--name");
  if (!name) {
    return "tailwindTheme";
  }
  if (argv[argv.indexOf("--name") + 1].match(rx)) {
    throw new Error(
      "Invalid characters used for --name. The recommended convention is < myCustomThemeName >."
    );
  }
  return argv[argv.indexOf("--name") + 1];
}
