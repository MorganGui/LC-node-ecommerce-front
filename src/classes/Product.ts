import { api } from '../api'

export default class Product {
  id: number | null
  name: string
  desc: string
  price: number

  private static url = api + 'product'
  private static jsonToProduct(json: any) {
    return new Product(json.id, json.name, json.desc, json.price)
  }

  constructor(id: number | null, name: string, desc: string, price: number) {
    this.id = id
    this.name = name
    this.desc = desc
    this.price = price
  }

  static async getAll() {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    if (response.status === 200) {
      const jsonList = await response.json()
      const list: Product[] = []
      for (const json of jsonList) {
        list.push(this.jsonToProduct(json))
      }
      return list
    } else {
      return response.toString()
    }
  }

  async save(token: string) {
    let response
    const body = JSON.stringify({
      id: this.id,
      name: this.name,
      desc: this.desc,
      price: this.price
    })
    if (this.id) {
      response = await fetch(Product.url + '/' + this.id, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: body
      })
    } else {
      response = await fetch(Product.url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }),
        body: body
      })
    }
    if (response.status === 200) {
      return await response.json()
    } else {
      return response.toString()
    }
  }

  async delete(token: string) {
    const response = await fetch(Product.url + '/' + this.id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
    if (response.status === 200) {
      return await response.json()
    } else {
      return response.toString()
    }
  }
}
