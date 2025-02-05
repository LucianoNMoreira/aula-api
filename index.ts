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
  const produtos = await Produto.find()
  res.send(produtos)
})

app.post('/produtos', async (req, res) => {
  try {
  const produto = await Produto.create({
    nome: req.body.nome,
    valor: req.body.valor
  })

  res.send(produto)
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send(error)
  }
})

app.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id)
  if (produto) {
    res.send(produto)
  } else {
    res.status(404).send('Produto não encontrado')
  }
})

app.get('/produtos/search/:nome', async (req, res) => {
  const produtos = await Produto.find({
    nome: {
      $regex: `^${req.params.nome}`,
      $options: "i" // Case-insensitive
    }
  })
  res.send(produtos)
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
  // // Não retorna o documento removido
  // await Produto.deleteOne({_id: req.params.id})

  // Retorna o documento removido
  await Produto.findByIdAndDelete({ _id: req.params.id })
  res.status(200).send()
})

app.get('/relatorios/soma_valores', async (requestAnimationFrame, res) => {
  try {
    const resultado = await Produto.aggregate([
      { $group: { _id: null, valorTotal: { $sum: "$valor" } } }
    ]);

    console.log('Resultado:', resultado);
    res.status(200).send(resultado)
  } catch (error) {
    console.error('Erro na agregação:', error);
    res.status(500).send(error)
  }
})

app.get('/relatorios/qtde_produtos', async (requestAnimationFrame, res) => {
  try {
    const resultado = await Produto.aggregate([
      { $count: 'quantidade' }
    ]);

    console.log('Resultado:', resultado);
    res.status(200).send(resultado)
  } catch (error) {
    console.error('Erro na agregação:', error);
    res.status(500).send(error)
  }
})

app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})
