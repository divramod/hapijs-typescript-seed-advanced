# Description: node-hapi-typescript-seed

This is a simple hapijs (nodejs) starter template that should be used as an api.
It is inspired by [dwyl/hapi-typescript-example](https://github.com/dwyl/hapi-typescript-example/tree/master/src).

# Table of Contents

- [Contributing](#contributing)

# Features
- TODO

# Prerequsits
- TODO

# Installation

* ```npm install``` (Install node packages)
* ```typings install``` (Install typings)

# Run

```
npm start # (Run nodemon and watch ts files)
npm run build # (Build TS files)
npm run test # (Run mocha tests)
npm run tslint # (Run tslint)
```

Running on port 3000 ex: localhost:3000/documentation

# How To's

## Merging latest upstream changes

1. `npm run merge.preview` - This will fetch `upstream` and show you how the merge would look
2. `npm run merge` - This will actually do the merge
3. Handle any conflicts to get latest upstream into your application.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/divramod/hapi-seed-advanced/issues).

## How to use in your project
There are at least two ways to integrate the api in your project. As a submodule to an existing project or as standalone project.

### Add as a submodule to an existing project
1. create a repository for your api-server (for example server-api)
2. add that repository as a submodule to your project
```
cd YOUR_PROJECT
git submodule add https://github.com/YOUR_GITHUB_NAME/server-api.git
```
3. download the hapi-seed-advanced zip (do not clone it)
4. extract the zip-content into your submodule (server-api)
5. add upstream
```
git remote add upstream https://github.com/divramod/hapi-seed-advanced.git
```
6. install dependencies
```
npm install
typings install
```

### Create as standalone project
1. create a repository for your api-server
2. download the hapi-seed-advanced zip (do not clone it)
3. extract the zip-content into your submodule (server-api)
4. add upstream
```
git remote add upstream https://github.com/divramod/hapi-seed-advanced.git
```

## add a new entity
* src/routes/index.ts --> add routes (shortcut: )
* src/models/ENTIYNAME.ts --> add model (shortcut: )
* src/controllers/ENTITIYNAME.ts --> add controller (shortcut: )
* src/libs/repository/interfaces.ts --> add entity interface (shortcut: )
* src/libs/repository/mongo/ENTITYNAMERepostory.ts --> add repository (shortcut: )

## add a new test
* test/YOUR_FEATURE_NAMETests.ts
* run ```npm test```

# Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/hapi-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

# ToDo's
- [ ] create a npm module to help with the How To's
- [ ] docs: add a section where i describe how to use it in your own project
- [ ]
