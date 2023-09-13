import { Container, Col } from "react-bootstrap";
import UserCard from './UserCard';
import UserClient from "./clients/userClient";
import { useEffect, useState } from "react";

const userClient = new UserClient();

const UserSelect = (props) => {
    const {setUsers, selectUser, users, selectedUser} = props;
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        findAllUsers();
    }, []);

    const findAllUsers = () => {
        setloading(true);
        userClient.findAll()
        .then(response => { 
            // console.log(response);
            setError(null)
            setUsers(response);
        })    
        .catch(error => {
            console.log(error);
            setError('There was an error searching for users. Please try again.');
        })
        .finally(() => {
            setloading(false);
        });

    }
    return ( 
        <Container>
            <Col>
                {users && users.map(user => {
                    const isSelected = selectedUser?.id === user.id;
                    return (
                        <UserCard 
                            key={user.id}
                            user={user} 
                            selectUser={selectUser}
                            isSelected={isSelected} />
                    )
                })}
            </Col>
        </Container>
     );
}
export default UserSelect;
    