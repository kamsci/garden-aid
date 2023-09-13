import { useAuth0 } from "@auth0/auth0-react";

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

export default Auth0Button;