import {Component} from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
import PlantCard from './PlantCard';

class PlantGardenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() { 
        // console.log('my plants view: ', this.props.myPlants);
        return ( 
            <div>
                <h2>Plants in my Garden</h2>
                <Container>
                <Row>
                    {this.props.myPlants && this.props.myPlants.map(plant => {
                        return (
                            <Col key={plant.id}>
                                <PlantCard 
                                    plant={plant} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            </div>
         );
    }

}

export default PlantGardenView;