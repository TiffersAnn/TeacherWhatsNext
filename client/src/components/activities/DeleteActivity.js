import { deleteActivity, getActivityById } from "../../Managers/ActivityManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";


const ActivityDelete = () => {
    const [chosenActivity, setChosenActivity] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();    

    useEffect(() => {
        getActivityById(id).then(setChosenActivity)        
    }, [])
    
    const Delete = () => {
        deleteActivity(chosenActivity.id).then((e) => {
            navigate(`/activities`)
        })
    }

    const Cancel = () => {
        navigate(`/activity/${id}`)
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you wish to delete {chosenActivity.title}?</h5>
            <div style={{display: 'flex'}}>
                <button className="btn btn-danger"style={{marginRight: '10px'}} onClick={ e => Delete() }>Delete</button>
                <button className="btn btn-primary" onClick={ e => Cancel() }>Cancel</button>
            </div>
        </div>
    )
}

export default ActivityDelete;