import { useParams } from 'react-router-dom'
import Product from '../classes/Product'
import Error404 from './errors/error404'

export default ({ products }: { products: Product[] }) => {
  const { id } = useParams()
  if (id) {
    const product = products.find(p => p.id === parseFloat(id))
  
    if (product) return (
      <>
        <h1>{product.name}</h1>
        <p>{product.desc}</p>
      </>
    )

    else return ( <Error404 /> )
  } else return ( <Error404 /> )
}
