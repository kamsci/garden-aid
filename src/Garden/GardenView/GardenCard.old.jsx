import {Component } from 'react';
import { Card, Button, Row } from "react-bootstrap";

class GardenCard extends Component {

    onClickUser = (event) => {
        event.preventDefault();
        this.props.selectGarden(this.props.garden);
    }

    onClickDelete = (event) => {
        event.preventDefault();
        this.props.deleteGarden(this.props.garden);
    }

    render() { 
        const { garden, isSelected } = this.props;
        return ( 
            <Card id={garden._id} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{garden.name}</Card.Title>
                    <Card.Text>
                        {garden.description}
                    </Card.Text>
                    <p>
                    { isSelected 
                        ? <Button variant="disabled" disabled>Current Garden</Button> 
                        : <Button variant="dark" onClick={this.onClickUser}>Select Garden</Button>
                    }
                    </p>
                    <Button variant="danger" onClick={this.onClickDelete}>Delete Garden</Button>
                </Card.Body>
            </Card>
         );
    }
}

export default GardenCard;