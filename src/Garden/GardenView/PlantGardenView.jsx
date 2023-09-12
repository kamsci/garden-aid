import { Container, Row, Col, Button } from 'react-bootstrap';
import GardenCard from './GardenCard';
import GardenFormModal from './GardenFormModal';
import PlantCard from '../PlantCard';
import { useState } from 'react';

const PlantGardenView = (props) => {
    // Decoonstructing props
    const {selectedUserGardens, gardenPlantsList, 
           selectedUser, selectedGarden, submitGardenForm,
            selectGarden, deleteGarden, gardens}
             = props;

    const [ShowGardenForm, setShowGardenForm] = useState([false]);

    const handleOpenGardenForm = () => {
        setShowGardenForm(true);
    }

    const handleCloseGardenForm = () => {
        setShowGardenForm(false);
    }
    return ( 
        <div>
            <p>
                <Button variant='dark' onClick={handleOpenGardenForm}>Add Garden</Button>
                <GardenFormModal 
                    show={ShowGardenForm}
                    handleClose={handleCloseGardenForm}
                    submitGardenForm={submitGardenForm}
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
export default PlantGardenView;