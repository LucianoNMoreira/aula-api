export interface IProduto {
  id?: number 
  nome: string
  valor: number
}

export default class Produto implements IProduto {
  id?: number | undefined
  nome: string
  valor: number
  
  constructor(id: number | undefined, nome: string, valor: number) {
    this.id = id
    this.nome = nome
    this.valor = valor
  }

  setId(id: number) {
    this.id = id
  }

  getId() {
    return this.id
  }

  setNome(nome: string) {
    this.nome = nome
  }

  getNome() {
    return this.nome
  }

  setValor(valor: number) {
    this.valor = valor
  }

  getValor() {
    return this.valor
  }

  getDescricao() {
    return `O produto ${this.nome} custa R$ ${this.valor}`
  }
}
