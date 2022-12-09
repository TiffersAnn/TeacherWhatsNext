const baseUrl = 'https://localhost:5001/api/Activity';

export const getAllActivities = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
};

export const getActivityById = (id) => {
    let post = fetch(`${baseUrl}/${id}`)
        .then((res) => res.json());
return post};

export const addActivity = (singleActivity) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singleActivity)
    });
  };

  export const deleteActivity = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
      })
  };
  
  export const editActivity = (activity) => {
    return fetch(`${baseUrl}/${activity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });
  };

  export const searchActivities = (subjectId, timeLeftId, gradeId)=> { 
    return fetch(`${baseUrl}/search?subjectId=${subjectId}&timeLeftId=${timeLeftId}&gradeId=${gradeId}`)
    .then((res)=> res.json())
  };