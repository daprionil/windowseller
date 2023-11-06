import apiUsersAxios from "../config/apiUsersAxios";

export default function({email, password}){
    return apiUsersAxios.post('/users/login',{
        email,
        password
    },{
        headers:{
            'Content-Type':'application/json'
        }
    });
}