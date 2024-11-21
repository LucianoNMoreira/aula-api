class Produto {

  constructor(id, nome, valor) {
    this.id = id
    this.nome = nome;
    this.valor = valor;
  }
  
  getDescricao() {
    return `O produto ${nome} custa R$ ${valor}`
  }

}

export default Produto

// const produto = new Produto(null, 'Produto 1', 1000);
// console.log(produto.nome)
// console.log(produto.valor)
