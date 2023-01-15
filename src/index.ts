#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { createOutputFile, createOutputPath } from "./utils/output.js";
import { validateConfigFile } from "./utils/validateConfigFile.js";

/**
 * Validate the tailwind.config file and read it
 */
const configFile = readFileSync(validateConfigFile(), "utf8");

/**
 * Write the output file to configured directory
 */
writeFileSync(createOutputPath(), createOutputFile(configFile));
