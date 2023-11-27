import apiUsersAxios from "../config/apiUsersAxios";

export default function({session, categoryname}){
    return apiUsersAxios.post('/users/category', {
        category: categoryname
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`
        }
    })
}