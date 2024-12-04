import dotenv from 'dotenv'
dotenv.config()

import Produto from './classes/produto'
import express from 'express'
import cors from 'cors'

import db, {testConnection} from './utils/bd'

testConnection()

const app = express()
const PORTA = process.env.PORTA

const PRODUTOS: Produto[] = []
PRODUTOS.push(new Produto(undefined, 'teste', 100))

app.use(cors())
app.use(express.json());

app.get('/produtos', async (req, res) => {
  const result = await db.query('select * from produtos')
  console.log('result', result)
  const produtos = result[0].map((r: any) => new Produto(r.id, r.nome, r.valor))
  res.send(produtos)
})

app.post('/produtos', async (req, res) => {
  const produto = new Produto(undefined, req.body.nome, req.body.valor)

  const result : any = await db.query(`INSERT INTO produtos (nome, valor) VALUES ("${produto.nome}", ${produto.valor})`)
  console.debug('result', result)
  produto.id = result[1].lastID

  res.send(produto)
})

app.get('/produtos/:id', async (req, res) => {
  // Encontra o protudo
  const result: any = await db.query(`SELECT * FROM produtos where id = ${req.params.id}`)
  console.debug('result', result)
  const produto = new Produto(result[0][0].id, result[0][0].nome, result[0][0].valor)

  if (produto) {
    // Retorna o produto
    res.send(produto)
  } else {
    // Retorna status de "Página não encontrada"
    res.status(404).send('Produto não encontrado')
  }
})

app.put('/produtos/:id', async (req, res) => {
  await db.query(`UPDATE produtos set nome="${req.body.nome}", valor=${req.body.valor} WHERE id = ${req.params.id}`)
  res.sendStatus(200)
})

// Deletar um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
  await db.query(`DELETE from produtos WHERE id = ${req.params.id}`)
  res.status(200).send()
})


app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})
