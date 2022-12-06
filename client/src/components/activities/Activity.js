import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Activity = ({ activity }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <Link to={`/posts/${activity.id}`}>
            <strong>{activity.title}</strong>
        </Link>
        {/* <Link to={`/posts/${post.id}`}> */}
            <p>Author: {activity.userProfile.displayName}</p>
        {/* </Link> */}
        <p>Subject: {activity.subject.name}</p>
        <p>Time Left: {activity.timeLeft.amount}</p>
        <p>Grade Level: {activity.grade.level}</p>
        
        {/* {post?.comments.length ? post?.comments?.map(comment => 
            <p key={comment?.id} className="text-left px-2">Comment: {comment?.message}</p>) : ""} */}
      
        </CardBody>

    </Card>
  );
};