import dotenv from 'dotenv'
dotenv.config()

import Produto from './classes/produto_mongo'
import express from 'express'
import cors from 'cors'

const app = express()
const PORTA = process.env.PORTA

app.use(cors())
app.use(express.json());

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find().lean()
  res.send(produtos)
})

app.post('/produtos', async (req, res) => {
  const produto = await Produto.create({
    nome: req.body.nome,
    valor: req.body.valor
  })

  res.send(produto)
})

app.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id)
  if (produto) {
    res.send(produto)
  } else {
    res.status(404).send('Produto não encontrado')
  }
})

app.put('/produtos/:id', async (req, res) => {
  // Opção 1: Buscar e atualizar manualmente
  // const produto = await Produto.findById(req.params.id)
  // if (produto) {
  //   produto.nome = req.body.nome
  //   produto.valor = req.body.valor
  //   await produto.save()
  // }

  // Opção 2: Buscar e atualizar em um único comando
  await Produto.updateOne(
    { _id: req.params.id }, // Filtro
    { // valores para atualização
      nome: req.body.nome,
      valor: req.body.valor
    }
  )

  res.sendStatus(200)
})

// Deletar um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
  await Produto.deleteOne({_id: req.params.id})
  res.status(200).send()
})


app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})
