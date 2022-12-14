import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment, getCommentById } from "../../Managers/CommentManager";
import { CardLink } from "reactstrap";

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

return(<div className="m-5">
    <h3>Are You Sure You Want To Delete This Comment?</h3>
    <h6>Subject:</h6> {commentToDelete.subject}<br/>
    <h6>Author:</h6> {commentToDelete.userProfile?.displayName}
    <h6>Content:</h6> {commentToDelete.content}<br/>
    <button className="btn btn-danger mr-5" onClick={handleDelete}>Delete</button>
    <CardLink href={`/activity/${commentToDelete.activityId}/Comments`}>
        Back To Comments
    </CardLink>
    </div>)

};