import React, { useEffect, useState } from "react";
import { Activity } from "./activities/Activity";
import { getAllActivities, searchActivities } from "../Managers/ActivityManager";
import { getAllSubjects } from "../Managers/SubjectManager";
import { getAllTimes } from "../Managers/TimeManager";
import { getAllGrades } from "../Managers/GradeManager";
import { useNavigate } from "react-router-dom";



const Main = () =>{
  const [activities, setActivity] = useState([]);
  const [query, setQuery] = useState("");
  const [activity, getActivity] = useState({});
  const [subjects, setSubjects] = useState([]);
    const [times, setTimes] = useState([]);
    const [grades, setGrades] = useState([]);
    const navigate = useNavigate()

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
    searchActivities(query).then(activity => setActivity(activity))
      .then(r => r.json())
      .then(a => {
                navigate(`/activity/search?q=${query}`)
            })
  };

  useEffect(() => {
    getAct();
  }, []);     //empty array [] means it will run once when page load

  return (
    <>
    <div class = "section">
      
    <h1 style={{
      
      textAlign: "center",
      
    }}>Teacher, What's Next?</h1>
    
    </div>
    <div class = "synopsis" style={{marginLeft: "30px"}}>
    <p>Sometimes you find yourself with 5, 10 or 15 minutes left in class and don't have the mental bandwidth to think on your feet.  </p>
    </div>
    <div>
    <h2 className="welcome" style={{
      
      textAlign: "center",
      
    }}>Let's Find An Activity For You ⏰</h2>
      <form className="row g-3" >
        <div>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="timeLeft">Minutes Left In Class     </label>
                    <select required className="form-control" 
                            property="search"
                            value={activity.TimeLeftId} 
                            onChange={e => setQuery(e.target.value)}>
                        <option value="0">How Many Minutes Are Left in Class?</option>
                        {times?.map(c => <option value={c.id}>{c.amount}</option>)}
                    </select>
                </div>         
            
                <div className="form-group">
                    <label htmlFor="subject">Grade Level:  </label>
                    <select required className="form-control"
                            property="search" 
                            value={activity.GradeId} 
                            onChange={e => setQuery(e.target.value)}>
                        <option value="0">Choose A Grade Level</option>
                        {grades?.map(g => <option value={g.id}>{g.level}</option>)}
                    </select>
                </div>         
            
                <div className="form-group">
                    <label htmlFor="subject">Subject:  </label>
                    <select required className="form-control"
                            property="search" 
                            value={activity.SubjectId} 
                            onChange={e => setQuery(e.target.value)}>
                        <option value="0">Choose A Subject</option>
                        {subjects?.map(c => <option value={c.id}>{c.name}</option>)}
                    </select>
                </div>         
            </fieldset>
          {/* <input className="form-control" property="search" onChange={e => setQuery(e.target.value)} placeholder="Enter Key Word"/> */}
        </div>
        <button onClick={searchAllActivities}  className="btn btn-primary">Submit</button>
      </form>
      
    </div>
    
    </>
  );
}
export default Main;