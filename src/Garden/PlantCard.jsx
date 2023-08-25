import { Component } from "react";
import { Card } from "react-bootstrap";

class PlantCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { plant, children } = this.props;
        return (
            <Card id={plant.id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={plant.imageUrl}/>
                <Card.Body>
                    <Card.Title>{plant.commonName}</Card.Title>
                    <Card.Text>
                        {plant.scientificName}
                    </Card.Text>
                    {children}
                </Card.Body>
            </Card>
        );
    }
}

export default PlantCard;