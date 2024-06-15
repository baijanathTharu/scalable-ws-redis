import { config } from "dotenv";

config({
  path: ".env",
});

export const env = {
  APP_NAME: process.env.APP_NAME || "No_name",
  WHITELISTED_ORIGINS: process.env.WHITELISTED_ORIGINS || "",
  PORT: Number(process.env.PORT || 4000),
  REDIS_URL: process.env.REDIS_URL || "",
} as const;
