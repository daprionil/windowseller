import apiUsersAxios from "../config/apiUsersAxios";

export default function({usersession, formData}){
    return apiUsersAxios.post('users/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${usersession}`
        }
    });
}