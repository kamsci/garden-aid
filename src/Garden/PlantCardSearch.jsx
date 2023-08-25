import { Component } from "react";
import { Button } from "react-bootstrap";
import PlantCard from "./PlantCard";

class PlantCardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onClickPlant = (event) => {
        event.preventDefault();
        this.props.selectPlant(this.props.plant);
    }

    render() {
        const { plant, isSelected, children } = this.props;
        return (
            <PlantCard 
                plant={plant} 
                selectPlant={this.selectPlant}>
                    { isSelected 
                        ? <Button variant="disabled" disabled>In Garden</Button> 
                        : <Button variant="primary" onClick={this.onClickPlant}>Add to Garden</Button>
                    }
            </PlantCard>
        );
    }
}

export default PlantCardSearch;