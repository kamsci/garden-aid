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

    static createUserFromJson(json) {
        return new User(json);
    }

    static createUsersFromJson(json) { 
        return json.map(plantJson => UserClient.createUserFromJson(plantJson));
    }

}