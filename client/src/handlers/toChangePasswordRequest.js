import apiUsersAxios from "../config/apiUsersAxios";

export default function toChangePasswordRequest({email}){
    return apiUsersAxios.post('/users/changepassword',{
        email
    }, {
        headers:{
            'Content-Type':'application/json'
        }
    })
}