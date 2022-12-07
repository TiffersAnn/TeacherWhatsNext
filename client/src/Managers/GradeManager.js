const baseUrl = 'https://localhost:5001/api/Grade';

export const getAllGrades = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const getById = (id) => {  //http GET by id parameter 
    return fetch(`https://localhost:5001/api/Grade/${id}`)
        .then((res) => res.json());
};

export const addGrade = (grade) => {
    return fetch(`https://localhost:5001/api/Grade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grade),
      })
};

export const deleteGrade = (id) => {
    return fetch(`https://localhost:5001/api/Grade/${id}`, {
      method: "DELETE"
    })
  };

  export const editGrade = (grade) => {
    return fetch(`https://localhost:5001/api/Grade/${grade.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grade),
      }).then((res) => res.json())
};