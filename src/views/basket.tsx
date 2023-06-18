import { Link } from 'react-router-dom'
import OrderRow from '../classes/OrderRow'
import Product from '../classes/Product'
import User from '../classes/User'

export default ({ products, basket, setBasket, user }: { products: Product[], basket: OrderRow[], setBasket: Function, user: User | null }) => {
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
  function validateBasket() {
    console.log('panier validé')
    // TODO: validate basket
  }

  function ValidateBasketButton() {
    if (user) return (
      <button onClick={() => validateBasket()}>Valider le panier</button>
    )

    else return (
      <p>Pour valider le panier, vous devez vous <Link to="/login">connecter</Link>.</p>
    )
  }

  if (basket.length > 0) return (
    <div className="basket center">
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
      <ValidateBasketButton />
    </div>
  )

  else return (
    <p>Votre panier est vide, vous pouvez ajouter des produits depuis <Link to="/">la liste des produits</Link></p>
  )
}
