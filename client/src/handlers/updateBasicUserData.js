import apiUsersAxios from "../config/apiUsersAxios";

export default function({session}, data){
    return apiUsersAxios.put('/users/', data, {
        headers:{
            "Content-Type": 'Application/json',
            Authorization: ` Bearer ${session}`
        }
    })
}