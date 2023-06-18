import { Link } from 'react-router-dom'
import OrderRow from '../classes/OrderRow'
import Product from '../classes/Product'

export default ({ products, basket, setBasket }: { products: Product[], basket: OrderRow[], setBasket: Function }) => {
  function addToBasket(product: Product) {
    const quantity = 1

    const old_row = basket.find(row => row.product === product.id)
    let tmp_basket

    if (old_row) {
      tmp_basket = basket.map(row => {
        if (row.product === old_row.product) {
          row.quantity += quantity
        }
        return row
      })
    } else if (product.id) {
      const new_row = new OrderRow(null, null, product.id, quantity)
      tmp_basket = basket.concat([new_row])
    }
    setBasket(tmp_basket)
  }
  function QuantityInBasket({ id }: { id: number | null }) {
    const basketRow = basket.find(row => row.product === id)
    let quantity = 0
    if (basketRow) {
      quantity = basketRow.quantity
    }
    if (quantity > 0) return (
      <h4>( {quantity} )</h4>
    )
  }

  return (
    <div className="products-container">
      {
        products.map((product, index) => {
          return (
            <div className="card" key={index}>
              <h2>{product.name}</h2>
              <img src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
              <span>{product.price}€</span>
              <button onClick={() => addToBasket(product)} className="row center gap-2">Ajouter au panier<QuantityInBasket id={product.id} /></button>
              <Link to={`/product/${product.id}`} className="row end pr-5 pb-3">En savoir plus</Link>
            </div>
          )
        })
      }
    </div>
  )
}
