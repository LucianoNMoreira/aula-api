import { DataTypes, InferAttributes, InferCreationAttributes, Model, ModelDefined, Optional } from "sequelize"
import db from '../utils/bd'

export interface ICategoria {
  id?: number
  nome: string
}

type ICategoriaCreationAttributes = Optional<ICategoria, 'id'>;

const Categoria : ModelDefined<ICategoria, ICategoriaCreationAttributes> = db.define(
  'categorias',
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
    tableName: 'categorias',
    timestamps: true
  }
)

export default Categoria
