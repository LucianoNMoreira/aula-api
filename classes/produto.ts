import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize"
import db from '../utils/bd'

export interface IProduto {
  id?: number 
  nome: string
  valor: number
}

export default class Produto extends Model<InferAttributes<Produto>, InferCreationAttributes<Produto>> implements IProduto {
  declare id?: number | undefined
  declare nome: string
  declare valor: number
  
  setId(id: number) {
    this.id = id
  }

  getId() {
    return this.id
  }

  setNome(nome: string) {
    this.nome = nome
  }

  getNome() {
    return this.nome
  }

  setValor(valor: number) {
    this.valor = valor
  }

  getValor() {
    return this.valor
  }

  getDescricao() {
    return `O produto ${this.nome} custa R$ ${this.valor}`
  }
}

// Inicialização do modelo com o Sequelize
Produto.init(
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
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize: db, // Instância do Sequelize
    tableName: 'produtos', // Nome da tabela no banco de dados
    timestamps: false
  }
)
