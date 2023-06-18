import { Link } from 'react-router-dom'
import User from '../classes/User'
import OrderRow from '../classes/OrderRow'

export default ({ user, basket }: { user: User | null, basket: OrderRow[] }) => {
  function LoginButton() {
    if (user === null) return (
      <Link to="/login">Connexion</Link>
    )
  }
  function RegisterButton() {
    if (user === null) return (
      <Link to="/register">Inscription</Link>
    )
  }
  function FullName() {
    if (user !== null) return (
      <Link to="/profile">{user.firstname + ' ' + user.lastname + (user.role === 'admin' ? ' (admin)' : '')}</Link>
    )
  }
  function Dashboard() {
    if (user && user.role === 'admin') return (
      <div className="col">
        <Link to="/order-manager">Dashboard</Link>
      </div>
    )
  }
  function BasketLength() {
    if (basket.length > 0) {
      let quantity = 0
      for (const row of basket) {
        quantity += row.quantity
      }

      return (
        <h3>( {quantity} )</h3>
      )
    }
  }

  return (
    <header>
      <Link to="/"><h1>ecommerce</h1></Link>
      <span>
        <Dashboard />
        <Link to="/basket" className="row center gap-2">
          <BasketLength />
          <i className="fa-solid fa-basket-shopping fa-xl"></i>
        </Link>
        <FullName />
        <RegisterButton />
        <LoginButton />
      </span>
    </header>
  )
}
