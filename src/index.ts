#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { argv, cwd } from "process";

/**
 * Validate the tailwind.config file and read it
 */
const configFile = readFileSync(validateConfigFile(), "utf8");

/**
 * Validates the config file and returns the path to the file
 */
function validateConfigFile(): string {
  let projectDirectory = readdirSync(cwd());

  if (projectDirectory.includes("tailwind.config.cjs")) {
    return cwd() + "/tailwind.config.cjs";
  }

  if (projectDirectory.includes("tailwind.config.cjs")) {
    return cwd() + "/tailwind.config.cjs";
  }
  throw new Error("No tailwind config file found.");
}

/**
 * returns the output path
 */
function createOutputPath(): string {
  return `${getOutputDirectory()}/${getCustomScriptName()}.${getExtension()}`;
}

/**
 * Creates the output file
 */
function createOutputFile(file): string {
  return `export const ${getCustomScriptName()} = ${findTheme(file)}${
    argv.includes("--typescript") ? " as const" : ""
  }`;
}

/**
 * Returns the output directory based on the command line arguments
 */
function getOutputDirectory(): string {
  let output = argv.includes("--output");
  if (output) {
    return cwd() + "/" + argv[argv.indexOf("--output") + 1];
  }
  return cwd();
}

/**
 * Returns the extension from the command line arguments
 */
function getExtension(): string {
  return argv.includes("--typescript") ? "ts" : "js";
}

/**
 * Allows the user to specify a custom name for the output file and script
 */
function getCustomScriptName(): string {
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

/**
 * Finds the theme in the config file
 */
function findTheme(file: string): string {
  const rx = /theme: ({\n.+\s\s})/gs;
  if (!file.match(rx)) {
    throw new Error("No tailwind theme was found in config file.");
  }
  return rx.exec(file)[1];
}

/**
 * Write the output file to configured directory
 */
writeFileSync(createOutputPath(), createOutputFile(configFile));
