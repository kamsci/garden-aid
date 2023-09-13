import {Card, Button} from "react-bootstrap";

const GardenCard = (props) => {
    // deconstructing these variables out of props to use. Do this when you want use more than one prop.
    const {deleteGarden, isSelected, selectGarden, garden} = props;

    const onClickUser = (event) => {
        event.preventDefault();
        selectGarden(garden);
    }

    const onClickDelete = (event) => {
        event.preventDefault();
        deleteGarden(garden);
    }
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
                : <Button variant="dark" onClick={onClickUser}>Select Garden</Button>
            }
            </p>
            <Button variant="danger" onClick={onClickDelete}>Delete Garden</Button>
        </Card.Body>
    </Card>
 );
}
export default GardenCard;