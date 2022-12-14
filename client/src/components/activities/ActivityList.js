import React, { useState, useEffect } from "react";
import { Activity } from "./Activity";
import { getAllActivities } from "../../Managers/ActivityManager";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const localUser = localStorage.getItem("userProfile")
  const userObject = JSON.parse(localUser)

  const getActivities = () => {
    getAllActivities().then(allActivities => setActivities(allActivities));
  };


  useEffect(() => {
    getActivities();
  }, []);
  console.log(activities)

  return (
    <>
    <div style={{backgroundColor:'#9bb7d0'}}>
    <button className="btn btn-secondary mt-3 mb-2" style={{marginLeft: '30px', marginTop:'20px'}} onClick={() => navigate("/createActivity")}>Add New Activity</button>
    
    <h1 style= {{textAlign: "center", marginBottom:'30px'}}>All Activities</h1>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {activities?.map((activity) => (
            <>
              <Activity key={activity.id} activity={activity} />
            </>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default ActivityList;