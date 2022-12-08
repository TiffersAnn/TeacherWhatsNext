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
     
    <Card className="details">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <div
            style={{
              display: "flex",
              letterSpacing: ".5px",
              alignItems: "center",
              margin: "15px",
              flexDirection: "row",
              borderBottom: "1px solid blue",
              height: "30px",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <strong>{activity.title}</strong>
            </div>
        <div style={{margin: "15px"}}>
            <p>Subject: {activity.subject?.name}</p>
            <p>Time Left:  {activity.timeLeft?.amount} mins</p>
            <p>Grade Level: {activity.grade?.level}</p>
        </div>
        <div className="detail image" style={{display: "flex", justifyContent: "center"}}>
          <CardImg style={{width: "300px", height: "200px", textalign: "middle"}} top src={activity.imageLocation} alt={activity.title} onError={handleBrokenImage} />
        </div>    
            <CardText style={{margin: "30px"}}>
                {activity?.content}<br></br>
                <a href={activity?.contentUrl}>Link to Activity!</a>
            </CardText>
          
            {/* making sure a user only has access to the delete button if they were the one who created it */}
            {userObject.id == activity.userProfileId 
                ? <>
                    <button onClick={ e => navigate(`/deleteActivity/${id}`) }>Delete</button>
                    <button onClick={ e => navigate(`/editActivity/${id}`) }>Edit</button>
                  </>
                : ""
            }
            {activity?.comments?.map(comment => 
                <p key={comment?.id} className="text-left px-2">Comment: {comment?.content}</p>)}
        
        
         <CardBody>
         <Link to="/activities">Go Back</Link>
            
            
             <Link to={`/activity/${id}/comments`}>
                            View Comments
             </Link>
         <Link to={`/activities/${id}/addComment`}>
                             Add A Comment
             </Link>
                    
         </CardBody>
        
     
      
        </div>
        </div>
    </div>
    </Card>
  );
};
 
export default ActivityDetails;
    
    