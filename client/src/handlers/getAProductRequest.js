import apiUsersAxios from "../config/apiUsersAxios";

export default  async function({usersession, productId}){
    return apiUsersAxios.get(`users/products/${productId}`, {
        headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${usersession}`
        }
    })
}