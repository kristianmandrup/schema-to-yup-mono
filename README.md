# Typescript monorepo for React project

## What I want to achieve?

- [Monorepo](https://www.atlassian.com/git/tutorials/monorepos) project, to be able to comfortably to develop several packages, which can be used separately but as well together
- Typescript
- Testing library. I want to start with Jest, but as well we can choose something else
- (nice to have, but optional) ESlint with [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- (nice to have, but optional) Rollup to bundle and minify
- (nice to have, but optional) pre-commit hooks with prettier

## Rename js to ts in ./packages recursively

`find packages -name "\*.js" -exec sh -c 'mv "$1" "${1%.js}.ts"' \_ {} \;`

## Packages structure

## Tools

### yarn

`yarn` instead of `npm`, because it supports `workspaces` to link cross-dependencies.

Create `package.json` in the root without version because we not going to publish it and with `workspaces`:

```json
"workspaces": [
  "packages/*"
]
```

### lerna

We will use `lerna` to run commands across all packages and "elevate" common dependencies.

Create `lerna.json`:

```json
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "0.0.1"
}
```

### TypeScript

We will use `typescript` to check types and compile TS down to desired JS files (ES5 or ES2015, CommonJS or ES modules).

Create `tsconfig.base.json`. This is what you need to add to enable monorepo:

```json
{
  "include": ["packages/*/src"],
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "baseUrl": ".",
    "paths": {
      "@stereobooster/*": ["packages/*/src"]
    }
  }
}
```

Create `packages/d/`, `packages/b/`, `packages/c/`, `packages/stories/`. Add `tsconfig.json` to each one:

```json
{
  "include": ["src"],
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    // to override config from tsconfig.base.json
    "outDir": "lib",
    "rootDir": "src",
    // for references
    "baseUrl": "src"
  },
  // references required for monorepo to work
  "references": [{ "path": "../d" }]
}
```

In `package.json` for packages `b` and `c` add:

```json
"peerDependencies": {
  "@stereobooster/d": "0.0.1"
},
"devDependencies": {
  "@stereobooster/d": "*"
}
```

We need `peerDependencies` to make sure that when packages (`d`, `b`, `c`) installed by the end user they will use the same instance of package `d`, otherwise, TypeScript can complain about incompatible types (especially if use inheritance and private fields). In `peerDependencies` we specify a version, but in `devDependencies` we don't need to, because we need simply to instruct `yarn` to use whatever version of package we have locally.

Now we can build projects. Add to root `package.json`:

```json
"scripts": {
  "build": "lerna run build --stream --scope=@stereobooster/{d,b,c}"
}
```

and to `package.json` for `d`, `b`, `c`

```json
"scripts": {
  "build": "tsc"
}
```

### Jest

We will use `jest` to run tests. Install `@types/jest`, `@types/react-test-renderer`, `jest`, `react-test-renderer`. Add `jest.json`. To eanbale TypeScript:

```json
{
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "transform": {
    "\\.tsx?$": "ts-jest"
  },
  "testMatch": ["**/__tests__/**/*.test.*"],
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.base.json"
    }
  }
}
```

to enable monorepo:

```json
"moduleNameMapper": {
  "@stereobooster/(.*)$": "<rootDir>/packages/$1"
}
```

As well we will need to change `tsconfig.base.json`, because [Jest doesn't support ES modules](https://github.com/facebook/jest/issues/4842):

```json
"compilerOptions": {
  "target": "es5",
  "module": "commonjs",
}
```

Add command to `package.json`

```json
"scripts": {
  "pretest": "yarn build",
  "test": "jest --config=jest.json"
}
```
