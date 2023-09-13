import { Button } from "react-bootstrap";
import PlantCard from "../PlantCard";

const PlantCardSearch = (props) => {
    const {plant, isSelected, selectedGarden, selectPlant} = props;

    const onClickPlant = (event) => {
        event.preventDefault();
        console.log('PlantCardSearch.onClickPlant: ', plant);
        !isSelected && selectPlant(selectedGarden._id, plant);
    }
    return (
        <PlantCard 
            plant={plant} 
            selectPlant={selectPlant}>
                { isSelected 
                    ? <Button variant="disabled" disabled>{`In ${selectedGarden.name}`} </Button> 
                    : <Button variant="primary" onClick={onClickPlant}>Add to Garden</Button>
                }
        </PlantCard>
    );
}
export default PlantCardSearch;