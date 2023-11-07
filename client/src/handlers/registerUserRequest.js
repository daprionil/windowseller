import apiUsersAxios from "../config/apiUsersAxios";

export default function ({namecompany, eslogan, phone, email, password}){
    return apiUsersAxios.post('/users', {
        namecompany,
        eslogan,
        phone,
        email,
        password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}