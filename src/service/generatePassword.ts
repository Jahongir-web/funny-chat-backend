import crypto from "crypto";

const helperFunctions = {
  generatePassword: async () => {
    const password = await crypto.randomBytes(4).toString("hex");

    return password;
  },
};

export default helperFunctions;
