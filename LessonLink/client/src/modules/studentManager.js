import { getToken } from "./authManager";

const baseUrl = "/api/student";

// allStudents if needed can go here

export const getStudentsByTeacherId = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/myStudents/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const getStudent = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const editStudent = (student) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${student.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student)
        });
    })
};

export const deleteStudent = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
};