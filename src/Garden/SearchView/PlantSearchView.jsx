import {Component} from 'react';
import PlantSearch from './PlantSearch';
import PlantSearchGallery from './PlantSearchGallery';
import Plant from '../models/plant';
import PaginationComponent from '../../HelperComponents/PaginationComponent';

import PlantSearchClient from "../clients/plantSearchClient";
const plantSearchClient = new PlantSearchClient();

const ITEMS_PER_PAGE = 20;

class PlantSearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchPlants: [],
            totalPlants: 0,
            paginationSearchError: null
        }
    }
    
    setSearchPlants = (searchTerm, plantsData, totalPlants) => {
        const searchPlants = PlantSearchClient.createPlantsFromJson(plantsData);
        searchPlants && this.setState({searchTerm, searchPlants, totalPlants, searchError: null});
    }

    paginateSearchPlants = (page) => {
        console.log('paginateSearchPlants', page);
        plantSearchClient.search(this.state.searchTerm, page)
        .then(response => this.handleResponse(response))
        .catch(error => { 
            console.log(error); 
            // Retry once
            plantSearchClient.search(this.state.searchTerm, page)
                .then(response => this.handleResponse(response))
                .catch(error => {
                    console.log(error);
                    this.setState({paginationSearchError: 'There was an error searching for plants. Please try again.'});
                });
        });
    }

    render() { 
        console.log('Total plants: ', this.state.totalPlants);
        console.log('Plants: ', this.state.searchPlants);
        return ( 
            <div>
                <h2>Grow Your Garden</h2>
                <PlantSearch
                    plantSearchClient={plantSearchClient}
                    setSearchPlants={this.setSearchPlants}
                    searchError={this.state.paginationSearchError}/>
                <hr/>
                <PaginationComponent 
                    totalItems={this.state.totalPlants} 
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={this.paginateSearchPlants} />
                <PlantSearchGallery 
                    myPlants={this.props.myPlants} 
                    searchPlants={this.state.searchPlants}
                    addToMyPlants={this.props.addToMyPlants} />
            </div>
         );
    }

    // Heler functions
    handleResponse(response) {  
        console.log('paginateSearchPlants', response);
        const searchPlants = PlantSearchClient.createPlantsFromJson(response.data);
        searchPlants && this.setState({ searchPlants, searchError: null });
    }
}

export default PlantSearchView;