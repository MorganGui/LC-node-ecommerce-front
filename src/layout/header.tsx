import { Link } from 'react-router-dom'
import User from '../classes/User'

export default ({ user }: { user: User | null }) => {
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
  function ManagerLink() {
    if (user && user.role === 'admin') return (
      <div className="col">
        <Link to="/product-manager">Gérer les produits</Link>
        <Link to="/user-manager">Gérer les utilisateurs</Link>
      </div>
    )
  }

  return (
    <header>
      <Link to="/"><h1>ecommerce</h1></Link>
      <span>
        <RegisterButton />
        <LoginButton />
        <ManagerLink />
        <FullName />
      </span>
    </header>
  )
}
