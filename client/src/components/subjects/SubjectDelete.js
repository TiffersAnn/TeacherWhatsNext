import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSubById, deleteSub } from "../../Managers/SubjectManager";

const SubjectDelete = () => {
    const [chosenSubject, setChosenSubject] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(
    () => {
        getSubById(id).then((c) => {setChosenSubject(c)}).then(console.log(chosenSubject))
        
    },
    []
    )

    console.log(chosenSubject)

    
    const Delete = () => {
        deleteSub(chosenSubject.id).then((c) => {
            navigate('/subjects')
        })
    }
    const Cancel = () => {
        navigate('/subjects')
    }

    return (
        <div style={{display:'flex', flexDirection: 'column', letterSpacing: '.5px', alignItems: 'center', margin: '45px', height: '30px', width: '500px', justifyContent: 'space-between'}}>
            <h5 style={{marginBottom: '45px'}}>Are you sure you wish to delete this subject?</h5>
            <div style={{display: 'flex'}}>
            <h5 style={{ marginRight: '30px' }}>{chosenSubject.name}</h5>
            <button style={{marginRight: '10px'}} onClick={(c) => {
                Delete()
            }}>Delete</button>
            <button onClick={(c) => {
                Cancel()
            }}>Cancel</button>
            </div>
        </div>
    )
}

export default SubjectDelete;