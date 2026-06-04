import fs from "node:fs";

const required = [
  "NODEBB_URL",
  "NODEBB_SECRET",
  "POSTGRESQL_ADDON_HOST",
  "POSTGRESQL_ADDON_PORT",
  "POSTGRESQL_ADDON_DB",
  "POSTGRESQL_ADDON_USER",
  "POSTGRESQL_ADDON_PASSWORD"
];

for (const name of required) {
  if (!process.env[name]) {
    throw new Error(`Missing required env var: ${name}`);
  }
}

const config = {
  url: process.env.NODEBB_URL,
  secret: process.env.NODEBB_SECRET,
  database: "postgres",
  port: Number(process.env.PORT || 8080),
  bind_address: "0.0.0.0",
  postgres: {
    host: process.env.POSTGRESQL_ADDON_HOST,
    port: Number(process.env.POSTGRESQL_ADDON_PORT),
    username: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    ssl: true
  }
};

if (
  process.env.NODEBB_ADMIN_USERNAME &&
  process.env.NODEBB_ADMIN_EMAIL &&
  process.env.NODEBB_ADMIN_PASSWORD
) {
  config.admin = {
    username: process.env.NODEBB_ADMIN_USERNAME,
    email: process.env.NODEBB_ADMIN_EMAIL,
    password: process.env.NODEBB_ADMIN_PASSWORD,
    "password:confirm": process.env.NODEBB_ADMIN_PASSWORD
  };
}

fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
console.log("Generated config.json for Clever Cloud");