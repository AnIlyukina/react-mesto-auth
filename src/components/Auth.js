export const BASE_URL = 'https://auth.nomoreparties.co'

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
      try{
        if(res.status === 200){
          return res.json()
        }
      } catch (e){
        return (e)
      }
    })
    .then ((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error)
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
   .then((res) => res.json())
   .then ((data) => {
     if (data.jwt){
      localStorage.setItem('jwt', data.jwt);
      return data
     }
   })
   .catch((error) => console.log(error))
}