import apiUsersAxios from "../config/apiUsersAxios";

export default function({tokenId}) {
    return apiUsersAxios.get(`/users/changepassword/${tokenId}`, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
}