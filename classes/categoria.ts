import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"
import db from '../utils/bd'

export interface ICategoria {
  id?: number
  nome: string
}

export default class Categoria extends Model<InferAttributes<Categoria>, InferCreationAttributes<Categoria>> implements ICategoria {
  declare id?: number
  declare nome: string

  setNome(nome: string) {
    this.nome = nome
  }

  getNome() {
    return this.nome
  }
}

// Inicialização do modelo com o Sequelize
Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'categorias',
    timestamps: true
  }
)
