import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error("key is undefined");
  }
  return value;
}

export const config = {
  port: parseInt(required("PORT", 8080)),
  db: {
    database: required("DATABASE"),
    host: required("HOST"),
    password: required("PASSWORD"),
  },
  bcrypt: {
    saltRound: parseInt(required("SALTROUNDS")),
  },
  jwt: {
    screatKey: required("JWTSECREATKEY"),
  },
  // cors: {
  //   allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  // },
};
