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
        <div className="m-5">
            <button className="btn btn-primary mt-3 mb-2" onClick={() => navigate("/GradeForm")}>Add New Grade Level</button>
            
            <Table>
                <thead>
                    
                    <tr>
                        <th>
                            Grade Levels
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {grades?.map((grade)=>(
                        <>
                        <Grade key={grade.id} grade = {grade}/>
                        <button className="btn btn-danger ml-3 mb-3" onClick={(c) => { handleDeleteClick(grade.id)}}>Delete</button>                                
                        <button className="btn btn-primary ml-3 mb-3" onClick={() => { handleEditClick(grade.id)}}>Edit</button> 
                        </>
                    ))}
                    </tbody>
            </Table>
        </div>
        // <div className="container">
        //     <div className="row justify-content-center" style={{ display: 'flex', flexDirection: 'column' }}>
        //         <h4 style={{ marginTop: '20px' }}>Grade Levels</h4>
        //         <h5 style={{ marginRight: '15px' }}>{grades.name}</h5>
        //         <button onClick={(e) => {
        //             navigate('/createGrade')
        //         }} style={{ marginTop: '15px', width: '120px' }}
        //         >New Grade</button>
        //         <div className="cards-column">
        //             {grades?.map((grade) => (
        //                 <div style={{ display: 'flex' }}>
        //                     <Grade key={grade.id} grade={grade} />
        //                     <button onClick={(e) => {
        //                         handleDeleteClick(grade.id)
        //                     }} style={{ width: '60px', height: '30px', margin: '5px' }}>Delete</button>
        //                     <button onClick={(e) => {
        //                         handleEditClick(grade.id)
        //                     }} style={{ width: '43px', height: '30px', margin: '5px' }}> Edit </button>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
    );
};

export default GradeList;