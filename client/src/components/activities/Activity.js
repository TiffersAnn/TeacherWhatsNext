import React from "react";

import { Link } from "react-router-dom";
import { Table } from "reactstrap";


export const Activity = ({ activity }) => {

    return (
      <>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <Table
      borderless
      hover>
        <tbody style={{marginLeft:'200px'}}>
          <tr>
          <th scope="row" style={{display:'flex', flexDirection:'row', letterSpacing: '.5px',   borderBottom: '1px solid teal', width: '1000px', justifyContent:'space-between', marginLeft:'150px'}}>
      
      <td >
          <Link to={`/activity/${activity.id}`}>
            
          <h5 class="w3-monospace" style={{ marginRight: '15px' }}>{activity.title}</h5></Link>
          </td>
          <td style={{display:'flex', flexDirection:'row', justifyItems:'end'}}>
          <p class="w3-monospace">{activity.subject.name}    //  </p>
         
         <p class="w3-monospace">Time Left: {activity.timeLeft.amount} mins    //  </p>
         
         <p class="w3-monospace">{activity.grade.level}</p>
      </td>
         
          
          </th>
        </tr>
      </tbody>
    </Table>
    </>
  );
    
  
};