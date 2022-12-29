import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grade from './Grade';
import { getAllGrades, getById } from "../../Managers/GradeManager";
import { Table } from "reactstrap";

const GradeList = () => {
    const [grades, setGrades] = useState([]);

    const navigate = useNavigate();

    const getGrades = () => {
        getAllGrades().then(allGrades => setGrades(allGrades));
    };

    useEffect(() => {
        getGrades();
    }, []);

    const handleDeleteClick = (id) => {
        getById(id).then((c) => { navigate(`/deleteGrade/${id}`) })
    }

    const handleEditClick = (id) => {
        getById(id).then((e) => { navigate(`/editGrade/${id}`) })
    }

    return (
        <div className="m-5" style={{backgroundImage:'url("https://images.unsplash.com/photo-1510070009289-b5bc34383727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTc5fDB8MXxzZWFyY2h8ODB8fHNjaG9vbHxlbnwwfHx8fDE2NzEyMDE1OTY&ixlib=rb-4.0.3&q=80&w=2430")'}}>
            <button className="btn btn-secondary mt-3 mb-2" style={{marginLeft:'45px'}}onClick={() => navigate("/GradeForm")}>Add New Grade Level</button>
            
            <Table>
                <thead>
                    
                    <tr>
                        <th>
                            Grade Levels 👨‍🎓
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {grades?.map((grade)=>(
                        <>
                        <Grade key={grade.id} grade = {grade}/>
                        <button className="btn btn-danger ml-3 mb-3" style={{marginLeft:'45px'}} onClick={(c) => { handleDeleteClick(grade.id)}}>Delete</button>                                
                        <button className="btn btn-secondary ml-3 mb-3" style={{marginLeft:'10px'}} onClick={() => { handleEditClick(grade.id)}}>Edit</button> 
                        </>
                    ))}
                    </tbody>
            </Table>
        </div>
        
    );
};

export default GradeList;