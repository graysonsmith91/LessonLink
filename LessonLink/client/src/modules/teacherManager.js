import { getToken } from "./authManager";

const baseUrl = "/api/teacher";

export const getAllTeachers = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

// export const getTag = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${baseUrl}/${id}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }).then((res) => res.json());
//     })
// };

// export const addTag = (tag) => {
//     return getToken().then((token) => {
//         return fetch(`${baseUrl}`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(tag)
//         });
//     })
// };

// export const editTag = (tag) => {
//     return getToken().then((token) => {
//         return fetch(`${baseUrl}/${tag.id}`, {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(tag)
//         });
//     })
// };

// export const deleteTag = (id) => {
//     return getToken().then((token) => {
//         return fetch(`${baseUrl}/${id}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//     })
// };