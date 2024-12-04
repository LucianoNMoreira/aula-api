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
  const [results, metadata] = await db.query('select * from produtos')
  console.debug('meta', metadata)
  console.debug('results', results)
  const produtos = results.map((r: any) => new Produto(r.id, r.nome, r.valor))
  res.send(produtos)
})

app.post('/produtos', async (req, res) => {
  const produto = new Produto(undefined, req.body.nome, req.body.valor)

  const [results, meta]: [any[], any] = await db.query(`INSERT INTO produtos (nome, valor) VALUES ("${produto.nome}", ${produto.valor})`)
  console.debug('meta', meta)
  console.debug('results', results)
  produto.id = meta.lastID

  res.send(produto)
})

app.get('/produtos/:id', async (req, res) => {
  // Encontra o protudo
  const [results, meta]: [any[], any] = await db.query(`SELECT * FROM produtos where id = ${req.params.id}`)
  console.debug('meta', meta)
  console.debug('results', results)
  
  if (results.length > 0) {
    const produto = new Produto(results[0].id, results[0].nome, results[0].valor)
    // Retorna o produto
    res.send(produto)
  } else {
    // Retorna status de "Página não encontrada"
    res.status(404).send('Produto não encontrado')
  }
})

app.put('/produtos/:id', async (req, res) => {
  const [results, meta]: [any[], any] = await db.query(`UPDATE produtos set nome="${req.body.nome}", valor=${req.body.valor} WHERE id = ${req.params.id}`)
  console.debug('meta', meta)
  console.debug('results', results)
  res.sendStatus(200)
})

// Deletar um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
  const [results, meta]: [any[], any] = await db.query(`DELETE from produtos WHERE id = ${req.params.id}`)
  console.debug('meta', meta)
  console.debug('results', results)
  res.status(200).send()
})


app.listen(PORTA, () => {
  console.log(`API está ouvindo em http://localhost:${PORTA}`)
})
