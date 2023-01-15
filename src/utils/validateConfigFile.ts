import { readdirSync } from "fs";
import { cwd } from "process";

/**
 * Validates the config file and returns the path to the file
 */
export function validateConfigFile(): string {
  let projectDirectory = readdirSync(cwd());

  if (projectDirectory.includes("tailwind.config.cjs")) {
    return cwd() + "/tailwind.config.cjs";
  }

  if (projectDirectory.includes("tailwind.config.js")) {
    return cwd() + "/tailwind.config.js";
  }
  throw new Error("No tailwind config file found.");
}
