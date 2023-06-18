import '../../style/form.scss'
import { Link, useNavigate } from 'react-router-dom'
import User from '../../classes/User'
import { FormEvent, useState } from 'react'

export default ({ user, setUser }: { user: User | null, setUser: Function }) => {
  if (user !== null) {

    const navigate = useNavigate()
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confirmPw, setConfirmPw] = useState('')

    function logout() {
      setUser(null)
      navigate('/')
    }
    async function deleteAccount() {
      // TODO: sweetalert / maybe ask pw before delete
      if (user && user.token) {
        const response = await user.delete(user.token)
        if (typeof response === 'string') {
          alert(response)
        } else {
          setUser(null)
          navigate('/')
        }
      }
    }
    function submitChangePw(e: FormEvent) {
      e.preventDefault()
      
      if (newPw === confirmPw) {

      } else {
        alert('Les deux mots de passe doivent être identique')
      }
    }

    return (
      <div className="profil">
        <button onClick={logout}>Déconnexion</button>
        <form onSubmit={submitChangePw} className="card">
          <h2>Changer de mot de passe</h2>
          <input type="password" placeholder="Ancien mot de passe" required value={oldPw} onChange={(e) => setOldPw(e.target.value) } />
          <input type="password" placeholder="Nouveau mot de passe" required value={newPw} onChange={(e) => setNewPw(e.target.value) } />
          <input type="password" placeholder="Confirmation" required value={confirmPw} onChange={(e) => setConfirmPw(e.target.value) } />
          <button type="submit">Valider</button>
        </form>
        <button onClick={deleteAccount} className="error">Supprimer mon compte</button>
      </div>
    )
  } else {
    return (
      <>
        <p>Oups, tu n'es pas connecté. Essaye de te <Link to="/login">Connecter</Link> pour accéder à ton profil.</p>
      </>
    )
  }
}