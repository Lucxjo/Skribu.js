/** @format */

import firebase from 'firebase/app';
import InferGetServerSideProps from 'next';
import { getUserWithUsername, postToJson } from '../lib/firebase';
import { PostProps } from '../lib/post';
import styles from '../styles/Profile.module.css'

export default function UserProfile({
	user,
	posts,
}: {
	user: firebase.firestore.DocumentData;
	posts: PostProps;
}) {
	return (
		<div className="box-center">
			{user?.photoURL && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					className={styles.cardImgCentre}
                    src={`${user.photoURL}`}
					alt="Profile photo"
				/>
			)}
			{!user?.photoURL && <p></p>}
			<p>
				<i>@{user?.username}</i>
			</p>
			<h1>{user?.displayName}</h1>
		</div>
	);
}
