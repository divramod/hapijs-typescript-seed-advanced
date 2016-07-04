# Description: node-hapi-typescript-seed

This is a simple hapijs (nodejs) starter template.
It is inspired by [dwyl/hapi-typescript-example](https://github.com/dwyl/hapi-typescript-example/tree/master/src).

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

## Add new Entity
* src/routes/index.ts --> add routes (shortcut: )
* src/models/ENTIYNAME.ts --> add model (shortcut: )
* src/controllers/ENTITIYNAME.ts --> add controller (shortcut: )
* src/libs/repository/interfaces.ts --> add entity interface (shortcut: )
* src/libs/repository/mongo/ENTITYNAMERepostory.ts --> add repository (shortcut: )
