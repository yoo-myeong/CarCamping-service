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
  backend_server: required("BACKEND_SERVER"),
};
