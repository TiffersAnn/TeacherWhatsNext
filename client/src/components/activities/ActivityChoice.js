import React, { useState, useEffect } from "react";
import { Activity } from "./Activity";
import { getAllActivities } from "../../Managers/ActivityManager";

const filteredActivities = () => {

const getActivities = () => {
    getAllActivities().then(allActivities => setActivities(allActivities));
  };


  useEffect(() => {
    getActivities();
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

export default filteredActivities;