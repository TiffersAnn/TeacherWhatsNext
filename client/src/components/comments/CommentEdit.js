import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, CardLink } from "reactstrap";
import { editComment, getCommentById } from "../../Managers/CommentManager";


export const CommentEdit = ()=> {
    const {id} = useParams();
    const [commentToEdit, setCommentToEdit] = useState({});
    const navigate =useNavigate();
    
    useEffect(
        () => {
            getCommentById(id)
                .then((c) => {setCommentToEdit(c)})
        },
        []
    )
    
    const handleSaveEdit = (event)=>{
        event.preventDefault();
        const updatedComment = {
            subject: commentToEdit.subject,
            content: commentToEdit.content,
            id: commentToEdit.id
        }
        editComment(updatedComment)
            .then(() => {
            navigate(`/activity/${commentToEdit.activityId}/comments`);
        });

    }
    
    const saveEditComment = (evt) => {
        const copy = {...commentToEdit}
        copy[evt.target.id] = evt.target.value
        setCommentToEdit(copy)
    }


return (<>

<section className="mx-5 mb-5 mt-3 ">
            <h3>Edit Comment</h3>
            <div onSubmit={handleSaveEdit} className="border mt-3 p-3">
                <Form 
                style={{
            
                    boxShadow:'0px 1px 21px -1px #212529',     
            padding: ".75rem",
            fontSize: "1.3rem",
            lineHeight: "1.5",
            backgroundImage:'linear-gradient(to right, #667db6 0%, #0082c8 25%, #0082c8 50%, #667db6 100%)',
            width:'550px',
            border: "2px solid darkblue",
            borderRadius: ".55rem"}}>
                    <FormGroup>
                        <Label for="subject">Subject</Label>
                        <Input type="text" value={commentToEdit.subject} onChange={saveEditComment} id="subject" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content</Label>
                        <Input type="text" value={commentToEdit.content} onChange={saveEditComment} id="content"  />
                    </FormGroup>
                    
                    <Button style={{marginTop:'10px', border: "2px solid darkblue", marginRight:'30px'}} type="submit" className="button mr-2" >Save</Button>
                    <CardLink href={`/activity/${commentToEdit.activityId}/Comments`}>
                    Back To Comments
                    </CardLink>
                    
                </Form>
            </div>
        </section>

</>)
}