'use strict';

import BaseClient from "./baseClient";

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export default class GardenClient extends BaseClient {
    constructor() {
        super(baseUrl, null);
    }

    // Gardens
    findGardensByUserId(userId) {
        if (!userId) throw new Error("userId is required");
        return this.axiosInstance.get(`/gardens/users/${userId}`)
        .then(response => {
            // console.log("received response from gardens API", response);
            return(response.data);
        })  
    }

    createGardenByUserId(userId, gardenDetails) {
        if (!userId) throw new Error("userId is required"); 
        if (!gardenDetails) throw new Error("garden is required");
        const userGarden = { user: userId, ...gardenDetails};
        return this.axiosInstance.post(`/gardens/users/`, userGarden)
        .then(response => {
            // console.log("received response from create gardens API", response);
            return(response.data);
        })
    }

    addPlantToGarden(gardenId, plant) {
        if (!gardenId) throw new Error("gardenId is required");
        if (!plant) throw new Error("plantId is required");
        return this.axiosInstance.post(`/gardens/${gardenId}/plants`, plant)
        .then(response => { 
            // console.log("received response from add plant to garden API", response);
            return(response.data);
        });
    }

    deleteGarden(gardenId) {    
        if (!gardenId) throw new Error("gardenId is required");
        return this.axiosInstance.delete(`/gardens/${gardenId}`)
        .then(response => {
            // console.log("received response from delete garden API", response);
            return(response.data);
        });
    }

    // Plants in Gardens
    findPlantsByGardenId(gardenId) {
        if (!gardenId) throw new Error("gardenId is required");
        return this.axiosInstance.get(`/gardens/${gardenId}/plants`)
        .then(response => {
            // console.log("received response from plants in garden API", response);
            return(response.data.plants);
        });
    }
}
