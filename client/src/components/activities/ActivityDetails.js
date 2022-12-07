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
    
    //if post image links are broken, need to replace them all with a default image
    // const handleBrokenImage = (image) => {
    //     const defaultImage = "https://clemensvdlinden.com/wp-content/uploads/2015/10/learning.jpg";
    //     image.target.src = defaultImage;
    // };

        
    //set all state variables inside the useEffect instead of inside this component's methods    
    useEffect(() => {
        getActivityById(id)
            .then(p => setActivity(p))


        // getAllTags(id).then(setTag);
    });    
        
    // useEffect(() => {
    //     getAllGrades(id).then(setGrade);
    //     getAllSubjects(id).then(setSubject);
    //     getAllTimes(id).then(setTimeLeft);
    // });

    

        
    if (!activity) {
        return null;
    }

   return ( 
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
            
            <p>Subject: {activity.subject?.name}</p>
          </div>
          {/* <ListGroup flush>
            {activity.comments.map((c) => (
              <ListGroupItem>
                <table>
                  <tr>
                    <th>Subject</th>
                    <th>Content</th>
                    <th>Display Name</th>
                    
                  </tr>
                  <tr>
                    <td>{c.subject}</td>
                    <td>{c.content}</td>
                    <td>{c.userProfile?.displayName}</td>
                    
                  </tr>
                </table>
              </ListGroupItem>
            ))}
          </ListGroup> */}
          <CardLink href={`/activities/${id}/addComment`}>Add Comment</CardLink>
        </div>
      </div>
    </div>
  );
};
 
export default ActivityDetails;
    
    // return (
    // <Card className="m-4" style={{width: '100%'}}>
    //     <CardBody>
    //         <strong>{activity.title}</strong>

    //         <section>

    //             <ListGroup flush>
    //                 <ListGroupItemHeading>??</ListGroupItemHeading>
    //                 {
                        
    //                         activity?.subjects?.map((t) => {(<>
    //                             <Card key={t.id}
    //                                 style={{
    //                                     width: '18rem'
    //                                 }}
    //                             >
    //                                 <ListGroup flush>
    //                                     <ListGroupItem>
    //                                         <h6>{t.name}</h6><br />
    //                                     </ListGroupItem>
    //                                 </ListGroup>
    //                             </Card></>
    //                         )})
                            
    //                 }
    //             </ListGroup>
    //         </section>
            
    //             <p>Author: {activity.userProfile.displayName}               
    //             </p>
    //         {/* <div>
    //             {activity.times.map((t) => <p>{t.amount}</p>)}
    //             {activity.grades.map((g) => <p>{g.level}</p>)} 
    //             {activity.subjects.map((s) => <p>{s.name}</p>)} 
    //         </div> */}
    //         {/* <div>
    //             Tags: {post.tags.map((t) => <p>{t.name}</p>)} 
    //         </div> */}
    //         {/* <button onClick={(e) => {
    //         navigate(`/addTag/${id}`)
    //       }} style={{marginTop: '15px', width: '120px'}}
    //       >Manage Tags</button> */}
    //         <CardImg top src={activity.imageLocation} alt={activity.title} onError={handleBrokenImage} />
    //         <p>{timeLeft.amount}</p>
    //         <CardText>
    //             {activity.content}
    //         </CardText>
    //         {/* <p>{activity.content}</p> */}

    //         {/* making sure a user only has access to the delete button if they were the one who created it */}
    //         {userObject.id == activity.userProfileId 
    //             ? <>
    //                 <button onClick={ e => navigate(`/deleteActivity/${id}`) }>Delete</button>
    //                 <button onClick={ e => navigate(`/editActivity/${id}`) }>Edit</button>
    //               </>
    //             : ""
    //         }
    //         {activity?.comments?.map(comment => 
    //             <p key={comment?.id} className="text-left px-2">Comment: {comment?.content}</p>)}
        
    //     </CardBody>
    //     <CardBody>
    //     <Link to="/activities">Go Back</Link>
            
                   
    //         <Link to={`/activities/${id}/comments`}>
    //                         View Comments
    //         </Link>
    //         <Link to={`/activities/${id}/addComment`}>
    //                         Add A Comment
    //         </Link>
                    
    //     </CardBody>

    // </Card>
    // );
// };