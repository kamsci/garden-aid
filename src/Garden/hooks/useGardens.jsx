import { useState } from 'react';

import GardenClient from '../clients/gardenClient';
const gardenClient = new GardenClient();

const useGardens = () => {
  // Garden State (hehe)
  const [gardens, setGardens] = useState([]);
  const [gardensLoading, setGardensLoading] = useState(false);
  const [gardensError, setGardensError] = useState(false);
  const [selectedGarden, setSelectedGarden] = useState({});

  // Garden CRUD Functions
  function findGardens(dbUserId) {
    if (dbUserId){
      setGardensLoading(true);
      gardenClient.findGardensByUserId(dbUserId)
      .then(response => {
          console.log('Gardens:', response);
          setGardens(response);
      })
      .catch(error => setGardensError(error?.message || "There was an error loading your gardens"))
      .finally(() => setGardensLoading(false));
    }
  }

  function createGarden(dbUserId, gardenDetails) {
    gardenClient.createGardenByUserId(dbUserId, gardenDetails)
    .then(response => {
      console.log('garden created', response);
      findGardens(dbUserId);
    })
    .catch(error => setGardensError(error?.message || "There was an error creating your garden"));
  }

  function selectGarden(garden) {
    console.log("selected garden", garden);
    setSelectedGarden(garden);
    setGardensError(null);
  }

  function deleteGarden(garden) {
    try {
      gardenClient.deleteGarden(garden._id)
      .catch(error => { 
        console.log(error);
        setGardensError(error?.nessage || "There was an error deleting the garden. Please try again.");
      });
    } catch (error) {
      console.log(error);
      setGardensError(error?.message || "There was an error deleting the garden. Please try again.");
    }
  }

  return { 
    createGarden,
    deleteGarden,
    findGardens,
    gardens,
    gardensError,
    gardensLoading,
    selectGarden, 
    selectedGarden,
  }
}

export default useGardens;