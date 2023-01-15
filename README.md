# tailwind-theme-mirror

A simple tool that provides easy access to your Tailwind theme configuration anywhere in your project.

## Quick Start

### Install

```bash
# install with npm, pnpm or yarn
pnpm i -D tailwind-theme-mirror
```

### Create a script in `package.json`

Add the executable to any script within your package.json file alongside any other executables you may be using during development of your project.

```javascript
{
  "scripts": {
    "twmirror": "tailwind-theme-mirror --output ./src/lib",

    //  or run it alongside other scripts

    // "dev": "tailwind-theme-mirror --output ./src/lib && vite dev"
  }
}

```

> Creates a `tailwindTheme.js` file in `src/lib`

### Run the script

```bash
pnpm run twmirror

# or if you added it to your dev script
pnpm run dev
```

**Output**

```javascript
//	tailwindTheme.js in ./src/lib
export const tailwindTheme = {
  fontFamily: {
    sans: "Source Sans Pro, Arial, sans-serif",
  },
  extend: {
    colors: {
      primary: {
        DEFAULT: "#1daae0",
        100: "#1a80a9",
        200: "#1daae0",
        300: "#4cbbe6",
        400: "#79cceb",
        500: "#a6def3",
      },
    },
  },
};
```

### Use the `tailwindTheme` object in your project

**Example using Svelte**

```javascript
<script>
  import { tailwindTheme } from '$lib/tailwindTheme';

  const primary = tailwindTheme.extend.colors.primary
</script>

<ul>
  {#each Object.entries(primary) as [key, color]}
    <li style="color: {color};">primary-{key} - Hex: {color}</li>
  {/each}
</ul>
```

As you can see, this can be incredibly useful if you are working in an `ESM` based project, where importing `CommonJS` modules are not natively supported.

## Default configuration

By default, the script will search for a `tailwind.config.[js|cjs]` file in the **root** of your project, and will throw an error if no configuration file is found.

If a configuration file is found, the script will create a `tailwindTheme.js` file in the root of your project, which will contain a `tailwindTheme` object that mirrors the theme object in your configuration file.

```json
{
  "scripts": {
    "twmirror": "tailwind-theme-mirror"
  }
}
```

> Creates a `tailwindTheme.js` file in the root of the project if a valid config is found.

## Setting a custom output path

If you would like to define a custom output path for the `tailwindTheme.js` file, you can do so by passing the `--output` flag to the executable, and providing the path to your configuration file.

```json
{
  "scripts": {
    "twmirror": "tailwind-theme-mirror --output ./src/lib"
  }
}
```

> Creates a `tailwindTheme.js` file in the `./src/lib` directory.

## Defining a custom name

If you would like to define a custom name path for the `tailwindTheme.js` file, you can do so by passing in the `--name` flag.

```json
{
  "scripts": {
    "twmirror": "tailwind-theme-mirror --name myAwesomeTheme --output ./src/lib"
  }
}
```

> Creates a `myAwesomeTheme.js` file in the `./src/lib` directory.

```javascript
//	myAwesomeTheme.js
export const myAwesomeTheme = {
  fontFamily: {
    sans: "Source Sans Pro, Arial, sans-serif",
  },
  //	...
};
```

## Output as a Typescript

If you are using Typescript and would prefer the output to be a `.ts` file, you can pass in the `--typescript` flag.

```json
{
  "scripts": {
    "twmirror": "tailwind-theme-mirror --typescript --output ./src/lib"
  }
}
```

> Creates a `tailwindTheme.ts` file in the `./src/lib` directory.

```typescript
//	tailwindTheme.ts
export const myAwesomeTheme = {
  fontFamily: {
    sans: "Source Sans Pro, Arial, sans-serif",
  },
  //	...
} as const;
```
