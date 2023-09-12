import { useState, useEffect } from 'react';

import GardenClient from '../clients/gardenClient';
const gardenClient = new GardenClient();

import { arrayToMap } from '../../utils/util';

const useGardenPlants = () => {
	// Plants in Garden State
	const [gardenPlants, setGardenPlants] = useState({});
	const [gardenPlantsList, setGardenPlantsList] = useState([]);
	const [gardenPlantsLoading, setGardenPlantsLoading] = useState(false);
	const [gardenPlantsError, setGardenPlantsError] = useState(false);


	// Plants in Garden CRUD Functions
	function findPlantsInGarden(selectedGardenId) {
		if (selectedGardenId){
			setGardenPlantsLoading(true);
			gardenClient.findPlantsByGardenId(selectedGardenId)
			.then(response => {
				// console.log('Plants in Garden:', response);
				setGardenPlantsList(response);
				setGardenPlants(arrayToMap(response, "refId"));
			})
			.catch(error => setGardenPlantsError(error?.message || "There was an error loading your plants"))
			.finally(() => setGardenPlantsLoading(false));
		}
	}

	function addPlantToGarden(selectedGardenId, plant) {
		console.log("adding plant to garden", plant);
		if (selectedGardenId) {
			gardenClient.addPlantToGarden(selectedGardenId, plant)
			.then(response => {
				// console.log('Plant added to garden:', response);
				findPlantsInGarden();
			})
			.catch(error => {
				console.log("Error saving plant to garden: ", error);
				setGardenPlantsError(error?.message || "There was an error adding the plant to the garden. Please try again.")
			});
		} else {
			setGardenPlantsError("Please select a garden to add a plant to.");
		}
	}

	return {
		addPlantToGarden,
		findPlantsInGarden,
		gardenPlants,
		gardenPlantsList,
		gardenPlantsError,
		gardenPlantsLoading,
	}
}

export default useGardenPlants;