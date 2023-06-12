import { Link } from 'react-router-dom'

export default () => {
  return (
    <>
      <h1>401 - Unauthorized</h1>
      <p>Oups, vous n'avez pas accès à cette page. Essayer de retouner au <Link to="/">Menu</Link>.</p>
    </>
  )
}
