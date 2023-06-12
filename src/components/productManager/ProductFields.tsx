import { useState } from 'react'
import User from '../../classes/User'
import Product from '../../classes/Product'

export default ({ user, product, reloadProducts }: { user: User | null, product: Product, reloadProducts: Function }) => {
  const [productToUpdate, setProductToUpdate]: [null | Product, Function] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [desc, setDesc] = useState('')

  function updateProduct(productToUpdate: Product) {
    setProductToUpdate(productToUpdate)
    setName(productToUpdate.name)
    setPrice(productToUpdate.price)
    setDesc(productToUpdate.desc)
  }
  async function deleteProduct(productToDelete: Product) {
    if (user && user.token) {
      await productToDelete.delete(user.token)
      reloadProducts()
    }
  }
  function cancelUpdateProduct() {
    setProductToUpdate(null)
    setName('')
    setPrice(0)
    setDesc('')
  }
  async function saveUpdateProduct() {
    if (user && user.token && productToUpdate) {
      productToUpdate.name = name
      productToUpdate.price = price
      productToUpdate.desc = desc
      await productToUpdate.save(user.token)
      reloadProducts()
      cancelUpdateProduct()
    }
  }



  if (!productToUpdate || product.id !== productToUpdate.id) {
    return (

      <>
        <td>{product.name}</td>
        <td>{product.price}€</td>
        <td>{product.desc}</td>
        <td className="actions">
          <button onClick={() => updateProduct(product)}>Modifier</button>
          <button onClick={() => deleteProduct(product)}>Supprimer</button>
        </td>
      </>

    )
  }
  else {
    return (

      <>
        <td>
          <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        </td>
        <td>
          <input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </td>
        <td>
          <textarea rows={5} cols={50} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </td>
        <td className="actions">
          <button onClick={() => saveUpdateProduct()}>Sauvegarder</button>
          <button onClick={() => cancelUpdateProduct()}>Annuler</button>
        </td>
      </>

    )
  }
}
