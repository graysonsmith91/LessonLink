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

export const addTeacherInstrument = (teacherInstrument) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/teacherInstrument`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherInstrument)
        });
    })
};

// export const deleteTeacherInstrument = (teacherInstrument) => {
//     return getToken().then((token) => {
//         return fetch(`${baseUrl}/teacherInstrument`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//     })
// };

export const deleteTeacherInstrument = (teacherInstrument) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/teacherInstrument`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _method: "DELETE",
                teacherInstrument: teacherInstrument
            })
        });
    });
};
