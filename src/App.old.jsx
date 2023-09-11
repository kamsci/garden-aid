import { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import PlantSearchView from './Garden/SearchView/PlantSearchView';
import PlantGardenView from './Garden/GardenView/PlantGardenView';
import UserSelect from './User/UserSelect';
import SelectionDetails from './SelectionDetails';

import { withAuth0 } from '@auth0/auth0-react';

import { arrayToMap } from './utils/util';
import GardenClient from './Garden/clients/gardenClient';
const gardenClient = new GardenClient();

class App extends Component {
  constructor(props) {
    super(props);
    const selectedUser = {} // JSON.parse(localStorage.getItem('selectedUser'));
    this.state = { 
      users: [],
      selectedUser: selectedUser || {},
      selectedUserGardens: [],
      selectedGarden: {},
      selectedGardenPlants: {},
      error: null
     }
  }

  componentDidMount() {
    console.log('App.componentDidMount');
    this.state.selectedUser.id && this.findGardens(this.state.selectedUser.id);
  }

  // useEffect = () => {
  //   console.log('App.useEffect');

  // },[this.props.user
  
  // useEffect(() => { 
  //   console.log('App.useEffect');
  //   if (this.props.auth0.user) {

  //   moveMap(position) 
  // }, [this.props.auth0.user])

  // Users
  setUsers = (users) => {
    this.setState({users: users || []});
  }

  selectUser = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.setState({ 
      selectedUser: user, 
      selectedUserGardens: [],
      selectGarden: {},
      selectedGardenPlants: {}, 
    });
    this.findGardens(user.id);
  }

  // Gardens
//   selectGarden = (garden) => {
//     this.setState({
//       selectedGarden: garden,
//       error: null,
//     });
//     this.getPlantsInGarden(garden._id);
//   }

//   deleteGarden = (garden) => {
//     try {
//       gardenClient.deleteGarden(garden._id)
//       .catch(error => { 
//         console.log(error);
//         this.setState({error});
//       });
//     } catch (error) {
//       console.log(error);
//       this.setState({error: error.message || "There was an error deleting the garden. Please try again."});
//     }
//   }

//   findGardens = (userId) => {
//     gardenClient.findGardensByUserId(userId)
//     .then(response => {
//         // console.log('Gardens:', response);
//         this.setState({
//           selectedUserGardens: response,
//           // error: null,
//         });
//     })
//     .catch(error => this.setState({error}));
//   }

//   submitGardenForm = (gardenDetails) => {
//     gardenClient.createGardenByUserId(this.state.selectedUser.id, gardenDetails)
//     .then(response => {
//       console.log('garden created', response);
//       this.findGardens(this.state.selectedUser.id);
//     })
//     .catch(error => this.setState({error}));
//   }

  // Plants
  addPlantToGarden = (plant) => {
    console.log('addPlantToGarden', plant);
    const { selectedGarden } = this.state;
    if (!selectedGarden._id) {
      this.setState({error: "Please select a garden to add plants to."});
    } else {
      console.log('addPlantToGarden', selectedGarden._id, plant);
      try {
      gardenClient.addPlantToGarden(selectedGarden._id, plant)
        .then(() => this.getPlantsInGarden(selectedGarden._id))
        .catch(error => {
          console.log("Error saving plant to garden: ", error);
          this.setState({
            error: "There was an error adding the plant to the garden. Please try again."
          });
        });
      } catch (error) {
        console.log("Error saving plant to garden: ", error);
        this.setState({
          error
        });
      }
    }
  }

  getPlantsInGarden = (gardenId) => {
    gardenClient.findPlantsByGardenId(gardenId)
    .then(response => {
      // console.log('Plants in garden:', response);
      this.setState({
        selectedGardenPlants: arrayToMap(response, "refId"),
        error: null,
      });
    })
    .catch(error => this.setState({error}));
  }

  setMyPlants = (selectedGardenPlants) => {
    this.setState({selectedGardenPlants});
  }


  render() {
    const gardenPlantsList = Object.values(this.state.selectedGardenPlants);
    const {
      users, 
      selectedUser, 
      selectedUserGardens, 
      selectedGarden, 
      selectedGardenPlants,
      error
    } = this.state;
    const defaultKey = selectedUser.id ? 'gardens' : 'userSelect';

    const { user, loginWithRedirect, isAuthenticated } = this.props.auth0;
    console.log('user', user);
    
    return (
      <div className='flex-div'>
        <h1>Garden Tracker</h1>
        <button onClick={() => loginWithRedirect()}>Log In</button>
        <SelectionDetails selectedUser={selectedUser} selectedGarden={selectedGarden} />
        <div className='flex-div'>
        <p className='error-display'>{this.state.error}</p>
          <Tabs defaultActiveKey={defaultKey} id="garden-nav">
            <Tab eventKey="userSelect" title="Users" className='tab'>
              <UserSelect
                setUsers={this.setUsers}
                selectUser={this.selectUser}
                users={users}
                selectedUser={selectedUser} />
            </Tab>
            <Tab 
              eventKey="gardens" 
              title="Gardens" 
              className='tab' 
              disabled={!isAuthenticated}>
              <PlantGardenView 
                gardens={selectedUserGardens}
                gardenPlantsList={gardenPlantsList}
                selectedUser={selectedUser}
                selectedGarden={selectedGarden}
                submitGardenForm={this.submitGardenForm}
                selectGarden={this.selectGarden}
                deleteGarden={this.deleteGarden} />
            </Tab>
            <Tab 
              eventKey="search" 
              title="Search" 
              className='tab'
              disabled={!isAuthenticated}>
              <PlantSearchView 
                selectedGarden={selectedGarden}
                selectedGardenPlants={selectedGardenPlants} 
                addPlantToGarden={this.addPlantToGarden} />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default withAuth0(App)


  // <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>