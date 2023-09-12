import { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import PlantSearchView from './Garden/SearchView/PlantSearchView';
import PlantGardenView from './Garden/GardenView/PlantGardenView';
import SelectionDetails from './SelectionDetails';
import Profile from './User/Profile';

import { useAuth0 } from "@auth0/auth0-react";
import useDbUser from './User/hooks/useDbUser';
import useGardens from './Garden/hooks/useGardens';
import useGardenPlants from './Garden/hooks/useGardenPlants';

const App = (props) => {
  // Auth0 props
  const { isAuthenticated, user } = useAuth0();
  // Hook to get user info from DB when Auth0 user is set
  const { 
    getDbUser,
    dbUser, 
    dbUserError, 
    isDbUserLoading, 
    isDbUserFound } = useDbUser();
  // Hook to manage user gardens when selected user is set
  const { 
    createGarden,
    deleteGarden,
    findGardens,
    gardens,
    gardensError,
    gardensLoading,
    selectGarden, 
    selectedGarden,
  } = useGardens();
  // Hook to manage plants in selected garden
  const {
		addPlantToGarden,
    findPlantsInGarden,
		gardenPlants,
    gardenPlantsList,
		gardenPlantsError,
		gardenPlantsLoading,
	} = useGardenPlants();


  useEffect(() => {
    findGardens();
  }, [dbUser]);

  useEffect(() => {
    user?.email && getDbUser(user);
  }, [user]);

	useEffect(() => {
		findPlantsInGarden(selectedGarden._id);
	}, [selectedGarden]);

// TODO: refactor dbUserError, sometimes it is an object..

  const defaultTab = isAuthenticated && isDbUserFound ? 'gardens' : 'profile';
  console.log('App', dbUser, gardens, selectedGarden);
  return (
    <div className='flex-div'>
      <h1>Garden Tracker</h1>
      <SelectionDetails selectedUser={dbUser} selectedGarden={selectedGarden} />
      <div className='flex-div'>
      { (isDbUserLoading || gardensLoading || gardenPlantsLoading) && <p>Loading...</p>}
      <div className='error-display'>
        <ul>
          {/* <li>{JSON.stringify(dbUserError)}</li>
          <li>{gardensError}</li>
          <li>{gardenPlantsError}</li> */}
        </ul>
      </div>
        <Tabs defaultActiveKey={defaultTab} id="garden-nav">
          <Tab eventKey="profile" title="Profile" className='tab'>
            <Profile
              dbUser={dbUser} 
              dbUserError={dbUserError}
              isDbUserLoading={isDbUserLoading}
              isDbUserFound={isDbUserFound}
            />
          </Tab>
          <Tab 
            eventKey="gardens" 
            title="Gardens" 
            className='tab' 
            disabled={!isAuthenticated}>
            <PlantGardenView 
              gardens={gardens}
              gardenPlantsList={gardenPlantsList}
              selectedUser={dbUser}
              selectedGarden={selectedGarden}
              submitGardenForm={createGarden}
              selectGarden={selectGarden}
              deleteGarden={deleteGarden} />
          </Tab>
          <Tab 
            eventKey="search" 
            title="Search" 
            className='tab'
            disabled={!isAuthenticated}>
            <PlantSearchView 
              selectedGarden={selectedGarden}
              selectedGardenPlants={gardenPlants} 
              addPlantToGarden={addPlantToGarden} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default App


  // <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>