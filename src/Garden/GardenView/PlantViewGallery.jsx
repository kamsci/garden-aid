import {Component } from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
import PlantCard from './PlantCard';

class PlantViewGallery extends Component {

    render() { 
        const { gardenPlants} = this.props;
        return ( 
            <Container>
                <Row>
                    {gardenPlants && gardenPlants.map(plant => {
                        return (
                            <Col key={plant._id}>
                                <PlantCard 
                                    plant={plant} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
         );
    }
}
export default PlantViewGallery;