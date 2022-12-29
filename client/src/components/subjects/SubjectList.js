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
        <div className="m-5"style={{backgroundImage:'url("https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTc5fDB8MXxzZWFyY2h8M3x8c3ViamVjdHN8ZW58MHx8fHwxNjcxMjIyMjU2&ixlib=rb-4.0.3&q=80&w=2430")'}}>
            <button className="btn btn-secondary mt-3 mb-2" style={{marginLeft:'45px'}} onClick={() => navigate("/SubForm")}>Add New Subject</button>
            
            <Table>
                <thead>
                    
                    <tr>
                        <th >
                            Subjects 📚
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {subjects.map((cat)=>(
                        <>
                        <Subject key={cat.id} subject = {cat}/>
                        <button className="btn btn-danger ml-3 mb-3" style={{marginLeft:'45px'}} onClick={() => navigate(`/SubDelete/${cat.id}`)}>Delete</button>                                
                        <button className="btn btn-secondary ml-3 mb-3" style={{marginLeft:'10px'}} onClick={() => navigate(`/SubEdit/${cat.id}`)}>Edit</button>
                        </>
                    ))}
                    </tbody>
            </Table>
        </div>
    );
};
export default SubjectList;
