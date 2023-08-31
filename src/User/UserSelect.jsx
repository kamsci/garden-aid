import { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import UserCard from './UserCard';

import UserClient from './clients/userClient';
const userClient = new UserClient();

class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: [],
            selectedUser: {},
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
            console.log(response);
            this.setState({
                users: response || [],
                error: null,
            });
        })    
        .catch(error => {
            console.log(error);
            this.setState({error: 'There was an error searching for users. Please try again.'});
        })
        .finally(() => {
            this.setState({loading: false});
        });
    }

    selectUser = (user) => {
        this.setState({selectedUser: user});
    }

    render() {
        console.log('find users: ', this.state.users);
        return ( 
            <Container>
                <Col>
                    {this.state.users && this.state.users.map(user => {
                        const isSelected = this.state.selectedUser.id == user.id;
                        return (
                            <UserCard 
                                key={user.id}
                                user={user} 
                                selectUser={this.selectUser}
                                isSelected={isSelected} />
                        )
                    })}
                </Col>
            </Container>
         );
    }
}

export default UserSelect;