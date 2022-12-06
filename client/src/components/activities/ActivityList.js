import React, { useState, useEffect } from "react";
import { Activity } from "./Activity";
import { getAllActivities } from "../../Managers/ActivityManager";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  const localUser = localStorage.getItem("userProfile")
  const userObject = JSON.parse(localUser)

  const getActivities = () => {
    getAllActivities().then(allActivities => setActivities(allActivities));
  };


  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
    
    <h1>Activities for You!</h1>
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
    </>
  );
};

export default ActivityList;