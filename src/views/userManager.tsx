import '../style/table.scss'
import { useEffect, useState } from 'react'
import User from '../classes/User'
import Error401 from './errors/error401'
import SearchUser from '../components/userManager/searchUser'

export default ({ user }: { user: User | null }) => {
  if (user && user.role === 'admin') {
    const [admins, setAdmins]: [User[], Function] = useState([])
    useEffect(() => {
      reloadAdmins()
    }, [])

    async function reloadAdmins() {
      if (user && user.token) {
        User.getAdmins(user.token).then(data => {
          if (typeof data === 'string') {
            alert(data)
          } else {
            const list = data as User[]
            setAdmins(list)
          }
        })
      }
    }
    async function removeFromAdmins(admin: User) {
      if (user && user.token) {
        admin.role = 'user'
        await admin.save(user.token)
        reloadAdmins()
      }
    }
    async function addToAdmins(admin: User) {
      if (user && user.token) {
        admin.role = 'admin'
        await admin.save(user.token)
        reloadAdmins()
      }
    }

    return (
      <div className="user-manager">
        <h2>Gestion des administrateurs</h2>

        <SearchUser user={user} addToAdmins={addToAdmins} removeFromAdmins={removeFromAdmins} />

        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((admin, index) => {
                return (
                  <tr key={index}>
                    <td>{admin.lastname}</td>
                    <td>{admin.firstname}</td>
                    <td>{admin.mail}</td>
                    <td className="actions">
                      <button onClick={() => removeFromAdmins(admin)}>Retirer des administrateurs</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )

  } else {
    return (
      <Error401 />
    )
  }
}
