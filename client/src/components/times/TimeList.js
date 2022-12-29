import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Time from './Time';
import { getAllTimes } from "../../Managers/TimeManager";
import { Table } from "reactstrap";

const TimeList = () => {
    const navigate = useNavigate();
    const [times, setTimes] = useState([]);

    const getTimes = () => {
        getAllTimes().then ( all => setTimes(all))
    };
    useEffect(()=>{
        getTimes();
    }, []);

    return (
        <div className="m-5" style={{backgroundImage:'url("https://images.unsplash.com/photo-1575197478864-c83e1d2a4443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTc5fDB8MXxzZWFyY2h8Mjh8fHRpbWV8ZW58MHx8fHwxNjcxMjIyNjI2&ixlib=rb-4.0.3&q=80&w=2430")'}}>
            <button className="btn btn-secondary mt-3 mb-2" style={{marginLeft:'45px'}}onClick={() => navigate("/TimeForm")}>Add New Time</button>
            
            <Table>
                <thead>
                    
                    <tr>
                        <th>
                            Time Left In Class 🕘
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {times.map((cat)=>(
                        <>
                        <Time key={cat.id} time = {cat}/>
                        <button className="btn btn-danger ml-3 mb-3" style={{marginLeft:'45px'}} onClick={() => navigate(`/TimeDelete/${cat.id}`)}>Delete</button>                                
                        <button className="btn btn-secondary ml-3 mb-3" style={{marginLeft:'10px'}} onClick={() => navigate(`/TimeEdit/${cat.id}`)}>Edit</button>
                        </>
                    ))}
                    </tbody>
            </Table>
        </div>
    );
};
export default TimeList;

