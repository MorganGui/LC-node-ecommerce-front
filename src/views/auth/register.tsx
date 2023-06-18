import { FormEvent, useState } from 'react'
import '../../style/form.scss'
import User from '../../classes/User'
import { useNavigate } from 'react-router-dom'

export default ({ setUser }: { setUser: Function }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (password === confirm) {
      const response = await User.register(firstname, lastname, mail, password)

      if (typeof response === 'string') {
        alert(response)
      } else {
        setUser(response)
        navigate('/')
      }

    } else {
      alert('Les deux mots de passe doivent être identique')
    }
  }

  return (
    <div className="card">
      <form onSubmit={submit}>
        <h1>Créer un compte</h1>
        <label htmlFor="firstname">
          Prénom
          <input type="text" id="firstname" required value={firstname} onChange={(e) => setFirstname(e.target.value) } />
        </label>
        <label htmlFor="lastname">
          Nom
          <input type="text" id="lastname" required value={lastname} onChange={(e) => setLastname(e.target.value) } />
        </label>
        <label htmlFor="mail">
          Email
          <input type="email" id="mail" required value={mail} onChange={(e) => setMail(e.target.value) } />
        </label>
        <label htmlFor="password">
          Mot de passe
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value) } />
        </label>
        <label htmlFor="confirm">
          Confirmer le mot de passe
          <input type="password" id="confirm" required value={confirm} onChange={(e) => setConfirm(e.target.value) } />
        </label>
        <button type="submit">Créer</button>
      </form>
    </div>
  )
}
