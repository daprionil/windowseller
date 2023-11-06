import apiUsersAxios from "../config/apiUsersAxios";

export default function({email, password}){
    return apiUsersAxios.get('/users/login',{
        data: {
            email,
            password
        },
        headers:{
            'Content-Type':'application/json'
        }
    });
}