import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, getCommentById } from "../../Managers/CommentManager";
import { CardLink, ListGroup, ListGroupItem } from "reactstrap";

export const CommentDelete= ()=> {
 const navigate = useNavigate();
 const [commentToDelete, setCommentToDelete] = useState({});
 const {id} = useParams();
 
 useEffect(
    () => {
        getCommentById(id)
            .then((c) => {setCommentToDelete(c)})
    },
    []
)

const handleDelete = () => {
    deleteComment(commentToDelete.id)
        .then(() => {
            navigate(`/activity/${commentToDelete.activityId}/Comments`)
        })
};

return(<div className="m-5"
style={{
            
    boxShadow:'0px 1px 21px -1px #212529',     
padding: ".75rem",
fontSize: "1.3rem",
lineHeight: "1.5",
backgroundImage:'linear-gradient(to right, #667db6 0%, #0082c8 25%, #0082c8 50%, #667db6 100%)',
width:'550px',
border: "2px solid darkblue",
borderRadius: ".55rem"
}}>
    <h3>Are You Sure You Want To Delete This Comment?</h3>
    <ListGroup>
        <ListGroupItem>
    <h6>Subject:  {commentToDelete.subject}</h6>
    <h6>Content:</h6> {commentToDelete.content}<br></br>
        </ListGroupItem>
    </ListGroup>
    <button className="btn btn-danger mr-5" style={{marginTop:'10px', marginBottom:'10px'}} onClick={handleDelete}>Delete</button><br></br>
    <CardLink href={`/activity/${commentToDelete.activityId}/Comments`}>
        Back To Comments
    </CardLink>
    </div>)

};