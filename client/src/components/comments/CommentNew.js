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
    const [comment, update] = useState({
        subject: "",
        content:"",
        userProfileId: currentUser.id,
        activityId: id
    })

    
    const handleSaveNewComment = (event) => { 
        event.preventDefault()
        const newCommentToSendToApi = {
            subject: comment.subject,
            content: comment.content,
            userProfileId: currentUser.id,
            activityId: id
        }
        addComment(newCommentToSendToApi)
            .then(r => r.json())
            .then(() => {
                                      
                navigate(`/activity/${id}/comments`)
            
        });
    }

    const saveNewComment = (evt) => {
        const copy = {...comment};
        copy[evt.target.id] = evt.target.value;
        update(copy);
    };

    return (
        <>
        <fieldset style={{margin: '30px'}}>
            <form 
                className="m-5" 
                onSubmit={handleSaveNewComment}>
                <div className="col-md-3"style={{display:'flex', flexDirection:'column', margin: "30px"}}>
                    <label style={{}}
                    htmlFor="comment">Add New Comment</label>
                    <input style={{marginTop:'10px'}}
                        type="text" 
                        placeholder="Add Subject"
                        value={comment.subject} 
                        onChange={saveNewComment} 
                        className="form-control" 
                        id="subject" />
                    <input 
                        type="text" 
                        placeholder="Add A Comment"  
                        onChange={saveNewComment} 
                        className="form-control" 
                        id="content" />
                    <button style={{marginTop:'10px', width:'50px'}} type="submit" className="btn btn-primary">Save</button>
                                       
                        <CardLink href={`/activity/${id}`}>
                            Back To Post
                        </CardLink>
                    
                </div>
            </form>
        </fieldset>
        </>
    );
}
