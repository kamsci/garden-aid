import { Component } from 'react';
import {Container, Col } from 'react-bootstrap';
import UserCard from './UserCard';

import UserClient from './clients/userClient';
const userClient = new UserClient();

class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            error: null
        }
    }

    componentDidMount() {
        this.findAllUsers();
    }

    findAllUsers = () => {
        this.setState({ loading: true });
        userClient.findAll()
        .then(response => { 
            // console.log(response);
            this.setState({
                error: null,
            });
            this.props.setUsers(response);
        })    
        .catch(error => {
            console.log(error);
            this.setState({error: 'There was an error searching for users. Please try again.'});
        })
        .finally(() => {
            this.setState({loading: false});
        });
    }


    render() {
        // console.log('find users: ', this.props.users);
        // console.log('selected user: ', this.props.selectedUser)
        const {users, selectUser, selectedUser} = this.props;
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
}

export default UserSelect;