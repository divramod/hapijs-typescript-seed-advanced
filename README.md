COMMANDS
===============================================================================
```bash
cd scripts
nodemon runners/login.js
```

Inspired By
===============================================================================
- https://github.com/dwyl/hapi-typescript-example
- https://github.com/poeticninja/hapi-authentication-and-authorization
- https://medium.com/@poeticninja/authentication-and-authorization-with-hapi-5529b5ecc8ec#.qw0gjv67l
- mongo: 

Test with
===============================================================================

```bash
# success
http POST localhost:8101/login email=admin@admin.com password=admin --session=user1

# success because session is saved
http localhost:8101:/example-two --session=user1

# error because no user session exists
http localhost:8101:/example-two --session=user2
```
Helper
===============================================================================
- https://github.com/jkbrzt/httpie
- https://github.com/mafintosh/mongojs
- JOI: https://github.com/hapijs/joi/blob/v8.0.5/API.md

Routes
===============================================================================

```bash
# register
http POST localhost:8101/register email=admin@admin.com forename=admin surename=admin password=pw

# login
http POST localhost:8101/login email=admin@admin.com password=pw

# logout
http localhost:8101/logout
```
