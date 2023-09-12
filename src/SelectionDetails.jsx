import { getUserName } from "./utils/util";
import {Container, Row, Col} from 'react-bootstrap';

const SelectionDetails = (props) => {
    const { selectedUser, selectedGarden } = props;
    return ( 
        <div className='tracker-header'>
            <h3>
                { selectedUser._id && `Hello ${getUserName(selectedUser)}`
                }
            </h3>
            <p>{ selectedUser._id 
                ? selectedGarden.name
                    ? <><b>Working in: </b><span className='header-details'>{selectedGarden.name}</span></>
                    : 'Select a garden in the Garden tab' 
                : 'Please login to view your gardens'
            }</p>
        </div>
    );
}
 export default SelectionDetails;