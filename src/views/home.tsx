import { useEffect, useState } from 'react'
import OrderRow from '../classes/OrderRow'
import Product from '../classes/Product'

export default ({ basket, setBasket }: { basket: OrderRow[], setBasket: Function }) => {
  const [products, setProducts]: [Product[], Function] = useState([])
  useEffect(() => {
    Product.getAll().then(data => {
      if (typeof data === 'string') {
        alert(data)
      } else {
        setProducts(data)
      }
    })
  }, [])

  function addToBasket(product: Product) {
    const quantity = 1

    const old_row = basket.find(row => row.product === product.id)
    let tmp_basket

    if (old_row) {
      tmp_basket = basket.map(row => {
        if (row.product === old_row.product) {
          row.quantity += quantity
          return row
        }
        else return row
      })
    } else if (product.id) {
      const new_row = new OrderRow(null, null, product.id, quantity)
      tmp_basket = basket.concat([new_row])
    }
    setBasket(tmp_basket)
    console.clear()
    console.table(tmp_basket)
  }

  return (
    <div className="products-container">
      {
        products.map((product, index) => {
          return (
            <div className="card" key={index} onClick={() => addToBasket(product)}>
              <h2>{product.name}</h2>
              <img src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" />
              <span>{product.price}€</span>
              <p>{product.desc}</p>
            </div>
          )
        })
      }
    </div>
  )
}
