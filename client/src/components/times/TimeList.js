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
        <div className="m-5">
            <button className="btn btn-primary mt-3 mb-2" onClick={() => navigate("/TimeForm")}>Add New Time</button>
            
            <Table>
                <thead>
                    
                    <tr>
                        <th>
                            Time Left In Class
                        </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {times.map((cat)=>(
                        <>
                        <Time key={cat.id} time = {cat}/>
                        <button className="btn btn-danger ml-3 mb-3" onClick={() => navigate(`/TimeDelete/${cat.id}`)}>Delete</button>                                <button className="btn btn-primary ml-3 mb-3" onClick={() => navigate(`/TimeEdit/${cat.id}`)}>Edit</button>
                        </>
                    ))}
                    </tbody>
            </Table>
        </div>
    );
};
export default TimeList;

