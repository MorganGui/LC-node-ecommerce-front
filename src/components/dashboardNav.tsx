import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="row center gap-5">
      <Link to="/order-manager">Commandes</Link>|
      <Link to="/product-manager">Produits</Link>|
      <Link to="/user-manager">Administrateurs</Link>
    </div>
  )
}
