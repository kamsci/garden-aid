import {Component} from 'react';
import PlantCardSearch from './PlantCardSearch';
import {Container, Row, Col } from 'react-bootstrap';

class PlantSearchGallery extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        const { myPlants, selectedGarden, searchPlants, addPlantToGarden } = this.props;
        console.log('my plants: ', myPlants);
        // console.log('search plants: ', searchPlants);
        return ( 
            <Container>
                <Row key="searchPlants">
                    {searchPlants && searchPlants.map(plant => {
                        const isSelected = myPlants.hasOwnProperty(plant.refId);
                        return (
                            <Col key={plant._id}>
                                <PlantCardSearch 
                                    key={plant.id}
                                    plant={plant} 
                                    selectedGarden={selectedGarden}
                                    selectPlant={addPlantToGarden}
                                    isSelected={isSelected} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
         );
    }

}

export default PlantSearchGallery;