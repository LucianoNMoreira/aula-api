import Produto from './produto'
import Categoria from './categoria'

// Definir relacionamentos
Categoria.hasMany(Produto, {
  foreignKey: 'categoriaId', // Nome da coluna na tabela 'produtos'
  as: 'produtos', // Alias para acessar os produtos de uma categoria
})

Produto.belongsTo(Categoria, {
  foreignKey: 'categoriaId', // Nome da coluna na tabela 'produtos'
  as: 'categoria', // Alias para acessar a categoria de um produto
})

async function testAssociations() {
  let [cat]: [any, boolean] = await Categoria.findOrCreate(
    {
      where: { nome: 'Categoria 1' },
      defaults: {
        nome: 'Categoria 1'
      }
    }
  )
  let [p]: [any, boolean] = await Produto.findOrCreate({
    where: { nome: 'Produto 1' },
    defaults: {
      nome: 'Produto 1',
      valor: 100,
      categoriaId: cat.id
    }
  })

  await Produto.findOrCreate({
    where: { nome: 'Produto 2' },
    defaults: {
      nome: 'Produto 2',
      valor: 150,
      categoriaId: cat.id
    }
  })

  await Produto.findOrCreate({
    where: { nome: 'Produto 3' },
    defaults: {
      nome: 'Produto 3',
      valor: 150
    }
  })

  // Eager loading
  p = await Produto.findByPk(p.id, {
    include: [
      {model: Categoria, as: 'categoria'}
    ]
  }) as Produto
  console.log(`[Eager Loading] Produto ${p.nome}, categoria ${p.categoria?.nome}`)

  // Lazy loading
  p = await Produto.findByPk(p.id) as Produto
  console.log(`[Lazy Loading] Produto ${p.nome}, categoria ${p.categoria?.nome}`)

  cat = await p.getCategoria()
  console.log(`[Lazy Loading] Produto ${p.nome}, categoria ${cat.nome}`)

  const produtosCategoria = await cat.getProdutos()
  console.log(`Produtos da categoria ${cat.nome}: ${produtosCategoria.map((p: Produto) => p.nome).join(', ')}`)
}

setTimeout(() => {
  console.log('===== Testando Associações ===== ')
  testAssociations()
}, 2000)
