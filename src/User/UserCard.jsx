import { Component } from "react";
import { Card, Button } from "react-bootstrap";

class UserCard extends Component {
    constructor(props) {
        super(props);
    }

    onClickUser = (event) => {
        event.preventDefault();
        this.props.selectUser(this.props.user);
    }

    render() {
        const { user, isSelected, selectUser } = this.props;
        return (
            <Card id={user.id} style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>
                        <p><span>email: </span><span>{user.email}</span></p>
                    </Card.Text>
                    { isSelected 
                        ? <Button variant="disabled" disabled>Current User</Button> 
                        : <Button variant="dark" onClick={this.onClickUser}>Select User</Button>
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default UserCard;