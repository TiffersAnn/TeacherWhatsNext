import React from "react";

// import { useParams } from "react-router-dom";



const Grade = ({grade}) => {

//   const {id} = useParams();
  
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{grade.level}</h5>
            
        </div>
    )
}

export default Grade;