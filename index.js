const express = require('express')
const app = express()
const PORTA = 3000

const PRODUTOS = []

// Adiciona middleware que faz parse de JSON 
app.use(express.json());

app.get('/produtos', (req, res) => {
  res.send(PRODUTOS)
})

app.post('/produtos', (req, res) => {
  const produto = req.body

  // Obtém o último ID de produtos OU zero, caso não exista
  let ultimoId = Math.max(PRODUTOS.map((p) => p.id)) || 0
  // Atribui o próximo ID para o novo produto
  produto.id = ultimoId + 1
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
    // Substitui o objeto atual pelo novo
    PRODUTOS[produtoIndex] = {
      ...req.body,
      id: PRODUTOS[produtoIndex].id
    }

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
