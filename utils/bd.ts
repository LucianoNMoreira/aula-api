import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.SQLITE_DB
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
