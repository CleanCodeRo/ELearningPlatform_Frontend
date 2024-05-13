import { atom } from "jotai";
import { startLink } from "../../constants/Constants";
import { jwtDecode } from "jwt-decode";

const state = {
user : atom(null),
completedLessons : atom([]),
completedWeeks : atom([]),
completedModules : atom([]),

refresh : atom(0),
refreshWeekProgressBar : atom(0),

moduleNumberAndName : atom([0, ""]),
};
export default state;


export function getUserWithToken(token, setUser, setCompletedLessons, setCompletedWeeks, setCompletedModules) {
    fetch(`${startLink}/users/getUserWithToken`, {
      method: 'GET',
      headers: {
        "ContentType": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setUser({
          id : data.id,

          githubUsername : data.githubUsername,
          codeWarsUsername : data.codeWarsUsername,
          discordUsername: data.discordUsername,
          linkedInUsername: data.linkedInUsername,
          instagramUsername: data.instagramUsername,
          facebookUsername:  data.facebookUsername,

          firstName : data.firstName,
          lastName : data.lastName,
          email : data.email,
          birthday : data.birthday,
          phoneNumber : data.phoneNumber,
          address : data.address,
          location : data.location,
          
          rankPoints: data.rankPoints,
          profileImageUrl: data.profileImageUrl,
          role : data.role,
        });
        setCompletedLessons(data.completedLessons);
        setCompletedWeeks(data.completedWeeks);
        setCompletedModules(data.completedModules)
        // console.log(data.completedLessons);
        // console.log(data.completedWeeks)
        // console.log(data.completedKatas);
      })
  }

  


  export function getCompletedStuff({userId, setCompletedLessons, setCompletedWeeks, setCompletedModules,setCompletedKatas, setRefreshWeekProgressBar}){
    fetch(`${startLink}/users/${userId}/completedStuff`,{
      method : "GET",
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${localStorage.getItem("ELearningToken")}`
      }
    })
    .then(res => res.json())
    .then(data =>{
      setCompletedLessons ? setCompletedLessons(data.completedLessons) : null;
      setCompletedWeeks ?  setCompletedWeeks(data.completedWeeks) : null;
      setCompletedModules ? setCompletedModules(data.completedModules) : null;
      setCompletedKatas ? setCompletedKatas(data.completedKatas) : null;
      setRefreshWeekProgressBar ? setRefreshWeekProgressBar(Math.random()) : null
    })
  }
  

  export function returnPercentage(objects, userObjects){
    if(objects.length <= 0){
      return [0,0]
    }
    let oneLessonPercentage = (1 / objects.length) *100
    let mandatory = objects.filter(item => !item.optional)

    let completed = objects.filter(item => userObjects.includes(item.id))
    let completedMandatory = completed.filter(item => !item.optional)
    let completedOptional = completed.filter(item => item.optional)
    
    let completePercentage = Math.floor( ((completedMandatory.length / mandatory.length) * 100) + completedOptional.length * oneLessonPercentage );
    let madatoryPercentage = Math.floor( (completedMandatory.length / mandatory.length) * 100);
   
    return [madatoryPercentage, completePercentage];
  }

  export function checkIfUserAdmin(){
    let decodedToken = jwtDecode(localStorage.getItem("ELearningToken"));
    if(decodedToken.role != "ADMIN"){
     window.history.back();
    }
  }
