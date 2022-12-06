const baseUrl = '/api/activity';

export const getAllActivities = () => {
    return fetch(baseUrl)
      .then((res) => res.json())
};

export const getActivityById = (id) => {
    let post = fetch(`/api/activity/${id}`)
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
    return fetch(`/api/activity/${id}`, {
        method: "DELETE"
      })
  };
  
  export const editActivity = (activity) => {
    return fetch(`/api/activity/${activity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      });
  };