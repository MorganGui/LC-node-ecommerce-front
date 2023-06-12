import './app.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Counter from './components/counter'
import Header from './layout/header'
import Footer from './layout/footer'
import User from './classes/User'
import OrderRow from './classes/OrderRow'

import Home from './views/home'
import Error404 from './views/error404'
import Profile from './views/profile'
import ProductManager from './views/productManager'
import UserManager from './views/userManager'
import Login from './views/login'
import Register from './views/register'

export default () => {
  const [user, setUser]: [User | null, Function] = useState(null)
  const [basket, setBasket]: [OrderRow[], Function] = useState([])

  /**TODO list
   * [x] products
   * [x] login/register
   * [x] product manager
   * [x] admins manager
   * [ ] basket
   * [ ] setssionStorage
   * [ ] error message instead of alert
   */

  return (
    <BrowserRouter>
      <Header user={ user } />
      <main>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={ <Home basket={basket} setBasket={setBasket} /> } />
            <Route path="/profile" element={ <Profile user={user} setUser={setUser} /> } />
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
