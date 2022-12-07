const baseURL = `https://localhost:5001/api/Subject`;

export const getAllSubjects = () => {
    return fetch(`${baseURL}`)
    .then((res)=> res.json())
};

export const addSubject = (singleSubject) =>{
    return fetch (`${baseURL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleSubject),
    });
};

export const getSubById = (id) => {
    return fetch(`${baseURL}/${id}`)
        .then((res) => res.json())
}

export const deleteSub = (id) => {
    return fetch(`${baseURL}/${id}`, {
        method: "DELETE"
    })
}

export const editSub = (subject) => {
    return fetch(`${baseURL}/${subject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subject)
    })
    .then(getAllSubjects)
}

export const canIDelete = (id) => {
    return fetch(`https://localhost:5001/api/Activity/CanIDelete/${id}`)
    .then(r => r.json())
}
