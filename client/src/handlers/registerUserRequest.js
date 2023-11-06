import apiUsersAxios from "../config/apiUsersAxios";

export default function(data){
    return apiUsersAxios.post('/users/', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}