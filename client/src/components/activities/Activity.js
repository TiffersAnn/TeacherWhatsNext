import React from "react";

import { Link } from "react-router-dom";
import { Table } from "reactstrap";


export const Activity = ({ activity }) => {

    return (

    <Table
      borderless
      hover>
        <tbody>
          <tr>
          <th scope="row" style={{display:'flex', flexDirection:'row', letterSpacing: '.5px',   borderBottom: '1px solid teal', width: '1000px', justifyContent:'space-between'}}>
      {/* <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '1000px', justifyContent: 'space-between'}}> */}
      <td >
          <Link to={`/activity/${activity.id}`}>
            
          <h5 style={{ marginRight: '15px' }}>{activity.title}</h5></Link>
          </td>
          <td style={{display:'flex', flexDirection:'row', justifyItems:'end'}}>
          <p>{activity.subject.name}    //  </p>
         
         <p>Time Left: {activity.timeLeft.amount} mins    //  </p>
         
         <p>{activity.grade.level}</p>
         </td>
         
          
      {/* </div> */}
      </th>
      </tr>
      </tbody>
    </Table>
  );
    
  
};