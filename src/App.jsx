import Header from './Header';
import { useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import PlantSearchView from './Garden/SearchView/PlantSearchView';
import PlantGardenView from './Garden/GardenView/PlantGardenView';
import SelectionDetails from './SelectionDetails';
import Profile from './User/Profile';
import Home from './Home'; 
import Auth0Button from './HelperComponents/Auth0Button';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    
    <Router>
    <div className='flex-div'>
      <h1>Garden Tracker</h1>
      <Header/>
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
      <Switch>
        <Route exact path="/" component={Home} />
        {isAuthenticated && (
          <Route exact path="/profile">
          <Profile
          dbUser={dbUser} 
          dbUserError={dbUserError}
          isDbUserLoading={isDbUserLoading}
          isDbUserFound={isDbUserFound}
          />
        </Route> 
        )}
        {isAuthenticated && isDbUserFound &&(
        <>
          <Route exact path="/garden">
            <PlantGardenView
              gardens={gardens}
              gardenPlantsList={gardenPlantsList}
              selectedUser={dbUser}
              selectedGarden={selectedGarden}
              submitGardenForm={createGarden}
              selectGarden={selectGarden}
              deleteGarden={deleteGarden}
            />
          </Route>
          <Route exact path="/search">
            <PlantSearchView
              selectedGarden={selectedGarden}
              selectedGardenPlants={gardenPlants} 
              addPlantToGarden={addPlantToGarden}
            />
          </Route> 
        </>
        )}
      </Switch>
      </div>
    </div>
  </Router>
  );
}

export default App;
