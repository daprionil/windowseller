import apiUsersAxios from "../config/apiUsersAxios";

export default function({password, tokenId}) {
    return apiUsersAxios.put(`/users/changepassword/${tokenId}`,{
        password
    },{
        headers:{
            'Content-Aplicatication': 'application/json'
        }
    })
}