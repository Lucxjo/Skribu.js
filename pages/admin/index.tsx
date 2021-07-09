/** @format */
import { useCollection } from 'react-firebase-hooks/firestore';
import AuthCheck from '../../components/AuthCheck';
import { auth, firestore, serverTimestamp } from '../../lib/firebase';
import PostFeed from '../../components/PostFeed';
import { PostProps } from '../../lib/post';
import { useRouter } from 'next/dist/client/router';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../../lib/context';
import { kebabCase } from 'lodash';
import toast from 'react-hot-toast';

export default function AdminPage({}) {
	return (
		<main>
			<AuthCheck>
				<PostList />
				<CreateNewPost />
			</AuthCheck>
		</main>
	);
}

function PostList() {
	const ref = firestore.collection('users').doc(auth.currentUser?.uid).collection('posts');
	const query = ref.orderBy('createdAt');
	const [querySnapshot] = useCollection(query);

	// @ts-ignore
	const posts: PostProps = querySnapshot?.docs.map(doc => doc.data());

	return (
		<>
			<h1>Manage your posts</h1>
			<PostFeed posts={posts} admin />
		</>
	);
}

function CreateNewPost() {
	const router = useRouter();
	const { username } = useContext(UserContext);
	const [title, setTitle] = useState('');
	const slug = encodeURI(kebabCase(title));

	const isValid = title.length > 3 && title.length < 100;

	const createPost = async (e: FormEvent) => {
		e.preventDefault();
		const uid = auth.currentUser?.uid;
		const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);
		const data = {
			title,
			slug,
			uid,
			username,
			published: false,
			content: '# Hello World!',
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			heartCount: 0,
		};

		await ref.set(data);
		toast.success('Post created!');
		router.push(`/admin/${slug}`);
	};

	return (
		<form onSubmit={createPost}>
			<input
				className="input"
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Post title"
			/>
			<p>
				<strong>Slug:</strong> {slug}
			</p>
			<button type="submit" disabled={!isValid} className="btn-green">
				Create New Post
			</button>
		</form>
	);
}
