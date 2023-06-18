import User from '../classes/User'
import DashboardNav from '../components/dashboardNav'
import Error401 from './errors/error401'

export default ({ user }: { user: User | null }) => {
  if (user && user.role === 'admin') {
    return (
      <div className="order-manager">
        <DashboardNav />
        <h2 className="row center">Gestion des commandes</h2>
      </div>
    )
  } else {
    return (
      <Error401 />
    )
  }
}
