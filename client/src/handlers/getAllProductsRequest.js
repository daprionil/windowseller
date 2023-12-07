import apiUsersAxios from "../config/apiUsersAxios";

export default function({usersession}){
    return apiUsersAxios.get('/users/products', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usersession}`
        }
    })
}