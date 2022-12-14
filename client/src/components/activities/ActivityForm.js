import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSubjects } from "../../Managers/SubjectManager";
import { getAllGrades } from "../../Managers/GradeManager";
import { getAllTimes } from "../../Managers/TimeManager";
import { addActivity } from "../../Managers/ActivityManager";
import { Link } from "react-router-dom";

export const ActivityForm = () => {
    
    const [activity, update] = useState({
        Title: "",
        Content: "",
        ContentUrl: "",
        ImageLocation: ""
    })

    const [subjects, setSubjects] = useState([]);
    const [times, setTimes] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        getAllSubjects().then(setSubjects);
    }, []);
    useEffect(() => {
        getAllTimes().then(setTimes);
    }, []);
    useEffect(() => {
        getAllGrades().then(setGrades);
    }, []);

   

    const navigate = useNavigate()

    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const newActivity = {
            Title: activity.Title,
            Content: activity.Content,
            ContentUrl: activity.ContentUrl,
            ImageLocation: activity.ImageLocation,
            UserProfileId: userObject.id,
            SubjectId: activity.SubjectId,
            TimeLeftId: activity.TimeLeftId,
            GradeId: activity.GradeId
            
        }

        addActivity(newActivity)
            .then(r => r.json())
            .then(a => {
                navigate(`/activity/${a.id}`)
            })
    }

    
    return (
        <form className="activityForm"
            style={{
            display: "block",
            width: "75%",
            marginTop:"15px",
            padding: ".75rem",
            marginLeft: "200px",
            fontSize: "1.3rem",
            lineHeight: "1.5",
            backgroundColor: "#6993b8",
            
            border: "1px solid darkblue",
            borderRadius: ".55rem"
            }}>
            <h2 className="activityForm__Title" style={{textAlign:"center"}}>New Activity</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Title">Title:  </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Activity title"
                        value={activity.Title}
                        onChange={(changeEvent) => {
                            const copy = {...activity}
                            copy.Title = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Content">Content:  </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        
                        placeholder="Activity content"
                        value={activity.Content}
                        onChange={(changeEvent) => {
                            const copy = {...activity}
                            copy.Content = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ContentUrl">Content Url:  </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Link to Activity"
                        value={activity.ContentUrl}
                        onChange={(changeEvent) => {
                            const copy = {...activity}
                            copy.ContentUrl = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ImageLocation">Image URL:  </label>
                    <input
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="www.example.com"
                        value={activity.ImageLocation}
                        onChange={(changeEvent) => {
                            const copy = {...activity}
                            copy.ImageLocation = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="timeLeft">TimeLeft:  </label>
                    <select required className="form-control" 
                            value={activity.TimeLeftId} 
                            onChange={(changeEvent) => {
                                const copy = {...activity}
                                copy.TimeLeftId = changeEvent.target.value
                                update(copy)
                            }}>
                        <option value="0">How Many Minutes Are Left in Class?</option>
                        {times?.map(c => <option value={c.id}>{c.amount}</option>)}
                    </select>
                </div>         
            </fieldset>  
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Grade Level:  </label>
                    <select required className="form-control" 
                            value={activity.GradeId} 
                            onChange={(changeEvent) => {
                                const copy = {...activity}
                                copy.GradeId = changeEvent.target.value
                                update(copy)
                            }}>
                        <option value="0">Choose A Grade Level</option>
                        {grades?.map(g => <option value={g.id}>{g.level}</option>)}
                    </select>
                </div>         
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject:  </label>
                    <select required className="form-control" 
                            value={activity.SubjectId} 
                            onChange={(changeEvent) => {
                                const copy = {...activity}
                                copy.SubjectId = changeEvent.target.value
                                update(copy)
                            }}>
                        <option value="0">Choose A Subject</option>
                        {subjects?.map(c => <option value={c.id}>{c.name}</option>)}
                    </select>
                </div>         
            </fieldset>
            
            <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}} style={{marginTop:"10px"}} className="btn btn-secondary">
                Publish Activity
            </button>
        
        <div style={{marginLeft: '30px', marginTop:"20px"}}>
        <Link to="/activities">Go Back</Link>
        </div>
        </form>
    )
}

export default ActivityForm;