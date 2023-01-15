/**
 * Finds the theme in the config file
 */
export function findTheme(file: string): string {
  const rx = /theme: ({\n.+\s\s})/gs;
  if (!file.match(rx)) {
    throw new Error("No tailwind theme was found in config file.");
  }
  return rx.exec(file)[1];
}
