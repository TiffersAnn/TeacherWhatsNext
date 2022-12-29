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
        <> 
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <section style={{backgroundImage:'url("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTc5fDB8MXxzZWFyY2h8MjJ8fGNvbW1lbnQlMjBidWJibGV8ZW58MHx8fHwxNjcxMjE3MTUx&ixlib=rb-4.0.3&q=80&w=2560")',
 minHeight:'753px'}}>
        <div class="w3-monospace" style={{minHeight:'468px',
 marginTop:'0px',
 transform:'translatex(4px) translatey(-64px)'}}>
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
                        marginRight:'10px'
                    }}>            
                    <CardBody style={{backgroundColor:'#e9e6e6'}} >
                        <CardTitle tag="h5">
                            Comment
                        </CardTitle>
                    </CardBody>
                        <ListGroup style={{boxShadow:'0px 0px 9px 0px #212529',
                            transform: 'translatex(0px) translatey(0px)'}}>
                            <ListGroupItem>
                                <h6>Subject:  {c.subject}</h6>
                                <h6>Author: {c.userProfile?.displayName} </h6>
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
        </div>
        </section>
        </>)
    
}