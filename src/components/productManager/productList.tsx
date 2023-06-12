import Product from '../../classes/Product'
import User from '../../classes/User'
import ProductFields from './ProductFields'

export default ({ user, products, reloadProducts }: { user: User | null, products: Product[], reloadProducts: Function }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, index) => {
            return (
              <tr key={index}>
                <ProductFields user={user} product={product} reloadProducts={reloadProducts} />
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
