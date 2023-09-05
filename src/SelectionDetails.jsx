import { Component } from 'react'
import {getUserName} from './utils/util';
import { Container, Row, Col } from 'react-bootstrap';

export default class SelectionDetails extends Component {

    render() { 
        const { selectedUser, selectedGarden } = this.props;
        return ( 
            <div className='tracker-header'>
                <h3>
                    { selectedUser.id && `Hello ${getUserName(selectedUser)}`
                    }
                </h3>
                <p>{ selectedUser.id 
                    ? selectedGarden.name
                        ? <><b>Working in: </b><span className='header-details'>{selectedGarden.name}</span></>
                        : 'Select a garden in the Garden tab' 
                    : 'Please select a user'
                }</p>
            </div>
        );
    }
}