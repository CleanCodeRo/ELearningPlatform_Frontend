import { atom } from "jotai";

const state = {
user : atom(null),
completedLessons : atom([]),
completedWeeks : atom([]),
completedModules : atom([]),
completedKatas : atom([]),

refresh : atom(0),
refreshWeekProgressBar : atom(0)
};
export default state;


export function getUserWithToken(token, setUser, setCompletedLessons, setCompletedWeeks, setCompletedModules, setCompletedKatas) {
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
        setCompletedKatas(data.completedKatas)

        // console.log(data.completedLessons);
        // console.log(data.completedWeeks)
        // console.log(data.completedKatas);
     
      })
  }


  export function getCompletedStuff(userId, setCompletedLessons, setCompletedWeeks, setCompletedModules,setCompletedKatas, setRefreshWeekProgressBar){
    fetch(`http://localhost:8080/users/${userId}/completedStuff`,{
      method : "GET",
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${localStorage.getItem("ELearningToken")}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      setCompletedLessons(data.completedLessons);
      setCompletedWeeks(data.completedWeeks);
      setCompletedModules(data.completedModules);
      setCompletedKatas(data.completedKatas)
      setRefreshWeekProgressBar(Math.random())
    })
  }

  export function returnPercentage(objects, userObjects){
    // console.log("Lessons ", objects)
    // console.log("User completed lessons ",userObjects)
    let oneLessonPercentage = (1 / objects.length) *100
    let mandatory = objects.filter(item => !item.optional)
    let optional = objects.filter(item => !item.optional)

    let completed = objects.filter(item => userObjects.includes(item.id))
    let completedMandatory = completed.filter(item => !item.optional)
    let completedOptional = completed.filter(item => item.optional)

    // console.log("completedMandatory " + completedMandatory.length)
    // console.log("completedOptional " + completedOptional.length)
    
    let completePercentage = Math.floor( ((completedMandatory.length / mandatory.length) * 100) + completedOptional.length * oneLessonPercentage );
    let madatoryPercentage = Math.floor( (completedMandatory.length / mandatory.length) * 100 );
   
    return [madatoryPercentage, completePercentage];
  }
