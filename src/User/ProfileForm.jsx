
import { Button, Form } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const ProfileForm = (props) => {
	const { user } = useAuth0();
	const { saveDbUser } = props;

	const onSubmit = (event) => {
			event.preventDefault();
			const newUser = {
					email: user.email,
					firstName: event.target.firstname.value,
					lastName: event.target.lastname.value,
					picture: user.picture
			}
			// console.log('newUser: ', newUser);
			saveDbUser(newUser);
	}

	return (
		<div>
			<h3>Create Your Profile</h3>
			<Form onSubmit={onSubmit}>
				<div>
						<label>Email</label>
						<input type="email" value={user?.email || ''} disabled/>
				</div>
				<Form.Group className="mb-3" controlId="firstname">
						<Form.Label>First Name</Form.Label>
						<Form.Control type="firstname" placeholder="Enter first name" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="lastname">
						<Form.Label>Last Name</Form.Label>
						<Form.Control type="lastname" placeholder="Enter Last name" />
				</Form.Group>
				<Button variant="primary" type="submit">Save</Button>
			</Form>
		</div>
	)
}

export default ProfileForm;