import React from "react";

import { Link } from "react-router-dom";


export const ActivityChoiceList = ({ activity }) => {

    return (

    
      <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '90%', justifyContent: 'space-between'}}>
          <Link to={`/activity/search/${activity.id}`}>
            
          <h5 style={{ marginRight: '15px' }}>{activity.title}</h5></Link>
          <p>{activity.subject.name}</p>
    {/* //     <p>Time Left: {activity.timeLeft.amount} mins</p>
    //     <p>{activity.grade.level}</p> */}
          
      </div>
  );
    
  
};