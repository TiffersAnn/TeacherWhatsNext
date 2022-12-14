import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardLink, CardTitle, ListGroup, ListGroupItem } from "reactstrap";
import { getAllComments } from "../../Managers/CommentManager";
import { getActivityById} from "../../Managers/ActivityManager";
import { getCurrentUser } from "../../Managers/UserProfileManager";

export const Comment = () => {
    const currentUser = getCurrentUser();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [activity, setActivity] = useState({});
    
    const { id } = useParams();

    const getComments = () => {
        getAllComments(id).then(comments => setComments(comments));
    };
   
    
    useEffect( ()=> {
            getActivityById(id).then(activity => setActivity(activity));   
            getComments(); 
    },[]);

    return (
        <div className= "CommentList">
            <h1 style={{margin:'100px'}}>{activity.title}</h1> 
            
                <CardLink style={{marginLeft:'100px'}} href={`/activity/${id}`}>
                    Go back to post
                </CardLink>
               
        <section className="Comments" style={{display:'flex', marginLeft:'70px', marginTop:'20px'}}>
            {
            comments?.find(c=> c.activityId == id)
                ? comments?.filter(c=> c.activityId == id).map((c)=>(<>    
                <Card key={c.id}
                    style={{
                        width: '18rem',
                        
                    }}>            
                    <CardBody >
                        <CardTitle tag="h5">
                            Comment
                        </CardTitle>
                    </CardBody>
                        <ListGroup>
                            <ListGroupItem>
                                <h6>Subject:</h6> {c.subject}
                                <h6>Author:</h6> {c.userProfile?.displayName}
                                <h6>Content:</h6> {c.content}
                            </ListGroupItem>
                        </ListGroup>
                        {currentUser.id === c.userProfileId
                    ?<div>
                    <button className="btn btn-danger ml-3 mb-3" style={{margin:'10px'}} onClick={() => navigate(`/commentDelete/${c.id}`)}>Delete</button> 
                    <button className="btn btn-secondary ml-3 mb-3" style={{margin:'10px'}} onClick={() => navigate(`/commentEdit/${c.id}`)}>Edit</button> 
                    </div>
                    :""  }
                       
                
                </Card></>  
            ))
            : <h4 style={{marginLeft:'100px', marginTop:'20px'}}>"No Comments"</h4>
            } 
            </section>
        </div>)
    
}