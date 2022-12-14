import React, { useState, useEffect } from "react";
import { ActivityChoiceList } from "./ActivityChoiceList";
import { useParams } from "react-router-dom";

import { searchActivities } from "../../Managers/ActivityManager";

// import { getActivityById } from "../../Managers/ActivityManager";

export const ActivityChoice = () => {

    const [activities, setActivities] = useState([]);
    
    const { subjectId } = useParams();
    const { timeLeftId } = useParams();
    const { gradeId } = useParams();
    const { id } = useParams();

    const getAct = () => {
        searchActivities(subjectId, timeLeftId, gradeId).then(allActivities => setActivities(allActivities));
        
        
    };


  useEffect(() => {
    getAct();
  }, []);
  console.log(activities)
   return (
    <>
    
    <h1 style={{
      
      textAlign: "center",
      
    }}>Activities for You!</h1>
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {activities?.map((activity) => (
            <>
              <ActivityChoiceList key={activity.id} activity={activity} />
            </>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

