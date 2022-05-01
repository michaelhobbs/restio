import { importPKCS8, SignJWT } from 'https://deno.land/x/jose@v4.6.0/index.ts';

const JWT_EXPIRATION_TIME = '1h';
const JWT_ALGORITHM = 'RS256';

const text = await Deno.readTextFile('./firebase-adminsdk-credentials.json');
const serviceAccount = JSON.parse(text);
console.log('service account json: ', serviceAccount);
const {
  private_key: privateKey,
  client_email: clientEmail,
  token_uri: tokenUri,
} = serviceAccount;

const createAuthJwt: () => Promise<string> = async () => {
  const claims = {
    scope: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/firebase.database',
      'https://www.googleapis.com/auth/firebase.messaging',
      'https://www.googleapis.com/auth/identitytoolkit',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  console.log('importing...');
  const key = await importPKCS8(privateKey, JWT_ALGORITHM);

  const jwt = await new SignJWT(claims)
    .setProtectedHeader({ alg: JWT_ALGORITHM, typ: 'JWT' })
    .setIssuedAt()
    .setIssuer(clientEmail)
    .setAudience(tokenUri)
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(key);
  console.log('jwt: ', jwt);
  return jwt;
};

/**
 * Obtain a new OAuth2 token by making a remote service call.
 */
function requestAccessToken(request: Request): Promise<Response> {
  // return client.send(request).then((resp: any) => {
  //   const json = resp.data;
  //   if (!json.access_token || !json.expires_in) {
  //     throw new Error(
  //       'AppErrorCodes.INVALID_CREDENTIAL',
  //       `Unexpected response while fetching access token: ${ JSON.stringify(json) }`,
  //     );
  //   }
  //   return json;
  // }).catch((err: any) => {
  //   throw new Error('AppErrorCodes.INVALID_CREDENTIAL', err);
  // });
  return fetch(request);
}

const token = await createAuthJwt();
const postData =
  'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' +
  token;
console.log('post data: ', postData);
const request = new Request(tokenUri, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: postData,
});
const response = await requestAccessToken(request);

console.log('response', response);
console.log(await response.json());
