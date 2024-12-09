import { Sequelize } from '@sequelize/core'
import { MySqlDialect } from '@sequelize/mysql'

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'aula_api',
  user: 'admin',
  password: 'admin',
  host: 'localhost',
  port: 33302,
  pool: {
    max: 10,        // Número máximo de conexões no pool
    min: 0,         // Número mínimo de conexões no pool
    acquire: 30000, // Tempo máximo (ms) que o pool tentará obter uma conexão
    idle: 10000     // Tempo (ms) que uma conexão pode ficar ociosa antes de ser liberada
  }
})

export async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('BD conectado', process.env.SQLITE_DB)
  } catch (error) {
    console.error('Erro ao conectar com o BD:', error)
  }
}

export default sequelize
