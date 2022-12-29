import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";


export const ActivityChoiceList = ({ activity }) => {

    return (
      <>
      <Table
      borderless
      hover>
        <tbody>
          <tr>
      <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid teal', height: '30px', width: '75%'}}>
          <Link to={`/activity/search/${activity.id}`}>
            
          <h5 style={{ marginRight: '15px' }}>{activity.title}</h5></Link>
          <p>{activity.subject.name}</p>
    
      </div>
      </tr> 
      </tbody>   
      </Table>
      </>
  );
    
  
};