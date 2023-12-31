import {Container, Row, Col } from 'react-bootstrap';
import PlantCard from '../PlantCard';

const PlantViewGallery = (props) => {
    const { gardenPlants } = props;

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

export default PlantViewGallery;