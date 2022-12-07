import React from "react";

const Time = ({time}) => {
    // return (
    //     <tr>
    //         <td scope="row">
    //         {time.amount}
    //         </td>
    //     </tr>
    // )
    
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{ marginRight: '15px' }}>{time.amount}</h5>
            
        </div>
    )
}

export default Time;