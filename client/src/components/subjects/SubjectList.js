import React, { useState, useEffect } from "react";
import {Subject} from "./Subject";
import { getAllSubjects } from "../../Managers/SubjectManager";
import {Table} from "reactstrap";
import { useNavigate } from "react-router-dom";

const SubjectList = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);

    const getSubjects = () => {
        getAllSubjects().then ( all => setSubjects(all))
    };
    useEffect(()=>{
        getSubjects();
    }, []);

    return (
        <div className="m-5">
            <button className="btn btn-primary mt-3 mb-2" style={{marginLeft: '15px'}} onClick={() => navigate("/SubForm")}>Add New Subject</button>
            
            <Table>
                <thead>
                    
                    <tr>
                        <th>
                            Subjects
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {subjects.map((cat)=>(
                        <div style={{display: 'flex'}}>
                        <Subject key={cat.id} subject = {cat}/>
                        <button className="btn btn-danger ml-3 mb-3" style={{ width: '60px', height: '30px', margin: '5px' }} onClick={() => navigate(`/SubDelete/${cat.id}`)}>Delete</button>                                
                        <button className="btn btn-primary ml-3 mb-3" style={{ marginLeft: '50px', width: '60px', height: '30px', margin: '5px' }} onClick={() => navigate(`/SubEdit/${cat.id}`)}>Edit</button>
                        </div>
                    ))}
                    </tbody>
            </Table>
        </div>
    );
};
export default SubjectList;
