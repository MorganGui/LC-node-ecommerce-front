import { Link } from 'react-router-dom'

export default () => {
  return (
    <>
      <h1>404 - Not Found</h1>
      <p>Oups, page introuvable. Essayer de retouner au <Link to="/">Menu</Link>.</p>
    </>
  )
}
