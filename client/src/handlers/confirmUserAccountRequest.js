import apiUsersAxios from "../config/apiUsersAxios";

export default function({tokenId}){
    return apiUsersAxios.get(`/users/confirm/${tokenId}`, {
        headers:{
            'Content-Type':'application/json'
        }
    })
}