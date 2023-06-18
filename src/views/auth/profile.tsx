import { Link, useNavigate } from 'react-router-dom'
import User from '../../classes/User'

export default ({ user, setUser }: { user: User | null, setUser: Function }) => {
  const navigate = useNavigate()

  function logout() {
    setUser(null)
    navigate('/')
  }

  if (user !== null) {
    return (
      <>
        <button onClick={logout}>Déconnexion</button>
      </>
    )
  } else {
    return (
      <>
        <p>Oups, tu n'es pas connecté. Essaye de te <Link to="/login">Connecter</Link> pour accéder à ton profil.</p>
      </>
    )
  }
}