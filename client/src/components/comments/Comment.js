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
        <div className= "m-5">
            <h1>{activity.title}</h1> 
            
                <CardLink href={`/activity/${id}`}>
                    Go back to post
                </CardLink>
               
            <section>
            {
            comments?.find(c=> c.activityId == id)
                ? comments?.filter(c=> c.activityId == id).map((c)=>(<>    
                <Card key={c.id}
                    style={{
                        width: '18rem'
                    }}>            
                    <CardBody>
                        <CardTitle tag="h5">
                            Comment
                        </CardTitle>
                    </CardBody>
                        <ListGroup flush>
                            <ListGroupItem>
                                <h6>Subject:</h6> {c.subject}<br/>
                                <h6>Author:</h6> {c.userProfile?.displayName}
                                <h6>Content:</h6> {c.content}
                            </ListGroupItem>
                        </ListGroup>
                       
                
                </Card></>  
            ))
            : <h4>"No Comments"</h4>
            } 
            </section>
        </div>)
    
}