import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editSub, getSubById } from "../../Managers/SubjectManager";
import { Form, Label, Button } from "reactstrap";

const SubEdit = () => {
    const [chosenSub, setChosenSub] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(
        () => {
            getSubById(id)
                .then((c) => {setChosenSub(c)})
        },
        []
    )
    
    const saveSubEdit = (e) => {
        e.preventDefault();
        const updatedSub = {
            name: chosenSub.name,
            id: chosenSub.id
        }
        editSub(updatedSub)
            .then(() => {
            navigate("/subjects");
        });
    }


    return (
        <>
            <Form className="m-5">
                <div className="col-md-3">
                    <Label htmlFor="tag">Edit Subject <b>"{chosenSub.name}?"</b></Label>
                    <input type="text" value={chosenSub.name} onChange={(e) => {
                        const copy = { ...chosenSub }
                        copy.name = e.target.value
                        setChosenSub(copy)
                    }} className="form-control" id="sub" />
                <Button type="submit" className="btn btn-primary mt-2 mr-5" onClick={saveSubEdit}>Save</Button>
                <a href="/subjects">Take me back </a>
                </div>
            </Form>
        </>
    );
}

export default SubEdit;