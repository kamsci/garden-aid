'use strict';

import BaseClient from "../../clients/baseClient";
import User from '../models/user';

const baseUsersUrl = `${import.meta.env.VITE_BASE_API_URL}/users`;

export default class UserClient extends BaseClient {
    constructor() {
        super(baseUsersUrl, null);
        console.log("baseUsersUrl", baseUsersUrl);
    }

    findAll() {
        return this.axiosInstance.get('/').then(response => {
            console.log("received response from API", response);
            return(response.data.map(userJson => UserClient.createUserFromJson(userJson)));
        });
    }

    // search(query, page) {
    //     if (!query) throw new Error("query is required");
    //     return this.axiosInstance.get('/search', {
    //         params: {
    //             q: query,
    //             page: page ? page : 1
    //         }
    //     }).then(response => {
    //         console.log("received response from API", response);
    //         return(response.data);
    //     })
    // }

    static createUserFromJson(json) {
        return new User(json);
    }

    static createUsersFromJson(json) { 
        return json.map(plantJson => UserClient.createUserFromJson(plantJson));
    }

}