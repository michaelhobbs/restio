// deno run -A --unstable testing_deno_import.ts
// deno run -A --unstable --compat testing_deno_import.ts
// deno run -A --unstable --compat --no-check testing_deno_import.ts

import admin from 'https://cdn.skypack.dev/firebase-admin@v10.0.2?dts';

const text = await Deno.readTextFile('./firebase-adminsdk-credentials.json');
const adminKey = JSON.parse(text);
admin.initializeApp({
  credential: admin.credential.cert(adminKey),
});

const adminAuth = admin.auth();
adminAuth
  .getUserByEmail('user@admin.example.com')
  .then((user) => {
    // Add incremental custom claim without overwriting existing claims.
    const currentCustomClaims = user.customClaims;
    if (currentCustomClaims?.['admin']) {
      // Add level.
      currentCustomClaims['accessLevel'] = 10;
      // Add custom claims for additional privileges.
      return adminAuth.setCustomUserClaims(user.uid, currentCustomClaims);
    }
  })
  .catch((error) => {
    console.log(error);
  });
