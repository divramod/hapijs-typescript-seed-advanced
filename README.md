# Description: node-hapi-typescript-seed

This is a simple hapijs (nodejs) starter template that should be used as an api.
It is inspired by [dwyl/hapi-typescript-example](https://github.com/dwyl/hapi-typescript-example/tree/master/src).

# Features

# Installation

* ```npm install``` (Install node packages)
* ```typings install``` (Install typings)

# Run

* ```gulp build``` (Build TS files)
* ```gulp test``` (Run mocha tests)
* ```gulp tslint``` (Run tslint)
* ```gulp nodemon``` (Run nodemon and watch ts files)

Running on port 3000 ex: localhost:3000/documentation

# How To's

## how to use in your project
There are at least two ways to integrate the api in your project. As a submodule to an existing project or as standalone project.

### add as a submodule to an existing project
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


### create as standalone project
* create a repository for your api-server

## add a new entity
* src/routes/index.ts --> add routes (shortcut: )
* src/models/ENTIYNAME.ts --> add model (shortcut: )
* src/controllers/ENTITIYNAME.ts --> add controller (shortcut: )
* src/libs/repository/interfaces.ts --> add entity interface (shortcut: )
* src/libs/repository/mongo/ENTITYNAMERepostory.ts --> add repository (shortcut: )

# ToDo's
- [ ] create a npm module to help with the How To's
- [ ] docs: add a section where i describe how to use it in your own project
