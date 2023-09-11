'use strict';

import BaseClient from "../../clients/baseClient";
import User from '../models/user';

const baseUsersUrl = `${import.meta.env.VITE_BASE_API_URL}/users`;

export default class UserClient extends BaseClient {
    constructor() {
        super(baseUsersUrl, null);
    }

    findAll() {
        return this.axiosInstance.get('/').then(response => {
            // console.log("received response from users API", response);
            return(response.data.map(userJson => UserClient.createUserFromJson(userJson)));
        });
    }

    findByEmail(email) {
        if (!email) throw new Error("email is required");
        return this.axiosInstance.get(`/find?email=${email}`)
        .then(response => { 
            return response.data;
        })
        .catch(error => {
            if (error.response.status === 404) {
                throw new Error(UserClient.USER_NOT_FOUND);
            } else {
                throw error;
            }
        });
    }

    save(user) {
        if (!user) throw new Error("user is required");
        return this.axiosInstance.post('/', user)
        .then(response => {
            // console.log("received response from create user API", response);
            return(response.data);
        })
    }

    static createUserFromJson(json) {
        return new User(json);
    }

    static createUsersFromJson(json) { 
        return json.map(plantJson => UserClient.createUserFromJson(plantJson));
    }

    static USER_NOT_FOUND = "User not found";

}