import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addComment } from "../../Managers/CommentManager.js";
import { getCurrentUser } from "../../Managers/UserProfileManager";
import { CardLink } from "reactstrap";

export const CommentNew = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const { id } = useParams();
    
    //initial state
    const [newComment, setNewComment] = useState({
        subject: "",
        content:"",
        userProfileId: currentUser.id,
        activityId: id
    })

    
    const handleSaveNewComment = (event) => { 
        event.preventDefault()
        const newCommentToSendToApi = {
            subject: newComment.subject,
            content: newComment.content,
            userProfileId: currentUser.id,
            activityId: id
        }
        addComment(newCommentToSendToApi).then(() => {
                
                        
            navigate(`/activity/${id}/comments`)
            
        });
    }

    const saveNewComment = (evt) => {
        const copy = {...newComment};
        copy[evt.target.id] = evt.target.value;
        setNewComment(copy);
    };

    return (
        <>
            <form className="m-5" onSubmit={handleSaveNewComment}>
                <div className="col-md-3">
                    <label htmlFor="tag">Add New Comment</label>
                    <input type="text" placeholder="Add Subject" onChange={saveNewComment} className="form-control" id="subject" />
                    <input type="text" placeholder="Add A Comment"  onChange={saveNewComment} className="form-control" id="content" />
                <button type="submit" className="btn btn-primary mt-2">Save</button>
                                       
                        <CardLink href={`/activity/${id}`}>
                            Back To Post
                        </CardLink>
                    
                </div>
            </form>
        </>
    );
}
