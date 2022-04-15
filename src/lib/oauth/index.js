const axios = require("axios");
const jose = require("jose");

const issuer = "https://appleid.apple.com";
const audience = "com.bt.siwa";
const APPLE_KEY_URI = "https://appleid.apple.com/auth/keys";

async function getKeyFromApple(token) {
  const kid = jose.decodeProtectedHeader(token);
  const { data } = await axios.get(APPLE_KEY_URI);
  const keygroup = data.keys;
  return keygroup.filter((k) => (k.kid = kid))[0];
}

module.exports.verify = async function verify(token) {
  try {
    const appleJWK = await getKeyFromApple(token);
    const rsaPublicKey = await jose.importJWK(appleJWK);
    const { payload } = await jose.jwtVerify(token, rsaPublicKey, {
      issuer,
      audience
    });
    return { authorized: true, payload };
  } catch (e) {
    return { authorized: false };
  }
};
