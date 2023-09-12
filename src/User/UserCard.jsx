import {Card, Button} from "react-bootstrap";

const UserCard = (props) => {
    const {selectUser, user, isSelected} = props;
    const onClickUser = (event) => {
        event.preventDefault();
        selectUser(user);
    }
    return (
        <Card id={user.id} style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                    <span>email: </span><span>{user.email}</span>
                </Card.Text>
                { isSelected 
                    ? <Button variant="disabled" disabled>Current User</Button> 
                    : <Button variant="dark" onClick={onClickUser}>Select User</Button>
                }
            </Card.Body>
        </Card>
    );
}