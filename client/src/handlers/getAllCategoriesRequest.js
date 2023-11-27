import apiUsersAxios from "../config/apiUsersAxios";

export default function({session}){
    return apiUsersAxios.get(`/users/category`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        }
    })
}