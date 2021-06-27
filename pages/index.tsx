/** @format */

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Loader from '../components/loader';
import { InferGetServerSidePropsType } from 'next';
import { firestore, postToJson } from '../lib/firebase';
import { useState } from 'react';
import PostFeed from '../components/PostFeed';
import firebase from 'firebase';

//Max posts per page
const LIMIT = 1;

export const getServerSideProps = async () => {
	const postsQuery = firestore
		.collectionGroup('posts')
		.where('published', '==', true)
		.orderBy('createdAt', 'desc')
		.limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJson);

	return {
		props: { posts },
	};
};

export default function Home(props: any) {
	const [posts, setPosts] = useState(props.posts);
	const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);
  
  const getMorePosts = async () => {
    setLoading(true)
    const last = posts[posts.length - 1]
    const cursor = typeof last.createdAt === 'number' ? firebase.firestore.Timestamp.fromMillis(last.createdAt) : last.createdAt

    const query = firestore
			.collectionGroup('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)
    
    const newPosts = (await query.get()).docs.map(postToJson)

    setPosts(posts.concat(newPosts))
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

	return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Show more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
	);
}
