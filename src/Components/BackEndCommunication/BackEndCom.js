import {apiCommunicator} from "./ApiClient"

export function getTodosList(username){
    return apiCommunicator.get(`user/${username}/todos`)
}

export function deleteTodoApi( usename , id){
    return apiCommunicator.delete(`user/${usename}/todos/${id}`)
}

export function getTodoById(username, id){
    return apiCommunicator.get(`user/${username}/todos/${id}`)
}

export function updateTodo(username, id, todo){
    return apiCommunicator.put(`user/${username}/todos/${id}`, todo)
}

export function createTodo(username, todo){
    return apiCommunicator.post(`user/${username}/todos`, todo)
}

export function authorizationToken(token){
    return apiCommunicator.get(`/basicauth` , {
        headers: {
            Authorization: token
        }
    })
}