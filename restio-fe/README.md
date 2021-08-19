# Restio Project

This restaurant review app is built using the following technologies:

-   react (based on CRA)
-   typescript
-   i18next for text resource management
-   material-ui for UI framework
-   rtk-query for API client generation with caching, redux, hooks, etc
-   redux state management
-   Bearer Authentication using JWT in headers
-   react-hook-form for form validation
-   react-table for headless table state management
-   react-router for route management and navigation
-   error boundary to display a fallback error page
-   code-splitting on Routes by user role, User / Owner / Admin routes
-   wiremock cli for local mock api server during frontend development

## Quickstart:

Run in 2 separate terminals:

-   `yarn start`
-   `yarn wiremock`

The UI will open in your default browser at http://localhost:3000  
The API mocks will be served at http://localhost:8080

## Manual Testing:

Login with one of the test users to test different User Roles.

-   login: `user`, password: `123`
-   login: `owner`, password: `123`
-   login: `admin`, password: `123`

A slow login call can be made using:

-   login: `slow`, password: `123`

Note that pagination is not fully mocked.

## Testing with stateful in memory backend:

While the backend is not really implemented, a mock version with in-memory storage and generated data can be used to test the more dynamic parts of the app, such as DELETE or PUT operations.

To test against this mock backend run the following yarn script:

`yarn json-server`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn generate-rtk-api`

Generates api client. `restio/src/rtk-query/api.generated.ts`  
Configure where the backend will be hosted in: `customBaseQuery.ts`

See: https://redux-toolkit.js.org/rtk-query/overview

### `yarn prism`

Uses prism to create a mock server for quick testing of api definition.  
See: https://stoplight.io/open-source/prism/

### `yarn wiremock`

Starts a mock backend server on localhost port 8080. Serves mocked responses based on request matching rules.
See: http://wiremock.org/docs/

## Possible extensions:

### Generate api client/server

It would be possible to swap the generated api client and use any openapi generator. Similarly an api backend stub could be generated.  
Note that JAVA needs to be installed to run `openapi-generator-cli`.  
See: https://openapi-generator.tech/docs/generators/

`"generate-server": "openapi-generator-cli generate -i openapi/api.yaml -g nodejs-express-server -o nodejs-express",`

`"generate-api": "openapi-generator-cli generate -i openapi/api.yaml -g typescript-axios -o src/openapi",`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
