import React from "react";

export const Subject =({subject}) => {
    return (
        <div style={{display:'flex', letterSpacing: '.5px', alignItems: 'center', margin: '45px', borderBottom: '1px solid blue', height: '30px', width: '500px', justifyContent: 'space-between'}}>
        <tr>
            <td scope="row">
            {subject.name}
            </td>
        </tr>
        </div>
    )
}