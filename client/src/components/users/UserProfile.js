import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = ({user, get}) => {

    console.log(user)
    return (
        <div style={{ width: '20%', borderBottom: 'solid 1px blue'}}>
            <Link to={`/users/${user.id}`}>
            <strong>{user.displayName}</strong></Link>
            <h6>User Name: {user.firstName} {user.lastName}</h6>
            <h6>UserType: {user.userType.name}</h6>
        </div>
    )
    
};
export default UserProfile;