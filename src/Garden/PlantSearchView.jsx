import {Component} from 'react';
import PlantSearch from './PlantSearch';
import PlantSearchGallery from './PlantSearchGallery';
import Plant from './models/plant';

class PlantSearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPlants: []
        }
    }

    setSearchPlants = (plantsData) => {
        const searchPlants = plantsData && plantsData.map(plant => new Plant(plant));
        searchPlants && this.setState({searchPlants});
    }

    render() { 
        return ( 
            <div>
                <h2>Grow Your Garden</h2>
                <PlantSearch setSearchPlants={this.setSearchPlants}/>
                <hr/>
                <PlantSearchGallery 
                    myPlants={this.props.myPlants} 
                    searchPlants={this.state.searchPlants}
                    addToMyPlants={this.props.addToMyPlants} />
            </div>
         );
    }

}

export default PlantSearchView;