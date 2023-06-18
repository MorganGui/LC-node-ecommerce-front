import { useEffect, useState } from 'react'
import Product from '../classes/Product'
import User from '../classes/User'
import AddProduct from '../components/productManager/addProduct'
import ProductList from '../components/productManager/productList'
import Error401 from './errors/error401'
import DashboardNav from '../components/dashboardNav'

export default ({ user }: { user: User | null }) => {
  if (user && user.role === 'admin') {
    const [products, setProducts]: [Product[], Function] = useState([])
    useEffect(() => {
      reloadProducts()
    }, [])
  
    function reloadProducts() {
      Product.getAll().then(data => {
        if (typeof data === 'string') {
          alert(data)
        } else {
          setProducts(data)
        }
      })
    }

    return (
      <div className="product-manager">
        <DashboardNav />
        <h2>Gestion des produits</h2>
        <AddProduct user={user} reloadProducts={reloadProducts} />
        <ProductList user={user} products={products} reloadProducts={reloadProducts} />
      </div>
    )
  } else {
    return (
      <Error401 />
    )
  }
}
