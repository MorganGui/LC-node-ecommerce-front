import './app.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Counter from './components/counter'
import Header from './layout/header'
import Footer from './layout/footer'
import User from './classes/User'
import Product from './classes/Product'
import OrderRow from './classes/OrderRow'

import Home from './views/home'
import ProductViews from './views/productView'
import Basket from './views/basket'
import Profile from './views/auth/profile'
import ProductManager from './views/productManager'
import UserManager from './views/userManager'
import Login from './views/auth/login'
import Register from './views/auth/register'
import Error404 from './views/errors/error404'
import OrderManager from './views/orderManager'

export default () => {
  const [user, setUser]: [User | null, Function] = useState(null)
  const [basket, setBasket]: [OrderRow[], Function] = useState([])

  const [products, setProducts]: [Product[], Function] = useState([])
  useEffect(() => {
    Product.getAll().then(data => {
      if (typeof data === 'string') {
        alert(data)
      } else {
        setProducts(data)
      }
    })
  }, [])

  /**TODO list
   * [x] products
   * [x] login/register
   * [x] product manager
   * [x] admins manager
   * [x] basket
   * [ ] validate basket
   * [x] détails product
   * [ ] update and delete account
   * [ ] CRUD order
   * [ ] basket in localStorage
   * [ ] sessionStorage
   * [ ] error message instead of alert
   */

  return (
    <BrowserRouter>
      <Header user={ user } basket={basket} />
      <main>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={ <Home products={products} basket={basket} setBasket={setBasket} /> } />
            <Route path="/product/:id" element={ <ProductViews products={products} /> } />
            <Route path="/basket" element={ <Basket products={products} basket={basket} setBasket={setBasket} user={user} /> } />
            <Route path="/profile" element={ <Profile user={user} setUser={setUser} /> } />
            <Route path="/order-manager" element={ <OrderManager user={user} /> } />
            <Route path="/product-manager" element={ <ProductManager user={user} /> } />
            <Route path="/user-manager" element={ <UserManager user={user} /> } />
            <Route path="/login" element={ <Login setUser={setUser}  /> } />
            <Route path="/register" element={ <Register setUser={setUser} /> } />
            <Route path="/counter" element={ <Counter /> } />
            <Route path="*" element={ <Error404 /> } />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
