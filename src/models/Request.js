export default class Request {
  constructor(id, info, supplier, fisco, payment) {
    this.id = id
    this.info = info
    this.supplier = supplier
    this.fisco = fisco // Defina o campo fisco como uma instância de Fisco
    this.products = []
    this.payment = payment
  }

  addProduct(product) {
    this.products.push(product)
  }
}