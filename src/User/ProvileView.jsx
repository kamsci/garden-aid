import {useEffect} from 'react';

const ProfileView = (props) => {
    const { dbUser } = props;

    useEffect(() => {   
        console.log('ProfileView.useEffect', dbUser);
    }, [dbUser]);
    
    return (
        <div>
            <h3>Profile</h3>
            <span>{`Welcome ${dbUser.firstName} ${dbUser.lastName}`}</span>
        </div>
    )
}

export default ProfileView;