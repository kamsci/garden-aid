import { useState } from 'react';

import UserClient from '../clients/userClient';
const userClient = new UserClient();

const useDbUser = () => {
  // DbUser State
  const [dbUser, setDbUser] = useState({});
  const [isDbUserFound, setIsDbUserFound] = useState(false);
  const [isDbUserLoading, setIsDbUserLoading] = useState(false);
  const [dbUserError, setDbUserError] = useState(null);

  const getDbUser = (user) => {
    if (user?.email) {
      setIsDbUserLoading(true);
      userClient.findByEmail(user.email)
      .then(response => { 
          // console.log('DbUser found: ', response);
          setDbUserError(null);
          setIsDbUserFound(true);
          setDbUser(response);
      })    
      .catch(error => {
          console.log('findByEmail error:', error);
          if (error.message === UserClient.USER_NOT_FOUND) {
              setDbUserError(null);
              setIsDbUserFound(false);
          } else {
            setDbUserError('There was an error laoding the user.');
          }
      })
      .finally(() => {
          setIsDbUserLoading(false);
      });
    }
  };

  const saveDbUser = (newUser) => {
    setIsDbUserLoading(true);
    userClient.save(newUser)
    .then(response => {
      console.log('DbUser saved: ', response);
      setDbUserError(null);
      setIsDbUserFound(true);
      setDbUser(response);
      setIsDbUserFound(true);
    })
    .catch(error => {
      console.log('save error:', error);
      setDbUserError('There was an error saving the user.');
    })
    .finally(() => {
      setIsDbUserLoading(false);
    });
  };

  return { getDbUser, dbUser, isDbUserFound, isDbUserLoading, dbUserError, saveDbUser };
}

export default useDbUser;