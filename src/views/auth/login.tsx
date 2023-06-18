import '../../style/form.scss'
import { FormEvent, useState } from 'react'
import User from '../../classes/User'
import { useNavigate } from 'react-router-dom'

export default ({ setUser }: { setUser: Function }) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e: FormEvent) {
    e.preventDefault()
    const response = await User.login(mail, password)

    if (typeof response === 'string') {
      alert(response)
    } else {
      setUser(response)
      navigate('/')
    }
  }

  return (
    <div className="card">
      <form onSubmit={submit}>
        <h1>Connexion</h1>
        <label htmlFor="mail">
          Email
          <input type="email" id="mail" required value={mail} onChange={(e) => setMail(e.target.value) } />
        </label>
        <label htmlFor="password">
          Mot de passe
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value) } />
        </label>
        <button type="submit">Connexion</button>
      </form>
    </div>
  )
}
