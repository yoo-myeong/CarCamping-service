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
  port: parseInt(required("PORT", 8000)),
  db: {
    host: required("DB_HOST"),
    database: required("DB_DATABASE"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
  },
  bcrypt: {
    saltRound: parseInt(required("SALTROUNDS"), 12),
  },
  jwt: {
    screatKey: required("JWTSECREATKEY"),
  },
  cors: {
    allowedOrigin: required("CORS_ALLOW_ORIGIN"),
  },
  domain: required("DOMAIN"),
  admin: {
    email: required("ADMIN_EMAIL"),
    password: required("ADMIN_PASSWORD"),
  },
};
