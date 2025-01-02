## Description
This is a todo-app using react, NextJS and TypeScript, idea is most comming from this [article](https://medium.com/@amayawickramasinghe2001/creating-a-to-do-app-with-next-js-cdb58f0b12d1), and refer the code from [here](https://github.com/Amaya-2001/ToDoApp).

The main purpose of the repo is to demonstrate how to use playwright to test NextJS applications:
- Implement playwright integration tests
- provide a solution to test NextJS server side rendering
- Collect Istanbul test coverage using [monocart-reporter](https://github.com/cenfun/monocart-reporter)
- Use json-server as mock server: support memory database, CRUD operations and response override for server side rendering test
- Support application debugging
- Execute playwright tests in GitHub Actions

**Constraint**: 
The current solution for SSR test is by changing the mock server data before each test, which means tests can only be run serially, parallel testing is not supported at the momonet.      


## Getting Started

First, start the mock server:

```bash
npm run mock
```

then, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run playwright tests in local machine
-  run local build: ```npm run build:local```
-  start the mock server and local next server: ```npm run start:integration```
-  run playwright tests: ```npm run playwright-test```
-  view the covefrage report: ```npm run lcov```
  
## Run playwright tests in CI
-  run local build: ```npm run build:local```
-  start the integration tests: ```npm run integration-test```
check the github actions script for details: [playwright.yml](.github/workflows/playwright.yml)  

## How to collect the test coverage
The current solution is throught Istanbul. For details please refer repo [nextjs-with-playwright-istanbul](https://github.com/cenfun/nextjs-with-playwright-istanbul).

**Note**: The author mentioned that "The latest version of Next.js does not work with Babel + Istanbul", but I got it working in this repo with Next 15.1.3.

## Other issues
In oder to use babel + istanbul coverage, swc has to be disabled, which cause  the **next/font** library is not supported.