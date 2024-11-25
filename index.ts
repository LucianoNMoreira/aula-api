import dotenv from 'dotenv'
import Produto from './classes/produto'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()
const PORTA = process.env.PORTA

const PRODUTOS: Produto[] = []

app.use(cors())
app.use(express.json());

app.get('/produtos', (req, res) => {
  res.send(PRODUTOS)
})

app.post('/produtos', (req, res) => {
  /**
   * Obtém o último ID de produtos OU zero, caso não exista
   * "as number[]" força o objeto a ser entendido como number[]. 
   * Não é uma boa prática, mas conhecemos bem nossos dados de entrada
   * */ 
  const ids: number[] = PRODUTOS.map((p) => p.id) as number[]
  let ultimoId = ids.length > 0 ? Math.max(...ids) : 0
  const id = ultimoId + 1

  const produto = new Produto(id, req.body.nome, req.body.valor)

  PRODUTOS.push(produto)

  res.send(produto)
})

app.get('/produtos/:id', (req, res) => {
  // Encontra o protudo
  const produto = PRODUTOS.find((p) => p.id == Number(req.params.id))

  if (produto) {
    // Retorna o produto
    res.send(produto)
  } else {
    // Retorna status de "Página não encontrada"
    res.status(404).send('Produto não encontrado')
  }
})

app.put('/produtos/:id', (req, res) => {
  // Encontra o índice do produto
  const produtoIndex = PRODUTOS.findIndex(p => p.id == Number(req.params.id))

  if (produtoIndex !== -1) {
    const produto = PRODUTOS[produtoIndex]
    
    // Atualizando os atributos do produto
    produto.setNome(req.body.nome)
    produto.setValor(req.body.valor)
    
    // Atualiza o produto no array
    PRODUTOS[produtoIndex] = produto

    res.sendStatus(200)
  } else {
    // Retorna status de "Página não encontrada"
    res.status(404).send('Produto não encontrado')
  }
})

// Deletar um produto pelo ID
app.delete('/produtos/:id', (req, res) => {
  const produtoIndex = PRODUTOS.findIndex(p => p.id == Number(req.params.id))

  if (produtoIndex !== -1) {
    // Remove o elemento do index
    PRODUTOS.splice(produtoIndex, 1)
    // Retorna status de sucesso
    res.status(200).send()
  } else {
    res.status(404).send('Produto não encontrado')
  }
})


app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})
