import apiUsersAxios from "../config/apiUsersAxios";

export default function({session, categoryName, categoryId}){
    return apiUsersAxios.put(`/users/category/${categoryId}`, {
        category: categoryName
    }, {
        headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${session}`
        }
    })
}