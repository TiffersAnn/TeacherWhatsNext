import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSubject } from "../../Managers/SubjectManager";
import { Form, Label, Button } from "reactstrap";

export default function SubForm() {

    const [newSubject, setNewSubject] = useState({
        name:""
    });

    const navigate = useNavigate();

    const saveNewSub = (e) => {
    e.preventDefault()
        const newSubToSendToApi = {
            name: newSubject
        }

        addSubject(newSubToSendToApi).then((Sub) => {
            navigate("/subjects");
        });
        
    }
    return (
        <Form className="m-5">
        <div className="col-md-3">
            <Label htmlFor="subject">Create A Subject</Label>
            <input type="text" onChange={(event)=>{
                setNewSubject(event.target.value);
            }} className= "form-control" id="subject"/>
            <Button type="submit" className="btn btn-primary mt-2" onClick={saveNewSub}>Save</Button>
        </div>
        </Form>

    
    );
}
    
    