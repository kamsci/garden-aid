'use strict';

import BaseClient from "../../clients/baseClient";
import Plant from "../models/plant";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export default class PlantSearchClient extends BaseClient {
    constructor() {
        super(baseUrl, null);
    }

    async search(query, page) {
        if (!query) throw new Error("query is required");
        const response = await this.axiosInstance.get('/search', {
            params: {
                q: query,
                page: page ? page : 1
            }
        });
        console.log("received response from API", response);
        return (response.data);
    }

    static createPlantFromJson(json) {
        return new Plant(json);
    }

    static createPlantsFromJson(json) { 
        return json.map(plantJson => PlantSearchClient.createPlantFromJson(plantJson));
    }

}
