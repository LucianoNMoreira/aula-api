import { Sequelize } from '@sequelize/core'
import { MySqlDialect } from '@sequelize/mysql'

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: 'aula_api',
  user: 'admin',
  password: 'admin',
  host: 'localhost',
  port: 33302,
});

export async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('BD conectado', process.env.SQLITE_DB)
  } catch (error) {
    console.error('Erro ao conectar com o BD:', error)
  }
}

export default sequelize
