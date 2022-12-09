import React, { useState, useEffect } from "react";
import { Activity } from "./Activity";
import { getAllActivities } from "../../Managers/ActivityManager";
// import { getActivityById } from "../../Managers/ActivityManager";

const ActivityChoice = () => {

    const [activities, setActivities] = useState([]);

    const getAct = () => {
        getAllActivities().then(allActivities => setActivities(allActivities));
    };


  useEffect(() => {
    getAct();
  }, []);
  console.log(activities)
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

export default ActivityChoice;