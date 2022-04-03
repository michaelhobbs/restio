# Restio Project Front-End

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

Using `wiremock` mocks, login with one of the test users to test different User Roles.

-   login: `user`, password: `123`
-   login: `owner`, password: `123`
-   login: `admin`, password: `123`

A slow login call can be made using:

-   login: `slow`, password: `123`

Note that pagination is not fully mocked.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn json-server`

While the backend is not really implemented, a mock version with in-memory storage and generated data can be used to test the more dynamic parts of the app, such as DELETE or PUT operations.

Users are generated with different Roles:
user1 -> p1 : Owner
user2 -> p2 : Admin
user3 -> p3 : User

### `yarn test`

No tests have been written yet, but the tooling is setup for running tests using Jest.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn generate-rtk-api`

Generates api client. `restio/src/rtk-query/api.generated.ts`  
Configure where the backend will be hosted in: `customBaseQuery.ts`

See: https://redux-toolkit.js.org/rtk-query/overview

### `yarn wiremock`

Starts a mock backend server on localhost port 8080. Serves mocked responses based on request matching rules.
See: http://wiremock.org/docs/
