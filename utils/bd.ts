import { Sequelize } from 'sequelize'

const DB_HOST = 'localhost'
const DB_NAME = 'aula_api'
const DB_USER = 'admin'
const DB_PASSWORD = 'admin'
const DB_PORT = 33302

const CONNECTION_URL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const sequelize = new Sequelize(CONNECTION_URL, {
  dialect: 'mysql',
  pool: {
    max: 10,        // Número máximo de conexões no pool
    min: 0,         // Número mínimo de conexões no pool
    acquire: 30000, // Tempo máximo (ms) que o pool tentará obter uma conexão
    idle: 10000     // Tempo (ms) que uma conexão pode ficar ociosa antes de ser liberada
  }
});

(async () => {
  try {
    await sequelize.sync({force: false})
    await sequelize.authenticate()
    console.debug('BD conectado')
  } catch (error) {
    console.error('Erro:', error);
  }
})();

export default sequelize
