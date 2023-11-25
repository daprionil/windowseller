import apiUsersAxios from "../config/apiUsersAxios";

export default function({session}){
    return apiUsersAxios.get(`/users`, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        }
    })
}