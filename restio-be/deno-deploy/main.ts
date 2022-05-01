// This project is following Deno Deploy guide:
// https://deno.com/deploy/docs/tutorial-firebase
// Note: @hobbs 02/04/22: Upgraded firebase to v9, fixed types, added dotenv, collection changed to `restaurants`

import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

/**
 * The first thing we will do is import the XMLHttpRequest polyfill that Firebase needs
 * to work under Deploy as well as a polyfill for localStorage to allow the Firebase auth
 * to persist logged in users:
 */
import 'https://deno.land/x/xhr@0.1.1/mod.ts';
import { installGlobals } from 'https://deno.land/x/virtualstorage@0.1.0/mod.ts';
installGlobals();

/**
 * Because Deploy has a lot of the web standard APIs, it is best to use the web libraries
 * for Firebase under deploy. Currently v9 is in still in beta for Firebase, so we will use
 * v8 in this tutorial:
 */
// @deno-types="https://cdn.esm.sh/v58/firebase@9.6.10/app/dist/app/index.d.ts"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js'; // https://cdn.skypack.dev/firebase@8.7.0/app';
// @deno-types="https://cdn.esm.sh/v58/firebase@9.6.10/auth/dist/auth/index.d.ts"
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'; // 'https://cdn.skypack.dev/firebase@8.7.0/auth';
// @deno-types="https://cdn.esm.sh/v58/firebase@9.6.10/firestore/dist/firestore/index.d.ts"
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'; // 'https://cdn.skypack.dev/firebase@8.7.0/firestore';

/**
 * We are also going to use oak as the middleware framework for creating the APIs, including
 * middleware that will take the localStorage values and set them as client cookies:
 */
import {
  Application,
  Context,
  Router,
  Status,
} from 'https://deno.land/x/oak@v7.7.0/mod.ts';
import { virtualStorage } from 'https://deno.land/x/virtualstorage@0.1.0/middleware.ts';

const env = Deno.env.toObject();
const PORT = Number(env.PORT) || 8000;
const HOST = env.HOST || 'localhost';

const FIREBASE_CONFIG = env.FIREBASE_CONFIG;
const FIREBASE_USERNAME = env.FIREBASE_USERNAME;
const FIREBASE_PASSWORD = env.FIREBASE_PASSWORD;
// const GOOGLE_APPLICATION_CREDENTIALS = env.GOOGLE_APPLICATION_CREDENTIALS;
if (!FIREBASE_CONFIG || !FIREBASE_USERNAME || !FIREBASE_PASSWORD) {
  throw Error('Missing Environemnt Variables');
}

// /**
//  * We ensure that our technical user, defined in our Environment Variables, has the admin Role.
//  * This is a custom Claim that all users have.
//  * We will set rules on the Firebase DB and various of our API endpoints which restrict access
//  * based on the user's Role.
//  */
// import admin from 'https://cdn.skypack.dev/firebase-admin@v10.0.2?dts';

// const text = await Deno.readTextFile(GOOGLE_APPLICATION_CREDENTIALS);
// const adminKey = JSON.parse(text);

// admin.initializeApp({
//   credential: adminKey,
// });

// const adminAuth = admin.auth();
// adminAuth
//   .getUserByEmail('user@admin.example.com')
//   .then((user) => {
//     // Add incremental custom claim without overwriting existing claims.
//     const currentCustomClaims = user.customClaims;
//     if (currentCustomClaims?.['admin']) {
//       // Add level.
//       currentCustomClaims['accessLevel'] = 10;
//       // Add custom claims for additional privileges.
//       return adminAuth.setCustomUserClaims(user.uid, currentCustomClaims);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/**
 * Now we need to setup our Firebase application. We will be getting the configuration from
 * environment variables we will setup later under the key FIREBASE_CONFIG and get references
 * to the parts of Firebase we are going to use:
 */
const firebaseConfig = JSON.parse(FIREBASE_CONFIG);
const firebaseApp = initializeApp(firebaseConfig, 'example');
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const restaurantsRef = collection(db, 'restaurants');

/**
 * We are also going to setup the application to handle signed in users per request. So we
 * will create a map of users that we have previously signed in in this deployment. While in
 * this tutorial we will only ever have one signed in user, the code can easily be adapted to
 * allow clients to sign-in individually:
 */
const users = new Map();

/**
 * Let's create our middleware router and create three different middleware handlers to
 * support GET and POST of /restaurants and a GET of a specific restaurant on /restaurants/{name}:
 */
const router = new Router();

// Returns any restaurants in the collection
router.get('/restaurants', async (ctx) => {
  try {
    const querySnapshot = await getDocs(restaurantsRef);
    ctx.response.body = querySnapshot.docs.map((doc) => doc.data());
    ctx.response.type = 'json';
  } catch (e) {
    console.log('error: ', e);
  }
});

// Returns the first document that matches the name
router.get('/restaurants/:name', async (ctx) => {
  const { name } = ctx.params;
  const querySnapshot = await getDocs(
    query(restaurantsRef, where('name', '==', name))
  );
  const restaurant = querySnapshot.docs.map((doc) => doc.data())[0];
  if (!restaurant) {
    ctx.response.status = 404;
    ctx.response.body = `The restaurant named "${name}" was not found.`;
    ctx.response.type = 'text';
  } else {
    ctx.response.body = querySnapshot.docs.map((doc) => doc.data())[0];
    ctx.response.type = 'json';
  }
});

function isRestaurant(value: unknown) {
  return typeof value === 'object' && value !== null && 'name' in value;
}

// Removes any restaurants with the same title and adds the new restaurant
router.post('/restaurants', async (ctx) => {
  const body = ctx.request.body();
  if (body.type !== 'json') {
    ctx.throw(Status.BadRequest, 'Must be a JSON document');
  }
  const restaurant = await body.value;
  if (!isRestaurant(restaurant)) {
    ctx.throw(Status.BadRequest, 'Payload was not well formed');
  }
  const querySnapshot = await getDocs(
    query(restaurantsRef, where('name', '==', restaurant.title))
  );
  await Promise.all(querySnapshot.docs.map((doc) => deleteDoc(doc.ref)));
  await addDoc(restaurantsRef, restaurant);
  ctx.response.status = Status.NoContent;
});

/**
 * Ok, we are almost done. We just need to create our middleware application,
 * and add the localStorage middleware we imported:
 */
const app = new Application();
app.use(virtualStorage());

/**
 * And then we need to add middleware to authenticate the user. In this
 * tutorial we are simply grabbing the username and password from the
 * environment variables we will be setting up, but this could easily be adapted
 * to redirect a user to a sign-in page if they are not logged in:
 */
app.use(async (ctx, next) => {
  const signedInUid = ctx.cookies.get('LOGGED_IN_UID');
  const signedInUser = signedInUid != null ? users.get(signedInUid) : undefined;
  if (!signedInUid || !signedInUser || !auth.currentUser) {
    const creds = await signInWithEmailAndPassword(
      auth,
      FIREBASE_USERNAME,
      FIREBASE_PASSWORD
    );
    const { user } = creds;
    if (user) {
      users.set(user.uid, user);
      ctx.cookies.set('LOGGED_IN_UID', user.uid);
    } else if (signedInUser && signedInUser.uid !== auth.currentUser?.uid) {
      await auth.updateCurrentUser(signedInUser);
    }
  }
  return next();
});

/**
 * Middleware to catch errors and return Error response.
 */
const errorHandler = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

/**
 * Middleware to catch requests without matching handler.
 */
const notFound = (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = { msg: 'Not Found' };
};

/**
 * Now let's add our router to the middleware application and set the application
 * to listen on port 8000:
 */
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);
console.log('starting on http://localhost:8000 ....');
await app.listen({ hostname: HOST, port: PORT });

/**
 * Now we have an application that should serve up our APIs.
 */
