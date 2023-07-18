require('dotenv').config();

const environmentVariablesConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'toor',
  database: process.env.DB_NAME || 'good_lock',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  seederStorage: 'sequelize',
  logging: false,
};

function printConfig() {
  console.log('DB_USERNAME: ' + environmentVariablesConfig.username);
  console.log('DB_PASSWORD: ' + toStars(environmentVariablesConfig.password));
  console.log('DB_NAME: ' + environmentVariablesConfig.database);
  console.log('DB_HOST: ' + environmentVariablesConfig.host);
  console.log('DB_PORT: ' + environmentVariablesConfig.port);
  console.log('DB_DIALECT: ' + environmentVariablesConfig.dialect);
}

printConfig();

export const development = environmentVariablesConfig;
export const test = environmentVariablesConfig;
export const production = environmentVariablesConfig;

function toStars(configVariable) {
  return [...configVariable].map(() => '*').join('');
}
