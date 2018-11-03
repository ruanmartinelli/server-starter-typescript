# server-starter-typescript

[![Build Status](https://travis-ci.org/ruanmartinelli/server-starter-typescript.svg?branch=master)](https://travis-ci.org/ruanmartinelli/server-starter-typescript)
[![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![GNU Make](https://img.shields.io/badge/Built%20with-GNU%20Make-brightgreen.svg)](https://img.shields.io/badge/Built%20with-GNU%20Make-brightgreen.svg)

> Starter project for building a bare-bones TypeScript Node.js server.

## Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/ruanmartinelli/server-starter-typescript/tree/master)

## Requirements

- Node.js 10+

## Dependencies

Main dependencies:

- TypeScript
- Koa
- Jest
- Yarn
- Prettier & TSLint

## Get started

Steps to run the repository for the first time:

1. Clone the repo:

```bash
git clone https://github.com/ruanmartinelli/server-starter-typescript.git <NEW_NAME>

cd <NEW_NAME>
```

2. Check Node.js version:

```bash
node -v # Should be v10.0.0+
```

If you have [nvm](https://github.com/creationix/nvm) installed, you can run `nvm use` to switch to version 10.

3. Run:

```bash
make bootstrap
```

_Optional: change the name on the `package.json` file._

## Folder structure

_Some files were omitted for simplicity._

```bash
.
├── src
|  ├── app.ts       # Application entry file
|  ├── controller   # App controllers
|  ├── middleware   # Koa middlewares
|  └── util         # Misc utilities
└── test
```

## Develop

1. Make changes

Write controllers and routes, install dependencies, etc.

2. Write tests

Remember to use `<>.spec.ts` for test files.

3. Run tests

```bash
make test
```

## Scripts

All useful scripts are present on the Makefile.

## License

MIT © Ruan Martinelli
