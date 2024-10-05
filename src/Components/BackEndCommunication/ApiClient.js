import axios from "axios";

export const apiCommunicator = axios.create(
    {
        baseURL : "http://localhost:8080/"
    }
)

export function jwtAuthentication(username , password){
    return apiCommunicator.post(`/authenticate`, {username , password} )
}