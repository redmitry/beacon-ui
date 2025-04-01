const fs = require("fs");
const path = require("path");
const validateConfig = require("./validateConfig");

function loadConfig(configPath = "config.example.json") {
  // Read and parse JSON (same as before)
  let rawConfig, config;
  try {
    rawConfig = fs.readFileSync(path.resolve(__dirname, configPath), "utf8");
    config = JSON.parse(rawConfig);
  } catch (err) {
    throw new Error(`Config file error: ${err.message}`);
  }

  // Delegate validation
  const { isValid, error, config: validatedConfig } = validateConfig(config);
  if (!isValid) throw new Error(`Config validation failed:\n${error}`);

  return validatedConfig;
}

module.exports = loadConfig;
