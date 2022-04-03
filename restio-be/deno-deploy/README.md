# Deno Deploy Back-End

This project was built following the [Deno Deploy Friebase tutorial](https://deno.com/deploy/docs/tutorial-firebase).

Types have been fixed, project setup have been extended to run locally, dotenv has been added to manage loading secrets locally, firebase libs have been updated to use the latest.

## How to run

- Install deno.
- Create Firebase account, project, collection, user, copy secrets into `.env.template` and rename to `.env`
- Run Project

```bash
deno run -A main.ts
```

To run in VS Code, install the Deno Extension, then open the code as a Workspace. This tells VS Code which project is a Deno project.

Open in browser: http://localhost:8000/restaurants
