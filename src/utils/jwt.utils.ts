import jwt from "jsonwebtoken";
import config from "config";

export const signJwt = (
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  // const signedKey = jwt.sign(object, signingKey, {
  //   ...(options && options),
  //   algorithm: "RS256",
  // });

  const signedKey = jwt.sign(object, signingKey, {
    ...(options && options),
  });
  return signedKey;
};

export const verifyJwt = (
  token: string,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"
) => {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
