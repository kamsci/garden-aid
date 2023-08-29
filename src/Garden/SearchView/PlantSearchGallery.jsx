import {Component} from 'react';
import PlantCardSearch from './PlantCardSearch';
import {Container, Row, Col, Button } from 'react-bootstrap';

class PlantSearchGallery extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        // console.log('my plants: ', this.props.myPlants);
        console.log('search plants: ', this.props.searchPlants);
        return ( 
            <Container>
                <Row>
                    {this.props.searchPlants && this.props.searchPlants.map(plant => {
                        const isSelected = this.props.myPlants.hasOwnProperty(plant.id);
                        return (
                            <Col key={plant.id}>
                                <PlantCardSearch 
                                    plant={plant} 
                                    selectPlant={this.props.addToMyPlants}
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