import { getToken } from "./authManager";

const baseUrl = "/api/instrument";

export const getAllInstruments = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const getInstrument = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const getInstrumentsByTeacherId = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/teacherInstruments/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const editInstrument = (instrument) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${instrument.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(instrument)
        });
    })
};

export const deleteInstrument = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
};

export const addTeacherInstrument = () => {

}