import {Component} from 'react';
import {Container, Row, Col, Button } from 'react-bootstrap';
import GardenCard from './GardenCard';
import GardenFormModal from './GardenFormModal';
import PlantCard from '../PlantCard';

class PlantGardenView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGardenForm: false,
         }
         console.log('PlantGardenView: ', this.props);
    }

    handleOpenGardenForm = () => {
        this.setState({showGardenForm: true});
    }

    handleCloseGardenForm = () => {
        this.setState({showGardenForm: false});
    }

    render() { 
        const { gardens, gardenPlantsList, selectedGarden, selectGarden, deleteGarden, selectedUser} = this.props;
        // console.log('garden view', this.props);
        return ( 
            <div>
                <p>
                    <Button variant='dark' onClick={this.handleOpenGardenForm}>Add Garden</Button>
                    <GardenFormModal 
                        show={this.state.showGardenForm}
                        handleClose={this.handleCloseGardenForm}
                        submitGardenForm={this.props.submitGardenForm}
                        selectedUser={selectedUser} />
                </p>
                
                <Container>
                    <Row>
                        {gardens && gardens.map(garden => {
                            return (
                                <Col key={garden._id}>
                                    <GardenCard 
                                        garden={garden}
                                        deleteGarden={deleteGarden}
                                        selectGarden={selectGarden}
                                        isSelected={selectedGarden._id === garden._id} />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
                <hr />
            </div>
         );
    }
}

export default PlantGardenView;