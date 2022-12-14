import React from "react";

export const Subject =({subject}) => {
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '2px solid teal', height: '30px', width: '500px', justifyContent: 'space-between'}}>
                  
            <h5 style={{ marginRight: '15px' }}>{subject.name}</h5>
            
        </div>
    )
}