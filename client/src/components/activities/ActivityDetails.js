import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { getActivityById } from "../../Managers/ActivityManager";

// import { getAllTags } from "../tags/TagManager";



export const ActivityDetails = () => {
    const [activity, setActivity] = useState("");
    // const [tag, setTag] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    
    //if post image links are broken, need to replace them all with a default image
    const handleBrokenImage = (image) => {
        const defaultImage = "https://clemensvdlinden.com/wp-content/uploads/2015/10/learning.jpg";
        image.target.src = defaultImage;
    };

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)
    
    //set all state variables inside the useEffect instead of inside this component's methods    
    useEffect(() => {
        getActivityById(id)
            .then(p => setActivity(p))


        // getAllTags(id).then(setTag);
    });    
        
    

    

        
    if (!activity) {
        return null;
    }

    return (
    <Card className="m-4">
        <CardBody>
            <strong>{activity.title}</strong>
            
                <p>Author: {activity.userProfile.displayName}               
                </p>
            
            {/* <div>
                Tags: {post.tags.map((t) => <p>{t.name}</p>)} 
            </div> */}
            {/* <button onClick={(e) => {
            navigate(`/addTag/${id}`)
          }} style={{marginTop: '15px', width: '120px'}}
          >Manage Tags</button> */}
            <CardImg top src={activity.imageLocation} alt={activity.title} onError={handleBrokenImage} />
            <p>{activity.content}</p>

            {/* making sure a user only has access to the delete button if they were the one who created it */}
            {userObject.id == activity.userProfileId 
                ? <>
                    <button onClick={ e => navigate(`/deleteActivity/${id}`) }>Delete</button>
                    <button onClick={ e => navigate(`/editActivity/${id}`) }>Edit</button>
                  </>
                : ""
            }
            {/* {post?.comments?.map(comment => 
                <p key={comment?.id} className="text-left px-2">Comment: {comment?.content}</p>)} */}
        
        </CardBody>
        <CardBody>
        <Link to="/activities">Go Back</Link>
            
                   
            {/* <Link to={`/activities/${id}/comments`}>
                            View Comments
            </Link> */}
                    
        </CardBody>

    </Card>
    );
};