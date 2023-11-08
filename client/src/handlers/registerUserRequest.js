import apiUsersAxios from "../config/apiUsersAxios";

export default function ({namecompany, description, eslogan, phone, email, password}){
    return apiUsersAxios.post('/users', {
        namecompany,
        eslogan,
        phone,
        email,
        password,
        description
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}