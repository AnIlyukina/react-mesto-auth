export const BASE_URL = 'https://auth.nomoreparties.co'

 function getServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
  return(
    fetch(`${BASE_URL}/signup`,{
      method: 'POST',
      headers:{
        "Content-Type": "application/json" 
      },
      body:JSON.stringify({email, password})
    })
    .then((res) =>{
      console.log(res)
      return getServerResponse(res)
    })
  )
}

export const authorize = ( password, email) => {
   return fetch(`${BASE_URL}/signin`,{
     method: 'POST',
     headers: {
      "Content-Type": "application/json" 
     },
     body: JSON.stringify({ password, email})
   })
   .then((res) =>{
    console.log(res)
    return getServerResponse(res)
  })
}

export const getToken = (token) =>{
  return fetch(`${BASE_URL}/users/me`,{
    method: 'GET',
    headers:{
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) =>{
    console.log(res)
    return getServerResponse(res)
  })
}