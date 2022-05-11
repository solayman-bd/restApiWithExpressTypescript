const generateKey = (crypto: any) => {
  const accessTokenPublicKey = crypto.randomBytes(32).toString("hex");
  const refreshTokenPrivateKey = crypto.randomBytes(32).toString("hex");
  console.table({ accessTokenPublicKey, refreshTokenPrivateKey });
};
export default generateKey;
