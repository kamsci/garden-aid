'use strict';

import axios from "axios";

export default class BaseClient {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;

        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            timeout: 2000
          });
    }

    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.post['Content-Type'] = 'application/json';
    createConfig(baseUrl, apiKey) {
        const config = {
            baseURL: baseUrl,
            timeout: 2000
          };
        if (apiKey) {
            config.headers = {'Authorization': `Bearer ${apiKey}`};
        }
        return config;
    }
}