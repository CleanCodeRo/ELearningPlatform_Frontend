import { atom } from "jotai";


const state = {
user : atom(null),
};
export default state;


export function getUserWithToken(token, setUser) {
    fetch("http://localhost:8080/users/getUserWithToken", {
      method: 'GET',
      headers: {
        "ContentType": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
        console.log(data)
      })
  }