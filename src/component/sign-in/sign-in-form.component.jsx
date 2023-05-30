import { useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.components';

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in.styles.scss';

const defaultFormFields = {
	email: '',
	password: ''
};

const SignInForm = () => {
	const [ formFields, setFormFields ] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password);
			console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password');
					break;
				case 'auth/user-not-found':
					alert('user email not found');
					break;
				default:
					console.log(error);
			}
		}
	};

	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<span>Sign In with your account</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google SSO
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
