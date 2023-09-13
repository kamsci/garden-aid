import { useAuth0 } from "@auth0/auth0-react";
import ProfileView from "./ProfileView"
import ProfileForm from "./ProfileForm";

const Profile = (props) => { 
	const { isAuthenticated } = useAuth0();
	const {dbUser, isDbUserFound, isDbUserLoading, dbUserError } = props;

	return (
			<div>
					<Auth0Button />
					{isDbUserLoading && <p>Loading...</p>}
					{dbUserError && <p>{dbUserError}</p>}
					{isDbUserFound 
						? <ProfileView dbUser={dbUser} />
						: isAuthenticated && <ProfileForm dbUser={dbUser} />
					}
			</div>
	)
}


const Auth0Button = () => {	
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	if (isAuthenticated) {
		return (
			<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
				Log Out
			</button>
		)
	}

	return (
			<button onClick={() => loginWithRedirect()}>Log In</button>
	)
}

export default Profile;