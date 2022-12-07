const baseUrl = 'https://localhost:5001/api/TimeLeft';

export const getAllTimes = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getTimeById = (id) => {   
    return fetch(`https://localhost:5001/api/TimeLeft/${id}`)
        .then((res) => res.json());
};

export const addTime = (time) => {
    return fetch(`https://localhost:5001/api/TimeLeft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(time),
      })
};

export const deleteTime = (id) => {
    return fetch(`https://localhost:5001/api/TimeLeft/${id}`, {
      method: "DELETE"
    })
  };

  export const editTime = (time) => {
    return fetch(`https://localhost:5001/api/TimeLeft/${time.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(time),
      }).then((res) => res.json())
};