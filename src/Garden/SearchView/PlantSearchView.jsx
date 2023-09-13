import { useState } from "react";
import PlantSearch from './PlantSearch'
import PlantSearchGallery from "./PlantSearchGallery";
import PaginationComponent from "../../HelperComponents/PaginationComponent";
import PlantSearchClient from "../clients/plantSearchClient";

const plantSearchClient = new PlantSearchClient();

const PlantSearchView = (props) => {
    const{selectedGarden, selectedGardenPlants, addPlantToGarden} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchPlants, setSearchPlants] = useState([]);
    const [totalPlants, setTotalPlants] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [lastPage, setLastPage] = useState(0);
    const [paginationSearchError, setPaginationSearchError] = useState(null);

    const searchPlantResults = (searchTerm, response) => {
        if (response){
            setSearchTerm(searchTerm);
            setSearchPlants(response.data);
            setTotalPlants(response.total); 
            setItemsPerPage(response.perPage);
            setLastPage(response.lastPage);
            setPaginationSearchError(null);
        };       
    }

    const paginateSearchPlants = (page) => {
        console.log('paginateSearchPlants', page);
        plantSearchClient.search(searchTerm, page)
        .then(response => handlePaginationResponse(response))
        .catch(error => { 
            console.log(error); 
            // Retry once
            plantSearchClient.search(searchTerm, page)
                .then(response => handlePaginationResponse(response))
                .catch(error => {
                    console.log(error);
                    setPaginationSearchError('There was an error searching for plants. Please try again.');
                });
        });
    };
    //helper function
    const handlePaginationResponse = (response) => {  
        console.log('paginateSearchPlants', response);
        if (response !== null){
            setSearchTerm(searchTerm);
            setSearchPlants(response.data);
            setTotalPlants(response.total); 
            setItemsPerPage(response.perPage);
            setLastPage(response.lastPage);
            setPaginationSearchError(null);
        }       

    }


    return ( 
        <div>
            <h2>Grow Your Garden</h2>
            <PlantSearch
                plantSearchClient={plantSearchClient}
                setSearchPlants={searchPlantResults}
                searchError={paginationSearchError}/>
            <hr/>
            <PaginationComponent 
                totalItems={totalPlants} 
                itemsPerPage={itemsPerPage}
                lastPage={lastPage}
                onPageChange={paginateSearchPlants} />
            <PlantSearchGallery 
                myPlants={selectedGardenPlants} 
                searchPlants={searchPlants}
                selectedGarden={selectedGarden}
                addPlantToGarden={addPlantToGarden} />
        </div>
    );



}

export default PlantSearchView;