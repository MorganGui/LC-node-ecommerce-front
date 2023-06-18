import { FormEvent, useState } from 'react'
import User from '../../classes/User'
import Product from '../../classes/Product'

export default ({ user, reloadProducts }: { user: User | null, reloadProducts: Function }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [desc, setDesc] = useState('')

  async function saveProduct(e: FormEvent) {
    e.preventDefault()
    if (user && user.token) {
      const new_product = new Product(null, name, desc, price)
      await new_product.save(user.token)
      reloadProducts()
    }
  }

  return (
    <form onSubmit={saveProduct} className="col gap-2 border-1 pa-2">
      <h3>Ajouter un produit :</h3>
      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
      <textarea placeholder="Description" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} required />
      <button type="submit">Sauvegarder</button>
    </form>
  )
}
