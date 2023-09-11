import {Component} from 'react';
import PlantSearch from './PlantSearch';
import PlantSearchGallery from './PlantSearchGallery';
import PaginationComponent from '../../HelperComponents/PaginationComponent';

import PlantSearchClient from "../clients/plantSearchClient";
const plantSearchClient = new PlantSearchClient();

class PlantSearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchPlants: [],
            totalPlants: 0,
            itemsPerPage: 0,
            lastPage: 0,
            paginationSearchError: null
        }
    }
    
    setSearchPlants = (searchTerm, response) => {
        response && this.setState({
            searchTerm, 
            searchPlants: response.data, 
            totalPlants: response.total, 
            itemsPerPage: response.perPage,
            lastPage: response.lastPage,
            paginationSearchError: null
        });
    }

    paginateSearchPlants = (page) => {
        console.log('paginateSearchPlants', page);
        plantSearchClient.search(this.state.searchTerm, page)
        .then(response => this.handlePaginationResponse(response))
        .catch(error => { 
            console.log(error); 
            // Retry once
            plantSearchClient.search(this.state.searchTerm, page)
                .then(response => this.handlePaginationResponse(response))
                .catch(error => {
                    console.log(error);
                    this.setState({paginationSearchError: 'There was an error searching for plants. Please try again.'});
                });
        });
    }

    render() { 
        console.log('PlantSearchView.render', this.props);
        // console.log('Plants: ', this.state.searchPlants);
        const { 
            addPlantToGarden, 
            selectedGarden, 
            selectedGardenPlants,
         } = this.props;
        const { 
            itemsPerPage,
            lastPage,
            paginationSearchError,
            searchPlants, 
            totalPlants,
         } = this.state;
        return ( 
            <div>
                <h2>Grow Your Garden</h2>
                <PlantSearch
                    plantSearchClient={plantSearchClient}
                    setSearchPlants={this.setSearchPlants}
                    searchError={paginationSearchError}/>
                <hr/>
                <PaginationComponent 
                    totalItems={totalPlants} 
                    itemsPerPage={itemsPerPage}
                    lastPage={lastPage}
                    onPageChange={this.paginateSearchPlants} />
                <PlantSearchGallery 
                    myPlants={selectedGardenPlants} 
                    searchPlants={searchPlants}
                    selectedGarden={selectedGarden}
                    addPlantToGarden={addPlantToGarden} />
            </div>
         );
    }

    // Helper functions
    handlePaginationResponse(response) {  
        console.log('paginateSearchPlants', response);
        response && this.setState({ 
            searchPlants: response.data, 
            totalPlants: response.total, 
            itemsPerPage: response.perPage,
            lastPage: response.lastPage,
            paginationSearchError: null });
    }
}

export default PlantSearchView;