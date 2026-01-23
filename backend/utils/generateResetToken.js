import crypto from "crypto";

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

  return {
    resetToken,
    hashedToken,
    expires
  };
};

export default generateResetToken;
