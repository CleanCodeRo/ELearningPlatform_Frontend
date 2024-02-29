import { atom } from "jotai";

const state = {
user : atom(null),
completedLessons : atom([]),
completedWeeks : atom([]),
completedModules : atom([]),

refresh : atom(0)
};
export default state;


export function getUserWithToken(token, setUser, setCompletedLessons, setCompletedWeeks, setCompletedModules) {
    fetch("http://localhost:8080/users/getUserWithToken", {
      method: 'GET',
      headers: {
        "ContentType": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          id : data.id,
          firstName : data.firstName,
          lastName : data.lastName,
          username : data.username,
          role : data.role
        });
        
        setCompletedLessons(data.completedLessons);
        setCompletedWeeks(data.completedWeeks);
        setCompletedModules(data.completedModules)
        // console.log(data.completedLessons);
        // console.log(data.completedWeeks)
      })
  }


  export function getCompletedStuff(userId, setCompletedLessons, setCompletedWeeks, setCompletedModules){
    fetch(`http://localhost:8080/users/${userId}/completedStuff`,{
      method : "GET",
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${localStorage.getItem("ELearningToken")}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data)
   
      
      setCompletedLessons(data.completedLessons);
      setCompletedWeeks(data.completedWeeks);
      setCompletedModules(data.completedModules);
     
    })
  }
