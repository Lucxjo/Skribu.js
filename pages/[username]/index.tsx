import UserProfile from '../../components/UserProfile'
import PostFeed from '../../components/PostFeed';
import firebase from 'firebase/app'
import { PostProps } from '../../lib/post';
import { getUserWithUsername, postToJson } from '../../lib/firebase';

export const getServerSideProps = async ({ query }: { query: any }) => {
	const { username } = query;

	const userDoc = await getUserWithUsername(username);

	let user = null;
	let posts = null;

	if (userDoc) {
		user = userDoc.data();
		const postsQuery = userDoc.ref
			.collection('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.limit(5);

		posts = (await postsQuery.get()).docs.map(postToJson);
	}

	return {
		props: {
			user,
			posts,
		},
	};
};

export default function UserPage({ user, posts }: {user: firebase.firestore.DocumentData, posts: PostProps}) {
    return (
        <main>
            <UserProfile user={user} posts={posts} />
            <PostFeed posts={posts} />
        </main>
    )
}