# Deno Deploy Back-End

This project was built following the [Deno Deploy Friebase tutorial](https://deno.com/deploy/docs/tutorial-firebase).

Types have been fixed, project setup have been extended to run locally, dotenv has been added to manage loading secrets locally, firebase libs have been updated to use the latest.

## How to run

- Install deno.
- Create Firebase account, project, collection, user, copy secrets into `.env.template` and rename to `.env`
- Create a service account for the DB and place credentials in `./firebase-adminsdk-credentials.json`
- Run Project

```bash
deno run -A main.ts
```

To run in VS Code, install the Deno Extension, then open the code as a Workspace. This tells VS Code which project is a Deno project.

Open in browser: http://localhost:8000/restaurants

## Known Issues

Deno cannot run fireabse-admin due to the crypto library of nodejs not being deno-compatible.  
see [node_modules/firebase-admin/lib/utils/crypto-signer.js](node_modules/firebase-admin/lib/utils/crypto-signer.js)
