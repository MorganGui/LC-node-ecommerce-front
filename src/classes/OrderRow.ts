export default class OrderRow {
  id: number | null
  order: number | null
  product: number
  quantity: number

  constructor(id: number | null, order: number | null, product: number, quantity: number) {
    this.id = id
    this.order = order
    this.product = product
    this.quantity = quantity
  }
}
