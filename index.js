require('dotenv').config()
const Produto = require('./classes/produto.js')

const express = require('express')
const cors = require('cors');

const app = express()
const PORTA = process.env.PORTA

const PRODUTOS = []

// Habilita CORS para todas as origens
app.use(cors())

// Habilita CORS para origens específicas
// app.use(cors({
//   origin: 'http://meusite.com', // Permite somente essa origem
//   methods: ['GET', 'POST'],     // Permite apenas métodos específicos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
// }))

// Adiciona middleware que faz parse de JSON 
app.use(express.json());

app.get('/produtos', (req, res) => {
  res.send(PRODUTOS)
})

app.post('/produtos', (req, res) => {
  // Obtém o último ID de produtos OU zero, caso não exista
  const ids = PRODUTOS.map((p) => p.id)
  let ultimoId = ids.length > 0 ? Math.max(...ids) : 0
  const id = ultimoId + 1

  const produto = new Produto(id, req.body.nome, req.body.valor)

  PRODUTOS.push(produto)

  res.send(produto)
})

app.get('/produtos/:id', (req, res) => {
  // Encontra o protudo
  const produto = PRODUTOS.find((p) => p.id == req.params.id)

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
  const produtoIndex = PRODUTOS.findIndex(p => p.id == req.params.id)

  if (produtoIndex !== -1) {
    const produto = PRODUTOS[produtoIndex]
    
    // Atualizando os atributos do produto
    produto.nome = req.body.nome
    produto.valor = req.body.valor
    
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
  const produtoIndex = PRODUTOS.findIndex(p => p.id == req.params.id)

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
