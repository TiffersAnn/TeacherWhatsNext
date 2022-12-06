import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { addActivity } from "../../Managers/ActivityManager";

export const ActivityForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [activity, update] = useState({
        Title: "",
        Content: "",
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

    //let categoryHtml = ""
    //document.getElementById("categories"). innerHTML = categoryHtml;


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        const newActivity = {
            Title: activity.Title,
            Content: activity.Content,
            ImageLocation: activity.ImageLocation,
            UserProfileId: userObject.id,
            SubjectId: activity.SubjectId,
            TimeLeftId: activity.TimeLeftId,
            GradeId: activity.GradeId
            
        }

        addActivity(newActivity)
            .then(r => r.json())
            .then(a => {
                navigate(`/activities/${a.id}`)
            })
    }

    
    return (
        <form className="activityForm">
            <h2 className="activityForm__Title">New Activity</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Post title"
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
                    <label htmlFor="Content">Content:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Post content"
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
                    <label htmlFor="ImageLocation">Image URL:</label>
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
                    <label htmlFor="timeLeft">TimeLeft</label>
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
                    <label htmlFor="subject">Grade Level</label>
                    <select required className="form-control" 
                            value={activity.GradeId} 
                            onChange={(changeEvent) => {
                                const copy = {...activity}
                                copy.GradeId = changeEvent.target.value
                                update(copy)
                            }}>
                        <option value="0">Choose A Grade Level</option>
                        {grades?.map(c => <option value={c.id}>{c.level}</option>)}
                    </select>
                </div>         
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
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
            
            <button onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}} className="btn btn-primary">
                Publish Activity
            </button>
        </form>
    )
}

export default ActivityForm;