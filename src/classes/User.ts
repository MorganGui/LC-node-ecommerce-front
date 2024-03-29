import { api } from '../api'

export default class User {
  token: string | null
  id: number
  firstname: string
  lastname: string
  mail: string
  role: string

  private static url = api + 'user'
  private static jsonToUser(json: any, token: string | null) {
    return new User(token, json.id, json.firstname, json.lastname, json.mail, json.role)
  }

  constructor(token: string | null, id: number, firstname: string, lastname: string, mail: string, role: string) {
    this.token = token
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.mail = mail
    this.role = role
  }

  async save(token: string) {
    const response = await fetch(User.url + '/' + this.id, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: JSON.stringify({
        mail: this.mail,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role
      })
    })
    if (response.status === 200) {
      return await response.json()
    } else {
      return response.toString()
    }
  }
  async delete(token: string) {
    const response = await fetch(User.url + '/' + this.id, {
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

  static async register(firstname: string, lastname: string, mail: string, password: string) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        mail: mail,
        password: password,
        firstname: firstname,
        lastname: lastname
      })
    })
    if (response.status === 200) {
      const json = await response.json()
      return this.jsonToUser(json.user, json.token)
    } else {
      return response.toString()
    }
  }

  static async login(mail: string, password: string) {
    const response = await fetch(this.url + '/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        mail: mail,
        password: password
      })
    })

    const json = await response.json()
    if (!json.error) {
      return this.jsonToUser(json.user, json.token)
    } else {
      return json.error
    }
  }

  static async getAdmins(token: string): Promise<string | User[]> {
    const response = await fetch(this.url + '/admin', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })

    const json = await response.json()
    if (json.error)
      return json.error.toString()

    else {
      const list: User[] = []
      for (const object of json) {
        list.push(this.jsonToUser(object, null))
      }
      return list
    }
  }
  static async getByMail(token: string, mail: string) {
    const response = await fetch(this.url + '/mail/' + mail, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })

    const json = await response.json()
    if (!json)
      return null

    if (json.error)
      return json.error.toString()

    return this.jsonToUser(json, null)
  }
}
