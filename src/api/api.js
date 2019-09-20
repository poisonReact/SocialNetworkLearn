import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "17886534-6565-4a80-bff3-705f3b89b3bc"
    }

})



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    
    setFollow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },
    setUnfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    getUserId(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status} )
            .then(response => response.data)
    },
}


export const authAPI = {
    getAuth() {
        
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    },
}
