import { useState } from "react";
import { getActivityById } from "../../Managers/ActivityManager";


const ActivityEdit = () => {
    const [activity, update] = useState({
        title: "",
        content: "",
        imageLocation: "",
        subjectId: "",
        timeLeftId: "",
        gradeId: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();  
    
    const localUser = localStorage.getItem("userProfile");
    const userObject = JSON.parse(localUser);

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

    useEffect(() => {
        getActivityById(id).then(update)        
    }, [])
    

    //one step behind issue -- needed e.preventDefault();
    function Edit(e) {

        e.preventDefault();

        const editedActivity = {
            id: activity.id,
            title: activity.title,
            content: activity.content,
            imageLocation: activity.imageLocation,
            userProfileId: userObject.id,
            subjectId: activity.subjectId,
            timeLeftId: activity.timeLeftId,
            gradeId: activity.gradeId
            
        }

        editPost(editedActivity).then(() => {
            console.log("here?");
            navigate(`/activities/${editedActivity.id}`)});        
    }

    const Cancel = () => {
        navigate(`/activities/${id}`)
    }

    return (
        <form className="postForm">
            <h2 className="postForm__Title">Edit Activity</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Post title"
                        value={post.title}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.title = changeEvent.target.value
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
                        value={post.content}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.content = changeEvent.target.value
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
                        value={activity.imageLocation}
                        onChange={(changeEvent) => {
                            const copy = {...post}
                            copy.imageLocation = changeEvent.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>   
            <fieldset>
                <div className="form-group">
                    <label htmlFor="timeLeft">Time Left</label>
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
            
            
            <button className="btn btn-primary" style={{marginRight: '10px'}} onClick={ e => Edit(e) }>Edit Activity</button>
            <button onClick={ e => Cancel() }>Cancel</button>
        </form>
    )
}

export default ActivityEdit;