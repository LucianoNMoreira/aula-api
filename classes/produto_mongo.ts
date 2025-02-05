import mongoose from './mongodb'

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true, index: true },
    valor: { type: Number, required: false }
  },
  {
    versionKey: false
  }
)

const Produto = mongoose.model('Produto', ProdutoSchema)

export default Produto
