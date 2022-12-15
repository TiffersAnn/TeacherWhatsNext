import React, { useEffect, useState } from "react";
// import { Activity } from "./activities/Activity";
import { getAllActivities, searchActivities } from "../Managers/ActivityManager";
import { getAllSubjects } from "../Managers/SubjectManager";
import { getAllTimes } from "../Managers/TimeManager";
import { getAllGrades } from "../Managers/GradeManager";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';




const Main = () =>{
  
  // const [query, setQuery] = useState("");
  const [activity, setActivity] = useState({});
  const [subjects, setSubjects] = useState([]);
    const [times, setTimes] = useState([]);
    const [grades, setGrades] = useState([]);
    const [subjectId, setSubjectId] = useState([]);
    const [timeLeftId, setTimeLeftId] = useState([]);
    const [gradeId, setGradeId] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        getAllSubjects().then(setSubjects);
    }, []);
    useEffect(() => {
        getAllTimes().then(setTimes);
    }, []);
    useEffect(() => {
        getAllGrades().then(setGrades);
    }, []);

  const getAct = () => {
      getAllActivities().then(allActivities => setActivity(allActivities));

  };
  const searchAllActivities = (e) => {
    e.preventDefault()  //necessary because using a form element, not necessary if using <section>
    searchActivities().then(activity => setActivity(activity))
      .then(
                navigate(`activity/search/${subjectId}/${timeLeftId}/${gradeId}`)
            )
  };

  useEffect(() => {
    getAct();
  }, []);     //empty array [] means it will run once when page load

  return (
    <>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <div class="w3-monospace" style={{backgroundColor:'#cddbe7'}}>
    <div class="w3-monospace" style={{backgroundColor: '#6993b8'}} >
      
    <h1 class="w3-monospace" style={{
      
      textAlign: "center",
      
    }}>Teacher, What's Next?</h1>
    
    </div>
    <div style={{backgroundColor:"#cddbe7", width:"100%", height:"70px"}}>
    <div class="w3-monospace" style={{ textAlign:"center", fontSize:"2.0rem"}}>
      <p>    </p>
    <h3 class="w3-monospace">Sometimes you find yourself with 5, 10, or 15 minutes left in class and don't have the mental bandwidth to think on your feet.  </h3>
    </div>
    </div>
    <div>
    <h2 class="w3-monospace" style={{
      
      textAlign: "center", backgroundColor: '#456f93', color:"#fff", width:'700px', marginLeft:'490px'
      
    }}>Let's Find An Activity For You ⏰</h2>
      <form className="row g-3" style={{backgroundColor:'#2e4a62', marginTop:'40px', marginLeft:"590px", padding:'40px', border: 'solid', borderRadius:".55rem", width: "30%", fontSize: "1.7rem",}} >
        <div>
        <fieldset className="SearchBox" style={{margin: "10px",  backgroundColor:'#6993b8', border: 'solid', borderRadius:".55rem"}}>
                <div className="form-group"style={{padding:'15px'}}>
                    <label htmlFor="timeLeft">Minutes Left In Class:     </label>
                    <select required className="form-control" 
                            property="search"
                            value={activity.TimeLeftId}
                            key={activity.timeLeftId} 
                            onChange={e => setTimeLeftId(e.target.value)}>
                        <option value="0">How Many Minutes Are Left in Class?</option>
                        {times?.map(c => <option value={c.id}>{c.amount}</option>)}
                    </select>
                </div>         
            
                <div className="form-group"style={{padding:'15px'}}>
                    <label htmlFor="grade">Grade Level:  </label>
                    <select required className="form-control"
                            property="search" 
                            value={activity.GradeId} 
                            key={activity.gradeId}
                            onChange={e => setGradeId(e.target.value)}>
                        <option value="0">Choose A Grade Level</option>
                        {grades?.map(g => <option value={g.id}>{g.level}</option>)}
                    </select>
                </div>         
            
                <div className="form-group"style={{padding:'15px'}}>
                    <label htmlFor="subject">Subject:  </label>
                    <select required className="form-control"
                            property="search" 
                            value={activity.SubjectId} 
                            key={activity.subjectId}
                            onChange={e => setSubjectId(e.target.value)}>
                        <option value="0">Choose A Subject</option>
                        {subjects?.map(c => <option value={c.id}>{c.name}</option>)}
                    </select>
                </div>         
            </fieldset>
          
        </div>
        
      </form>
      <div style={{marginLeft:"600px", marginTop:'15px'}}>
        <button onClick={searchAllActivities}  className="btn btn-secondary">Submit</button>
        </div>
    </div>
    </div>
    
    </>
  );
}
export default Main;