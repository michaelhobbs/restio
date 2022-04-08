// npm install
// deno run -A --unstable --compat testing.ts

import { createRequire } from 'https://deno.land/std@0.133.0/node/module.ts';

const require = createRequire(import.meta.url);
const admin = require('firebase-admin');

const text = await Deno.readTextFile('./firebase-adminsdk-credentials.json');
const adminKey = JSON.parse(text);

admin.initializeApp({
  credential: admin.credential.cert(adminKey),
  databaseURL: 'https://<db_name>.firebaseio.com',
});

const adminAuth = admin.auth();
await adminAuth
  .getUserByEmail('user@email.com')
  .then((user: any) => {
    // Add incremental custom claim without overwriting existing claims.
    const currentCustomClaims = user.customClaims;
    if (currentCustomClaims?.['admin']) {
      // Add level.
      currentCustomClaims['accessLevel'] = 10;
      // Add custom claims for additional privileges.
      return adminAuth.setCustomUserClaims(user.uid, currentCustomClaims);
    }
  })
  .catch((error: any) => {
    console.log(error);
  });
