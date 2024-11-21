class Produto {

  constructor(id, nome, valor) {
    this.id = id
    this.nome = nome
    this.valor = valor
  }
  
  setId(id) {
    this.id = id
  }

  getId() {
    return this.id
  }

  setNome(nome) {
    this.nome = nome
  }

  getNome() {
    return this.nome
  }

  setValor(valor) {
    this.valor = valor
  }

  getValor() {
    return this.valor
  }

  getDescricao() {
    return `O produto ${nome} custa R$ ${valor}`
  }

}

module.exports = Produto

// const produto = new Produto(null, 'Produto 1', 1000);
// console.log(produto.nome)
// console.log(produto.getNome())
// produto.setNome('Novo nome')
// console.log(produto.getNome())
