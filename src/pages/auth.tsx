/** @format */

import Image from 'next/image';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import debounce from 'lodash.debounce';

export default function Auth({}) {
	const { user, username } = useContext(UserContext);
	return (
		<main>
			<h1>Sign In</h1>
			{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
		</main>
	);
}

function SignInButton({}) {
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider);
	};

	return (
		<button className="btn-google" onClick={signInWithGoogle}>
			<Image src={'/google.png'} width="90px" height="90px" alt="Google sign in" />{' '}
			<span className="btn-google">Sign in with Google</span>
		</button>
	);
}

function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm(): JSX.Element {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, username } = useContext(UserContext);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const checkUsername = useCallback(
		debounce(async (username: string) => {
			if (username.length > 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const { exists } = await ref.get();
				console.log('Firebase, check username');
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue, checkUsername]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const userDoc = firestore.doc(`users/${user?.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		const batch = firestore.batch();
		batch.set(userDoc, {
			username: formValue,
			photoURL: user?.photoURL,
			displayName: user?.displayName,
		});
		batch.set(usernameDoc, { uid: user?.uid });

		await batch.commit();
	};

	return (
        <div>
		{!username && (
            <>
			<section>
				<h3>Choose a username</h3>
				<form onSubmit={onSubmit}>
					<input name="username" placeholder="username" value={formValue} onChange={onChange} />
					<UsernameMessage username={formValue} isValid={isValid} loading={loading} />
					<button type="submit" className="btn-green" disabled={!isValid}>
						Choose!
					</button>
					<h3>Debug State</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Valid: {isValid.toString()}
					</div>
				</form>
			</section>
            </>
        )}
        {username &&
            <p></p>
        }
        </div>
	);
}

function UsernameMessage({
	username,
	isValid,
	loading,
}: {
	username: string;
	isValid: boolean;
	loading: boolean;
}) {
	if (loading) return <p>Checking...</p>;
	else if (isValid) return <p className="text-success">{username} is available</p>;
	else if (username && !isValid) return <p className="text-danger">That username is taken</p>;
	else return <p></p>;
}
