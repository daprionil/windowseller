import apiUsersAxios from "../config/apiUsersAxios";

export default function({session, categoryId}){
    return apiUsersAxios.delete(`users/category/${categoryId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`
        }
    });
}