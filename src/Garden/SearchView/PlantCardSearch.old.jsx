import { Component } from "react";
import { Button } from "react-bootstrap";
import PlantCard from "../PlantCard";

class PlantCardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onClickPlant = (event) => {
        event.preventDefault();
        const { plant, isSelected, selectedGarden, selectPlant } = this.props;
        console.log('PlantCardSearch.onClickPlant: ', plant);
        !isSelected && selectPlant(selectedGarden._id, plant);
    }

    render() {
        const { plant, isSelected, selectedGarden } = this.props;
        return (
            <PlantCard 
                plant={plant} 
                selectPlant={this.selectPlant}>
                    { isSelected 
                        ? <Button variant="disabled" disabled>{`In ${selectedGarden.name}`} </Button> 
                        : <Button variant="primary" onClick={this.onClickPlant}>Add to Garden</Button>
                    }
            </PlantCard>
        );
    }
}

export default PlantCardSearch;