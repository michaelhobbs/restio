# restio

This project is an exercise in building an API-first application using OpenAPI specifications.

It explores the tooling around OpenAPI and focusses on using ReactJS in the Front-End and a JavaScript based Back-End, Deno / NodeJS.

Both the Front-End and Back-End make heavy use of TypeScript. How much code is framework agnostic and can be shared is a finding-goal of this exercise. How easy would it be to migrate one Back-End implementation to the other? Can types be shared between Front-End and Back-End? Can the API binding framework be swapped easily?

## Next Steps

### Generate api client/server

It would be possible to swap the generated api client and use any openapi generator. Similarly an api backend stub could be generated.  
Note that JAVA needs to be installed to run `openapi-generator-cli`.  
See: https://openapi-generator.tech/docs/generators/

`"generate-server": "openapi-generator-cli generate -i openapi/api.yaml -g nodejs-express-server -o nodejs-express",`

`"generate-api": "openapi-generator-cli generate -i openapi/api.yaml -g typescript-axios -o src/openapi",`

### React Query API binding variant

Use [orval](https://orval.dev/guides/react-query) to generate React Query API bindings.

### Firebase

Implement Back-End using Firebase for Authentication and DB.

### Backend

Implement Back-End

#### Nodejs

Implement a Back-End using nodejs-express template as starting point:

- migrate it to TypeScript
- fix broken generated code
- implement the services connecting to firebase

#### Deno

Implement the Back-End using Deno and oak

- split the main.ts into Controllers / Routers / Services / Middlewares
- host in Deno Deploy
- implement User Authentication, Authorization, using Custom user claims.
  - Users can login
  - Users have roles \[User, Owner, Admin\]
  - Reset Password
  - Sign-up
