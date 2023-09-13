import { useAuth0 } from "@auth0/auth0-react";
import ProfileView from "./ProfileView"
import ProfileForm from "./ProfileForm";

const Profile = (props) => { 
	const { isAuthenticated } = useAuth0();
	const {dbUser, isDbUserFound, isDbUserLoading, dbUserError, saveDbUser} = props;

	return (
			<div>
					
					{isDbUserLoading && <p>Loading...</p>}
					{dbUserError && <p>{dbUserError}</p>}
					{isDbUserFound 
						? <ProfileView dbUser={dbUser} />
						: isAuthenticated && <ProfileForm dbUser={dbUser}
						 saveDbUser={saveDbUser}/>
					}
			</div>
	)
}

export default Profile;