const api = "http://localhost:8080/BookPortalV5.1"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': "token"
}

export const getBook = (name) =>
  fetch(`${api}/rest/book/${name}`, { headers })
    .then(res => res.json())
//console.log(res, name);

export const getAllBook = () =>
  fetch(`${api}/rest/book`, { headers })
    .then(res => res.json())

export const getUser = (name) =>
  fetch(`${api}/rest/user/${name}`, { headers })
    .then(res => { return res.json()})

export const deleteBook = (bookid) =>
  fetch(`${api}/rest/book/${bookid}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => { return res.json()})

export const deleteWriter = (writerid) =>
  fetch(`${api}/rest/writer/${writerid}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => { return res.json()})

export const deleteUser = (userid) =>
  fetch(`${api}/rest/user/${userid}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => { return res.json()})

export const saveBook = (book) =>
  fetch(`${api}/rest/book`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  }).then(res => { return res.json();})

export const saveUser = (user) =>
  fetch(`${api}/rest/user`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( user )
  }).then(res => res.json())

export const saveWriter = (writer) =>
  fetch(`${api}/rest/writer`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(writer)
  }).then(res => res.json())

export const updateBook = (bid, book) =>
  fetch(`${api}/rest/book/${bid}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( book )
  }).then(res => res.json())

export const updateUser = (uid, user) =>
  fetch(`${api}/rest/user/${uid}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( user )
  }).then(res => res.json())

export const updateWriter = (wid, writer) =>
  fetch(`${api}/rest/writer/${wid}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( writer )
  }).then(res => res.json())

export const getUserForAuth = (user) =>
  fetch(`${api}/login/${user.email}/${user.password}`, { headers })
    .then(res =>  res.json())

export const getListInformation = (uid, bid) =>
  fetch(`${api}/rest/book/${uid}/${bid}`, { headers })
    .then(res => res.json())

export const addListInformation = (uid, bid, sid) =>
  fetch(`${api}/rest/book/${uid}/${bid}/${sid}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  })
