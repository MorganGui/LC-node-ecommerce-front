import User from '../../classes/User'
import { FormEvent, useState } from 'react'

export default ({  user, addToAdmins, removeFromAdmins }: { user: User, addToAdmins: Function, removeFromAdmins: Function }) => {
  const [searchedUserMail, setSearchedUserMail] = useState('')
  const [haveSearch, setHaveSearch] = useState(false)
  const [searchedUser, setSearchedUser]: [User | null, Function] = useState(null)

  async function search(e: FormEvent) {
    e.preventDefault()
    if (user && user.token) {
      setHaveSearch(true)
      const response = await User.getByMail(user.token, searchedUserMail)
      if (typeof response !== 'string') {
        setSearchedUser(new User(user.token, response.id, response.firstname, response.lastname, response.mail, response.role))
      } else {
        alert(response)
      }
    }
  }

  function SearchedUserContainer() {
    if (haveSearch) {
      if (searchedUser) return (
        <div className="row gap-2 space-between border-1 pa-2">
          <div className="col">
            <h3>Utilisateur trouvé :</h3>
            <p>{searchedUser.firstname} {searchedUser.lastname}</p>
            <p>{searchedUser.mail}</p>
          </div>
          <AddToAdminsButton />
        </div>
      )
      else return (
        <h3 className="error">Utilisateur non trouvé</h3>
      )
    }
  }
  function AddToAdminsButton() {
    if (searchedUser && searchedUser.role !== 'admin') {
      return (
        <button onClick={() => { addToAdmins(searchedUser); setSearchedUser(null); setHaveSearch(false) }}>Ajouter aux administrateurs</button>
      )
    } else {
      return (
        <button onClick={() => { removeFromAdmins(searchedUser); setSearchedUser(null); setHaveSearch(false) }}>Retirer des administrateurs</button>
      )
    }
  }
  
  return (
    <>
      <form onSubmit={search}>
        <div className="row pa-2 gap-2">
          <label className="gap-2">
            <p>Chercher un utilisateur</p>
            <input type="email" required placeholder="exemple@domain.com" value={searchedUserMail} onChange={(e) => setSearchedUserMail(e.target.value)} />
          </label>
          <button type="submit">Chercher</button>
        </div>
      </form>
      <SearchedUserContainer />
    </>
  )
}
