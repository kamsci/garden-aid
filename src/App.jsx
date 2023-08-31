import { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import PlantSearchView from './Garden/SearchView/PlantSearchView';
import PlantGardenView from './Garden/PlantGardenView';
import UserSelect from './User/UserSelect';

class App extends Component {
  constructor(props) {
    super(props);
    const myPlants = JSON.parse(localStorage.getItem('myPlants'));
    this.state = { 
      myPlants: myPlants || {}
     }
  }

  addToMyPlants = (plant) => {
    console.log('addToMyPlants', plant);
    const myPlants = {...this.state.myPlants, [plant.id]: plant};
    this.setState({myPlants});
    localStorage.setItem('myPlants', JSON.stringify(myPlants));
  }

  setMyPlants = (myPlants) => {
    this.setState({myPlants});
  }

  // <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>

  render() {
    const myPlantsList = Object.values(this.state.myPlants);
    return (
      <div className='flex-div'>
        <h1>Garden</h1>
        <div className='flex-div'>
          <Tabs defaultActiveKey="userSelect" id="garden-nav">
            <Tab eventKey="userSelect" title="Users" className='tab'>
              <UserSelect />
            </Tab>
            <Tab eventKey="view" title="View" className='tab'>
              <PlantGardenView myPlants={myPlantsList} />
            </Tab>
            <Tab eventKey="search" title="Search" className='tab'>
              <PlantSearchView myPlants={this.state.myPlants} addToMyPlants={this.addToMyPlants} />
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default App
