import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody, CardText, CardLink } from "reactstrap";
import { Link } from "react-router-dom";
import { getActivityById } from "../../Managers/ActivityManager";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { getAllGrades } from "../../Managers/GradeManager";
import { getAllTimes } from "../../Managers/TimeManager";
import {ListGroup, ListGroupItem, ListGroupItemHeading} from "reactstrap";


const ActivityDetails = () => {
    const [activity, setActivity] = useState("");
    const [grade, setGrade] = useState();
    const [subject, setSubject] = useState();
    const [timeLeft, setTimeLeft] = useState();
    // const [tag, setTag] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)
    
    //if post image links are broken, need to replace them all with a default image
    const handleBrokenImage = (image) => {
        const defaultImage = "https://clemensvdlinden.com/wp-content/uploads/2015/10/learning.jpg";
        image.target.src = defaultImage;
    };

        
    //set all state variables inside the useEffect instead of inside this component's methods    
    useEffect(() => {
        getActivityById(id)
            .then(p => setActivity(p))


        // getAllTags(id).then(setTag);
    });    
        
    useEffect(() => {
        getAllGrades(id).then(setGrade);
        getAllSubjects(id).then(setSubject);
        getAllTimes(id).then(setTimeLeft);
    });

    

        
    if (!activity) {
        return null;
    }

   return (
    <> 
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
    <Card className="details" style={{backgroundImage:'linear-gradient(to right, #4ca1af 0%, #c4e0e5 100%)'}}>
    <div className="container">
      <div className="row justify-content-center" >
        <div className="col-sm-12 col-lg-6" style={{transform:'translatex(0px) translatey(0px)',
              
              backdropFilter: 'brightness(1.28)'
              }}>
          <div class="w3-monospace"
            style={{
              letterSpacing: ".5px",
              margin: "15px",
              borderBottom: "2px solid teal",
              height: "30px",
              
              
            }}
          >
            <strong>{activity.title}</strong>
            </div>
        <div class="w3-monospace"style={{margin: "15px"}}>
            <p>Subject: {activity.subject?.name}</p>
            <p>Time Left:  {activity.timeLeft?.amount} mins</p>
            <p>Grade Level: {activity.grade?.level}</p>
        </div>
        <div className="detail image" style={{display: "flex", justifyContent: "center"}}>
          <CardImg style={{width: "300px", height: "200px", textalign: "middle", border:'solid', borderBlockColor:'#1b2c3a'}} top src={activity.imageLocation} alt={activity.title} onError={handleBrokenImage} />
        </div>    
            <CardText class="w3-monospace"style={{margin: "30px", fontSize:'1rem'}}>
                {activity?.content}<br></br>
                <a class="w3-monospace" style={{color:'#34495e',
 fontWeight:'600'}} href={activity?.contentUrl}>Link to Activity!</a>
            </CardText>
          
            {/* making sure a user only has access to the delete button if they were the one who created it */}
            {userObject.id == activity.userProfileId 
                ? <div style={{marginLeft:'30px', marginBottom:'30px'}}>
                    <button className="btn btn-danger ml-3 mb-3" onClick={ e => navigate(`/deleteActivity/${id}`) }>Delete</button>
                    <button className="btn btn-secondary ml-3 mb-3" style={{marginLeft:'5px'}} onClick={ e => navigate(`/editActivity/${id}`) }>Edit</button>
                  </div>
                : ""
            }
            {activity?.comments?.map(comment => 
                <p key={comment?.id} className="text-left px-2">Comment: {comment?.content}</p>)}
        
        
         <CardBody style={{display:'flex', justifyContent:'space-around'}}>
         <Link to="/activities" class="w3-monospace">Go Back</Link>
            
            
             <Link to={`/activity/${id}/comments`} class="w3-monospace">
                            View Comments
             </Link>
         <Link to={`/activity/${id}/addComment`} class="w3-monospace">
                             Add A Comment
             </Link>
                    
         </CardBody>
        
     
      
        </div>
        </div>
    </div>
    </Card>
    </>
  );
};
 
export default ActivityDetails;
    
    