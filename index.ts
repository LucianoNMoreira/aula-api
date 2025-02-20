import dotenv from 'dotenv'
dotenv.config()

import Produto from './classes/produto_mongo'
import express from 'express'
import cors from 'cors'


const app = express()
const PORTA = process.env.PORTA

app.use(cors())
app.use(express.json());

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aula API',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: [
    './index.ts'
  ], // Define onde os comentários da API estão
}

const swaggerDocs = swaggerJsDoc(options)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         valor:
 *           type: number
 *           description: Valor do produto
 *       example:
 *         nome: "Produto Exemplo"
 *         valor: 100
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find()
  res.send(produtos)
})

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro ao criar o produto
 */
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

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
app.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findById(req.params.id)
  if (produto) {
    res.send(produto)
  } else {
    res.status(404).send('Produto não encontrado')
  }
})

/**
 * @swagger
 * /produtos/search/{nome}:
 *   get:
 *     summary: Busca produtos pelo nome
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do produto
 *     responses:
 *       200:
 *         description: Produtos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Nenhum produto encontrado
 */
app.get('/produtos/search/:nome', async (req, res) => {
  const produtos = await Produto.find({
    nome: {
      $regex: `^${req.params.nome}`,
      $options: "i" // Case-insensitive
    }
  })
  res.send(produtos)
})

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao atualizar o produto
 */
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

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao deletar o produto
 */
app.delete('/produtos/:id', async (req, res) => {
  // // Não retorna o documento removido
  // await Produto.deleteOne({_id: req.params.id})

  // Retorna o documento removido
  await Produto.findByIdAndDelete({ _id: req.params.id })
  res.status(200).send()
})

/**
 * @swagger
 * /relatorios/soma_valores:
 *   get:
 *     summary: Retorna a soma dos valores de todos os produtos
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Soma dos valores dos produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valorTotal:
 *                   type: number
 *                   description: Soma dos valores dos produtos
 *       500:
 *         description: Erro ao gerar o relatório
 */
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

/**
 * @swagger
 * /relatorios/qtde_produtos:
 *   get:
 *     summary: Retorna a quantidade total de produtos
 *     tags: [Relatórios]
 *     responses:
 *       200:
 *         description: Quantidade total de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantidade:
 *                   type: number
 *                   description: Quantidade total de produtos
 *       500:
 *         description: Erro ao gerar o relatório
 */
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
