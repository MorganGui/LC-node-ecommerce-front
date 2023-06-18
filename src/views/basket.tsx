import { Link } from 'react-router-dom'
import OrderRow from '../classes/OrderRow'
import Product from '../classes/Product'

export default ({ products, basket, setBasket }: { products: Product[], basket: OrderRow[], setBasket: Function }) => {
  function removeFromBasket(editedRow: OrderRow) {
    const tmp_basket = basket.map(row => {
      if (row.product === editedRow.product) {
        row.quantity --
      }
      return row
    })
    setBasket(
      tmp_basket.filter(row => row.quantity > 0)
    )
  }

  if (basket.length > 0) return (
    <table>
      <thead>
        <tr>
          <th>Produit</th>
          <th>Prix unitaire</th>
          <th>Quantité</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
        <tbody>
          {
            basket.map((row, index) => {
              const product = products.find(product => product.id === row.product)

              if (product) return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                  <td>{row.quantity}</td>
                  <td>{(product.price * row.quantity).toFixed(2)}€</td>
                  <td>
                    <button className="error" onClick={() => removeFromBasket(row)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
    </table>
  )

  else return (
    <>Votre panier est vide, vous pouvez ajouter des produits depuis <Link to="/">la liste des produits</Link></>
  )
}
